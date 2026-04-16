// ============================================================
// TOUR BOOKING API ROUTE
// File: app/api/tour-booking/route.ts
//
// Flow:
//  1. Validate request body
//  2. Generate booking reference (TT-TR-{ts}-{rand})
//  3. Insert to Supabase tour_bookings (service_role key)
//  4. Send 2 emails via Resend in parallel (user + admin)
//  5. Return { success, bookingReference }
//
// No backend server required — runs as Vercel serverless function.
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { Resend }                    from 'resend';
import { createServerClient }        from '@/lib/supabase-server';
import { tourBookingUserEmail }      from '@/emails/tour/tour-user-email';
import { tourBookingAdminEmail }     from '@/emails/tour/tour-admin-email';

// ── Sender addresses ───────────────────────────────────────────
const FROM_BOOKINGS = 'TripTip Bookings <bookings@notifications.srilankantriptip.com>';
const FROM_SYSTEM   = 'TripTip System <system@notifications.srilankantriptip.com>';

// ── Booking reference: TT-TR-{base36 timestamp}-{random 4} ────
function generateBookingRef(): string {
  const ts     = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TT-TR-${ts}-${random}`;
}

// ── Server-side validation ─────────────────────────────────────
function validateBody(body: Record<string, unknown>): string | null {
  if (!body.fullName       || typeof body.fullName       !== 'string') return 'Full name is required.';
  if (!body.email          || typeof body.email          !== 'string') return 'Email address is required.';
  if (!body.phone          || typeof body.phone          !== 'string') return 'Phone number is required.';
  if (!body.tourName       || typeof body.tourName       !== 'string') return 'Tour selection is required.';
  if (!body.pickupLocation || typeof body.pickupLocation !== 'string') return 'Pickup location is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email as string))       return 'Invalid email address format.';
  return null;
}

// ── POST Handler ───────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {

    // ── 1. Parse body ────────────────────────────────────────
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400 }
      );
    }

    // ── 2. Validate ──────────────────────────────────────────
    const validationError = validateBody(body);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    // ── 3. Generate booking reference ────────────────────────
    const bookingReference = generateBookingRef();

    // ── 4. Build clean data object ───────────────────────────
    const emailData = {
      salutation:         (body.salutation         as string) || '',
      fullName:            body.fullName             as string,
      email:              (body.email               as string).toLowerCase().trim(),
      phone:               body.phone                as string,
      preferredContact:   (body.preferredContact    as string) || '',
      tourName:            body.tourName             as string,
      tourSlug:           (body.tourSlug            as string) || '',
      tourCategory:       (body.tourCategory        as string) || '',
      tourDuration:       (body.tourDuration        as string) || '',
      tourPriceDisplay:   (body.tourPriceDisplay    as string) || '',
      pickupLocation:      body.pickupLocation       as string,
      preferredStartDate: (body.preferredStartDate  as string) || '',
      adults:              Number(body.adults)        || 1,
      children:            Number(body.children)      || 0,
      luggageType:        (body.luggageType         as string) || '',
      additionalNotes:    (body.additionalNotes     as string) || '',
      bookingReference,
    };

    // ── 5. Insert to Supabase ────────────────────────────────
    const supabase = createServerClient();

    const { error: dbError } = await supabase
      .from('tour_bookings')
      .insert({
        booking_reference:   bookingReference,
        salutation:          emailData.salutation         || null,
        full_name:           emailData.fullName,
        email:               emailData.email,
        phone:               emailData.phone,
        preferred_contact:   emailData.preferredContact   || null,
        tour_name:           emailData.tourName,
        tour_slug:           emailData.tourSlug           || null,
        tour_category:       emailData.tourCategory       || null,
        tour_duration:       emailData.tourDuration       || null,
        tour_price_display:  emailData.tourPriceDisplay   || null,
        pickup_location:     emailData.pickupLocation,
        // Store as DATE only — if empty string, use null
        preferred_start_date: emailData.preferredStartDate
          ? emailData.preferredStartDate
          : null,
        adults:              emailData.adults,
        children:            emailData.children,
        luggage_type:        emailData.luggageType        || null,
        additional_notes:    emailData.additionalNotes    || null,
        status:              'new',
      });

    if (dbError) {
      console.error('[TOUR BOOKING] Supabase insert error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save your booking. Please try again.' },
        { status: 500 }
      );
    }

    // ── 6. Send emails in parallel (non-blocking) ────────────
    const resend     = new Resend(process.env.RESEND_API_KEY!);
    const adminEmail = process.env.ADMIN_EMAIL!;

    const [userEmailResult, adminEmailResult] = await Promise.allSettled([

      // User confirmation
      resend.emails.send({
        from:    FROM_BOOKINGS,
        to:      [emailData.email],
        subject: `Your Journey Has Begun — ${bookingReference} | Sri Lankan TripTip`,
        html:    tourBookingUserEmail(emailData),
      }),

      // Admin notification
      resend.emails.send({
        from:    FROM_SYSTEM,
        to:      [adminEmail],
        subject: `[New Tour Booking] ${bookingReference} — ${emailData.fullName} → ${emailData.tourName}`,
        html:    tourBookingAdminEmail(emailData),
      }),

    ]);

    // Log failures — booking is already saved, don't surface to user
    if (userEmailResult.status === 'rejected') {
      console.error('[TOUR BOOKING] User email failed:', userEmailResult.reason);
    }
    if (adminEmailResult.status === 'rejected') {
      console.error('[TOUR BOOKING] Admin email failed:', adminEmailResult.reason);
    }

    // ── 7. Return success ────────────────────────────────────
    return NextResponse.json({
      success:          true,
      bookingReference,
      message:          'Tour booking submitted successfully.',
    });

  } catch (error) {
    console.error('[TOUR BOOKING] Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
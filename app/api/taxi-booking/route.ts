import { NextRequest, NextResponse }    from 'next/server';
import { Resend }                        from 'resend';
import { createServerClient }            from '@/lib/supabase-server';
import { taxiBookingUserEmail }          from '@/emails/taxi/taxi-user-email';
import { taxiBookingAdminEmail }         from '@/emails/taxi/taxi-admin-email';

// ── Email sender addresses ──────────────────────────────────────
const FROM_BOOKINGS = 'TripTip Bookings <bookings@notifications.srilankantriptip.com>';
const FROM_SYSTEM   = 'TripTip System <system@notifications.srilankantriptip.com>';

// ── Booking reference generator ─────────────────────────────────
function generateBookingRef(): string {
  const ts     = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TT-TX-${ts}-${random}`;
}

// ── Minimal server-side validation ──────────────────────────────
function validateBody(body: Record<string, unknown>): string | null {
  if (!body.fullName          || typeof body.fullName !== 'string')       return 'Full name is required.';
  if (!body.email             || typeof body.email !== 'string')          return 'Email address is required.';
  if (!body.phone             || typeof body.phone !== 'string')          return 'Phone number is required.';
  if (!body.pickupLocation    || typeof body.pickupLocation !== 'string') return 'Pickup location is required.';
  if (!body.destination       || typeof body.destination !== 'string')    return 'Destination is required.';
  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email as string))          return 'Invalid email address.';
  return null;
}

// ── POST Handler ─────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // 1. Parse request body
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    // 2. Validate required fields
    const validationError = validateBody(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // 3. Generate booking reference
    const bookingReference = generateBookingRef();

    // 4. Prepare data object
    const emailData = {
      salutation:        (body.salutation        as string) || '',
      fullName:          body.fullName            as string,
      email:             (body.email              as string).toLowerCase().trim(),
      phone:             body.phone               as string,
      preferredContact:  (body.preferredContact   as string) || '',
      vehiclePreference: (body.vehiclePreference  as string) || '',
      pickupLocation:    body.pickupLocation      as string,
      pickupDatetime:    (body.pickupDatetime      as string) || '',
      destination:       body.destination         as string,
      adults:            Number(body.adults)       || 1,
      children:          Number(body.children)     || 0,
      luggageType:       (body.luggageType        as string) || '',
      additionalNotes:   (body.additionalNotes    as string) || '',
      bookingReference,
    };

    // 5. Insert to Supabase
    const supabase = createServerClient();
    const { error: dbError } = await supabase
      .from('taxi_bookings')
      .insert({
        booking_reference:  bookingReference,
        salutation:         emailData.salutation,
        full_name:          emailData.fullName,
        email:              emailData.email,
        phone:              emailData.phone,
        preferred_contact:  emailData.preferredContact,
        vehicle_preference: emailData.vehiclePreference,
        pickup_location:    emailData.pickupLocation,
        pickup_datetime:    emailData.pickupDatetime || null,
        destination:        emailData.destination,
        adults:             emailData.adults,
        children:           emailData.children,
        luggage_type:       emailData.luggageType,
        additional_notes:   emailData.additionalNotes,
        status:             'new',
      });

    if (dbError) {
      console.error('[TAXI BOOKING] Supabase insert error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save your booking. Please try again.' },
        { status: 500 }
      );
    }

    // 6. Send emails via Resend (non-blocking — don't fail the booking if email fails)
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const adminEmail = process.env.ADMIN_EMAIL!;

    const [userEmailResult, adminEmailResult] = await Promise.allSettled([
      // User confirmation email
      resend.emails.send({
        from:    FROM_BOOKINGS,
        to:      [emailData.email],
        subject: `Your Transfer is Confirmed — ${bookingReference} | Sri Lankan TripTip`,
        html:    taxiBookingUserEmail(emailData),
      }),
      // Admin notification email
      resend.emails.send({
        from:    FROM_SYSTEM,
        to:      [adminEmail],
        subject: `[New Taxi Booking] ${bookingReference} — ${emailData.fullName}`,
        html:    taxiBookingAdminEmail(emailData),
      }),
    ]);

    // Log email failures (don't expose to user — booking is saved)
    if (userEmailResult.status === 'rejected') {
      console.error('[TAXI BOOKING] User email failed:', userEmailResult.reason);
    }
    if (adminEmailResult.status === 'rejected') {
      console.error('[TAXI BOOKING] Admin email failed:', adminEmailResult.reason);
    }

    // 7. Return success
    return NextResponse.json({
      success:          true,
      bookingReference,
      message:          'Booking submitted successfully.',
    });

  } catch (error) {
    console.error('[TAXI BOOKING] Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
// ============================================================
// CUSTOM PLANNING API ROUTE
// File: app/api/custom-planning/route.ts
//
// Security layers applied (in order):
//   1. Payload size guard    — reject oversized bodies (> 64 KB)
//   2. Origin validation     — reject requests from unknown origins
//   3. Rate limiting         — 5 requests / 15 min per IP
//   4. Input sanitisation    — strip HTML, null bytes, control chars
//   5. Field length limits   — hard caps enforced per field
//   6. Day plan validation   — max 30 days, valid structure per day
//   7. Server-side required  — fullName, email, phone, pickup
//   8. Parameterised DB      — Supabase client prevents SQL injection
//
// Flow after security:
//   1. Generate booking reference (TT-CP-{ts}-{rand})
//   2. INSERT to Supabase custom_tour_bookings
//   3. Send 2 emails in parallel (user + admin)
//   4. Return { success, bookingReference }
//
// No backend server needed — runs as Vercel serverless function.
// ============================================================

import { NextRequest, NextResponse }         from 'next/server';
import { Resend }                             from 'resend';
import { createServerClient }                 from '@/lib/supabase-server';
import { customPlanningUserEmail }            from '@/emails/custom-planning/custom-user-email';
import { customPlanningAdminEmail }           from '@/emails/custom-planning/custom-admin-email';
import {
  sanitiseString,
  sanitiseEmail,
  sanitisePhone,
  sanitiseDate,
  sanitiseInt,
  sanitiseDayPlans,
  checkRateLimit,
  getClientIp,
  validateOrigin,
  isPayloadAcceptable,
  FIELD_LIMITS,
} from '@/lib/security';

// ── Sender addresses ───────────────────────────────────────────
const FROM_BOOKINGS = 'TripTip Bookings <bookings@notifications.srilankantriptip.com>';
const FROM_SYSTEM   = 'TripTip System <system@notifications.srilankantriptip.com>';

// ── Booking reference: TT-CP-{base36 timestamp}-{random 4} ────
function generateBookingRef(): string {
  const ts     = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TT-CP-${ts}-${random}`;
}

// ── POST Handler ───────────────────────────────────────────────
export async function POST(req: NextRequest) {

  // ── Layer 1: Payload size guard ─────────────────────────────
  if (!isPayloadAcceptable(req)) {
    return NextResponse.json(
      { error: 'Request payload is too large.' },
      { status: 413 }
    );
  }

  // ── Layer 2: Origin validation ──────────────────────────────
  if (!validateOrigin(req)) {
    return NextResponse.json(
      { error: 'Forbidden.' },
      { status: 403 }
    );
  }

  // ── Layer 3: Rate limiting ──────────────────────────────────
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(clientIp, 5, 15 * 60 * 1000);

  if (!rateLimit.allowed) {
    const retryAfterSec = Math.ceil(rateLimit.resetIn / 1000);
    return NextResponse.json(
      {
        error: `Too many requests. Please try again in ${Math.ceil(retryAfterSec / 60)} minutes.`,
      },
      {
        status: 429,
        headers: {
          'Retry-After':              String(retryAfterSec),
          'X-RateLimit-Limit':        '5',
          'X-RateLimit-Remaining':    '0',
          'X-RateLimit-Reset':        String(Date.now() + rateLimit.resetIn),
        },
      }
    );
  }

  // ── Layer 4 & 5: Parse + sanitise body ──────────────────────
  let rawBody: Record<string, unknown>;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  // Sanitise all scalar fields with strict length limits
  const salutation      = sanitiseString(rawBody.salutation,      FIELD_LIMITS.SALUTATION);
  const firstName       = sanitiseString(rawBody.firstName,       FIELD_LIMITS.NAME);
  const lastName        = sanitiseString(rawBody.lastName,        FIELD_LIMITS.NAME);
  const email           = sanitiseEmail(rawBody.email);
  const phone           = sanitisePhone(rawBody.phone);
  const contactMethod   = sanitiseString(rawBody.contactMethod,   FIELD_LIMITS.SHORT_TEXT);
  const pickupLocation  = sanitiseString(rawBody.pickupLocation,  FIELD_LIMITS.SHORT_TEXT);
  const startDate       = sanitiseDate(rawBody.startDate); // null if invalid/past
  const adults          = sanitiseInt(rawBody.adults,   1, 50, 1);
  const children        = sanitiseInt(rawBody.children, 0, 30, 0);
  const luggageType     = sanitiseString(rawBody.luggageType,     FIELD_LIMITS.SHORT_TEXT);
  const additionalNotes = sanitiseString(rawBody.additionalNotes, FIELD_LIMITS.LONG_TEXT);

  // ── Layer 6: Day plan validation ────────────────────────────
  const days = sanitiseDayPlans(rawBody.days);
  // Must have at least 1 day plan submitted
  if (days.length === 0) {
    return NextResponse.json(
      { error: 'At least one day must be planned.' },
      { status: 400 }
    );
  }

  // ── Layer 7: Required field checks ──────────────────────────
  if (!firstName)  return NextResponse.json({ error: 'First name is required.'     }, { status: 400 });
  if (!lastName)   return NextResponse.json({ error: 'Last name is required.'      }, { status: 400 });
  if (!email)      return NextResponse.json({ error: 'A valid email is required.'  }, { status: 400 });
  if (!phone)      return NextResponse.json({ error: 'Phone number is required.'   }, { status: 400 });
  if (!pickupLocation) return NextResponse.json({ error: 'Pickup location is required.' }, { status: 400 });

  // ── Generate booking reference ───────────────────────────────
  const bookingReference = generateBookingRef();
  const totalDays        = days.length;

  // ── Build clean email data object ───────────────────────────
  const emailData = {
    salutation,
    firstName,
    lastName,
    email,
    phone,
    contactMethod,
    pickupLocation,
    startDate:       startDate ?? '',
    adults,
    children,
    luggageType,
    days,
    additionalNotes,
    bookingReference,
  };

  // ── Layer 8: Parameterised DB insert (no SQL injection risk) ─
  const supabase = createServerClient();

  const { error: dbError } = await supabase
    .from('custom_tour_bookings')
    .insert({
      booking_reference:  bookingReference,
      salutation:         salutation         || null,
      first_name:         firstName,
      last_name:          lastName,
      email,
      phone,
      contact_method:     contactMethod      || null,
      pickup_location:    pickupLocation,
      start_date:         startDate          || null,
      adults,
      children,
      luggage_type:       luggageType        || null,
      // JSONB — Supabase accepts plain JS array/object directly
      day_plans:          days,
      total_days:         totalDays,
      additional_notes:   additionalNotes    || null,
      status:             'new',
    });

  if (dbError) {
    // Log full error server-side; return generic message to client
    console.error('[CUSTOM PLANNING] Supabase insert error:', {
      code:    dbError.code,
      message: dbError.message,
      // Do not log 'details' — may contain PII in some edge cases
    });
    return NextResponse.json(
      { error: 'Failed to save your planning request. Please try again.' },
      { status: 500 }
    );
  }

  // ── Send emails in parallel ──────────────────────────────────
  const resend     = new Resend(process.env.RESEND_API_KEY!);
  const adminEmail = process.env.ADMIN_EMAIL!;

  const [userEmailResult, adminEmailResult] = await Promise.allSettled([

    // User confirmation
    resend.emails.send({
      from:    FROM_BOOKINGS,
      to:      [email],
      subject: `Your ${totalDays}-Day Bespoke Journey — ${bookingReference} | Sri Lankan TripTip`,
      html:    customPlanningUserEmail(emailData),
    }),

    // Admin notification
    resend.emails.send({
      from:    FROM_SYSTEM,
      to:      [adminEmail],
      subject: `[Custom Planning] ${bookingReference} — ${firstName} ${lastName} — ${totalDays} Days`,
      html:    customPlanningAdminEmail(emailData),
    }),

  ]);

  // Log failures without surfacing to user — booking is already saved
  if (userEmailResult.status === 'rejected') {
    console.error('[CUSTOM PLANNING] User email failed:', userEmailResult.reason);
  }
  if (adminEmailResult.status === 'rejected') {
    console.error('[CUSTOM PLANNING] Admin email failed:', adminEmailResult.reason);
  }

  // ── Return success ───────────────────────────────────────────
  return NextResponse.json({
    success:          true,
    bookingReference,
    totalDays,
    message:          'Your planning request has been submitted successfully.',
  });
}
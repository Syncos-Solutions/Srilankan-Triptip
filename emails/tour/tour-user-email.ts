// ============================================================
// TOUR BOOKING — USER CONFIRMATION EMAIL
// Sri Lankan TripTip
// Folder: emails/tour/tour-user-email.ts
//
// Design principles:
//  — Dark (#0d0d0d) header / white body / #f4f4f4 accents
//  — Purple (#5e17eb → #1800ad) brand gradient
//  — Georgia serif for display / Arial for body (email-safe)
//  — Zero border-radius (sharp, editorial, premium)
//  — Tested: Gmail · Apple Mail · Outlook · Yahoo · Mobile
// ============================================================

export interface TourUserEmailData {
  salutation:         string;
  fullName:           string;
  email:              string;
  phone:              string;
  preferredContact:   string;
  tourName:           string;
  tourSlug:           string;
  tourCategory:       string;
  tourDuration:       string;
  tourPriceDisplay:   string;
  pickupLocation:     string;
  preferredStartDate: string;
  adults:             number;
  children:           number;
  luggageType:        string;
  additionalNotes:    string;
  bookingReference:   string;
}

// ── Utilities ──────────────────────────────────────────────────

function esc(str: string | undefined | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(dt: string): string {
  if (!dt) return 'To be confirmed';
  try {
    return new Date(dt).toLocaleDateString('en-US', {
      weekday: 'long',
      year:    'numeric',
      month:   'long',
      day:     'numeric',
    });
  } catch {
    return esc(dt);
  }
}

function passengerStr(adults: number, children: number): string {
  const a = `${adults} Adult${adults !== 1 ? 's' : ''}`;
  const c = children > 0
    ? ` &amp; ${children} Child${children !== 1 ? 'ren' : ''}`
    : '';
  return a + c;
}

// ── Reusable Data Row ──────────────────────────────────────────
function dataRow(label: string, value: string): string {
  if (!value || value.trim() === '' || value === '&amp;') return '';
  return `
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               style="border-bottom:1px solid #f0eeeb;">
          <tr>
            <td width="152" valign="top" style="padding:13px 16px 13px 0;">
              <span style="color:#9b9b9b;font-size:8px;letter-spacing:3.5px;
                           text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                           font-weight:700;line-height:1.4;">${label}</span>
            </td>
            <td valign="top" style="padding:13px 0;">
              <span style="color:#111111;font-size:14px;
                           font-family:Arial,Helvetica,sans-serif;
                           font-weight:400;line-height:1.6;">${value}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

// ── Highlight Data Row (for tour name — stands out) ────────────
function highlightRow(label: string, value: string): string {
  return `
    <tr>
      <td bgcolor="#f8f6ff" style="background-color:#f8f6ff;padding:0 48px;
                                   border-left:3px solid #5e17eb;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               style="border-bottom:1px solid #ede9ff;">
          <tr>
            <td width="152" valign="top" style="padding:16px 16px 16px 0;">
              <span style="color:#8b5cf6;font-size:8px;letter-spacing:3.5px;
                           text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                           font-weight:700;line-height:1.4;">${label}</span>
            </td>
            <td valign="top" style="padding:16px 0;">
              <span style="color:#5e17eb;font-size:15px;
                           font-family:Georgia,'Times New Roman',Times,serif;
                           font-weight:700;line-height:1.4;letter-spacing:-0.01em;">${value}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

// ── What's Next Step ──────────────────────────────────────────
function nextStep(
  num: string,
  title: string,
  body: string
): string {
  return `
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:0 48px 22px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td width="46" valign="top">
            <p style="margin:0;color:#5e17eb;font-size:20px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-weight:700;line-height:1.05;">${num}</p>
          </td>
          <td valign="top" style="padding-left:16px;">
            <p style="margin:0 0 5px 0;color:#0d0d0d;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;
                      font-weight:700;line-height:1.3;">${title}</p>
            <p style="margin:0;color:#777777;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;
                      font-weight:300;line-height:1.8;">${body}</p>
          </td>
        </tr>
        </table>
      </td>
    </tr>`;
}

// ── Main Email Function ────────────────────────────────────────
export function tourBookingUserEmail(data: TourUserEmailData): string {

  const siteUrl       = process.env.NEXT_PUBLIC_SITE_URL || 'https://srilankantriptip.com';
  const passengers    = passengerStr(data.adults, data.children);
  const startDate     = formatDate(data.preferredStartDate);
  const subjectRef    = esc(data.bookingReference);
  const category      = esc(data.tourCategory)  || 'Tour';
  const duration      = esc(data.tourDuration)   || '';
  const price         = esc(data.tourPriceDisplay) || '';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,date=no,address=no,email=no" />
  <title>Tour Booking Received &#8212; Sri Lankan TripTip</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style type="text/css">
    body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td        { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img             { -ms-interpolation-mode:bicubic; border:0; outline:none; text-decoration:none; }
    body            { margin:0!important; padding:0!important; background-color:#f4f4f4; }
    a[x-apple-data-detectors] { color:inherit!important; text-decoration:none!important; }
    @media only screen and (max-width:620px) {
      .outer   { padding:24px 12px!important; }
      .wrap    { width:100%!important; max-width:100%!important; }
      .pad     { padding-left:24px!important; padding-right:24px!important; }
      .hero-h1 { font-size:30px!important; line-height:1.1!important; }
      .hide-sm { display:none!important; max-height:0!important; overflow:hidden!important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;
             word-spacing:normal;-webkit-font-smoothing:antialiased;">

<!-- ── Preview Text ─────────────────────────────────────────── -->
<div style="display:none;font-size:1px;color:#f4f4f4;line-height:1px;
            max-height:0;max-width:0;opacity:0;overflow:hidden;">
  Your Sri Lankan TripTip tour request has been received &#8212; ${subjectRef}. We will be in touch within 24 hours to confirm your journey.
</div>

<!-- ── Outer Wrapper ─────────────────────────────────────────── -->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
       bgcolor="#f4f4f4" style="background-color:#f4f4f4;">
<tr>
<td class="outer" align="center" valign="top" style="padding:48px 16px;">

  <!-- ── Email Container ──────────────────────────────────── -->
  <table role="presentation" class="wrap" width="600" cellspacing="0" cellpadding="0" border="0"
         style="max-width:600px;width:100%;margin:0 auto;">

    <!-- TOP ACCENT BAR — gradient purple to deep blue -->
    <tr>
      <td height="4" style="background:linear-gradient(to right,#5e17eb,#1800ad);
                             font-size:1px;line-height:4px;
                             mso-line-height-rule:exactly;background-color:#5e17eb;">&nbsp;</td>
    </tr>

    <!-- ── HEADER ─────────────────────────────────────────── -->
    <tr>
      <td bgcolor="#0d0d0d" style="background-color:#0d0d0d;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td class="pad" valign="middle" style="padding:34px 48px;">
            <p style="margin:0 0 6px 0;color:#5e17eb;font-size:8px;letter-spacing:4px;
                      text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                      font-weight:700;line-height:1;">Curated Experiences</p>
            <p style="margin:0;color:#ffffff;font-size:22px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-weight:700;letter-spacing:-0.02em;line-height:1.2;">Sri Lankan TripTip</p>
          </td>
          <td class="hide-sm pad" align="right" valign="middle" style="padding:34px 48px;">
            <p style="margin:0;color:rgba(255,255,255,0.12);font-size:8px;letter-spacing:4px;
                      text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                      font-weight:700;">Est.&nbsp;2012</p>
          </td>
        </tr>
        </table>
      </td>
    </tr>

    <!-- ── HERO BAND ──────────────────────────────────────── -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:52px 48px 0 48px;">
        <!-- Purple accent line -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="40" height="2" bgcolor="#5e17eb"
                style="background-color:#5e17eb;font-size:1px;line-height:2px;">&nbsp;</td>
          </tr>
        </table>
        <p style="margin:20px 0 8px 0;color:#5e17eb;font-size:8px;letter-spacing:4px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;line-height:1;">Tour Booking Received</p>
        <h1 class="hero-h1"
            style="margin:0 0 26px 0;color:#0d0d0d;font-size:42px;
                   font-family:Georgia,'Times New Roman',Times,serif;
                   font-weight:700;line-height:1.04;letter-spacing:-2px;">
          Your Journey<br>
          Has Begun.
        </h1>
        <p style="margin:0;color:#555555;font-size:15px;
                  font-family:Arial,Helvetica,sans-serif;
                  font-weight:300;line-height:1.9;">
          Dear ${esc(data.salutation)} ${esc(data.fullName)}, your tour request has been received
          and is being reviewed by our team. A dedicated travel architect will reach out within
          <strong style="color:#0d0d0d;font-weight:600;">24 hours</strong> to confirm every detail
          of your journey and guide you on next steps.
        </p>
      </td>
    </tr>

    <!-- BOOKING REFERENCE BLOCK -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:32px 48px 52px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               bgcolor="#f4f4f4"
               style="background-color:#f4f4f4;border-left:3px solid #5e17eb;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="margin:0 0 7px 0;color:#9b9b9b;font-size:8px;letter-spacing:3.5px;
                        text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                        font-weight:700;">Your Booking Reference</p>
              <p style="margin:0 0 5px 0;color:#0d0d0d;font-size:23px;
                        font-family:Georgia,'Times New Roman',Times,serif;
                        font-weight:700;letter-spacing:2.5px;">${subjectRef}</p>
              <p style="margin:0;color:#aaaaaa;font-size:11px;
                        font-family:Arial,Helvetica,sans-serif;
                        font-weight:300;line-height:1.5;">
                Please quote this reference in all correspondence with our team.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ── DIVIDER ─────────────────────────────────────────── -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td height="1" bgcolor="#e8e4df"
                  style="background-color:#e8e4df;font-size:1px;line-height:1px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- SECTION TITLE: TOUR REQUESTED -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:32px 48px 18px 48px;">
        <p style="margin:0;color:#0d0d0d;font-size:9px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">Tour Requested</p>
      </td>
    </tr>

    <!-- TOUR NAME (highlighted row) -->
    ${highlightRow('Tour', esc(data.tourName))}

    <!-- Tour meta rows -->
    ${category ? dataRow('Category',  category)  : ''}
    ${duration ? dataRow('Duration',  duration)  : ''}
    ${price    ? dataRow('Starting',  price)     : ''}

    <!-- Spacer -->
    <tr>
      <td bgcolor="#ffffff"
          style="background-color:#ffffff;font-size:0;line-height:0;height:20px;">&nbsp;</td>
    </tr>

    <!-- ── DIVIDER ─────────────────────────────────────────── -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td height="1" bgcolor="#e8e4df"
                  style="background-color:#e8e4df;font-size:1px;line-height:1px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- SECTION TITLE: TRIP DETAILS -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:32px 48px 18px 48px;">
        <p style="margin:0;color:#0d0d0d;font-size:9px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">Your Trip Details</p>
      </td>
    </tr>

    ${dataRow('Pickup Location',   esc(data.pickupLocation))}
    ${dataRow('Preferred Start',   startDate)}
    ${dataRow('Passengers',        passengers)}
    ${data.luggageType
      ? dataRow('Luggage',         esc(data.luggageType))
      : ''}
    ${data.additionalNotes
      ? dataRow('Special Requests', esc(data.additionalNotes))
      : ''}

    <!-- Spacer -->
    <tr>
      <td bgcolor="#ffffff"
          style="background-color:#ffffff;font-size:0;line-height:0;height:20px;">&nbsp;</td>
    </tr>

    <!-- ── DIVIDER ─────────────────────────────────────────── -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td height="1" bgcolor="#e8e4df"
                  style="background-color:#e8e4df;font-size:1px;line-height:1px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- SECTION TITLE: WHAT HAPPENS NEXT -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:34px 48px 24px 48px;">
        <p style="margin:0;color:#0d0d0d;font-size:9px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">What Happens Next</p>
      </td>
    </tr>

    ${nextStep(
      '01',
      'Personal Review — Within 24 Hours',
      'A dedicated travel architect from our team will personally review your request and reach out via your preferred contact method to confirm all details.'
    )}
    ${nextStep(
      '02',
      'Journey Confirmation &amp; Deposit',
      'Once confirmed, we will send a detailed itinerary document along with our secure payment link for the deposit. No payment is taken until you are fully satisfied.'
    )}
    ${nextStep(
      '03',
      'Pre-Departure Journey Guide',
      'Seven days before your tour begins, you will receive your personalised Journey Guide — including guide contact, accommodation details, packing tips, and all the local knowledge you need.'
    )}
    ${nextStep(
      '04',
      'Your Journey Begins',
      'Your dedicated guide and vehicle arrive at your pickup point. From this moment, Sri Lanka is yours. We are on the ground with you every single day.'
    )}

    <!-- Spacer -->
    <tr>
      <td bgcolor="#ffffff"
          style="background-color:#ffffff;font-size:0;line-height:0;height:12px;">&nbsp;</td>
    </tr>

    <!-- ── DIVIDER ─────────────────────────────────────────── -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td height="1" bgcolor="#e8e4df"
                  style="background-color:#e8e4df;font-size:1px;line-height:1px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- ── CTA SECTION ─────────────────────────────────────── -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:38px 48px 56px 48px;">
        <p style="margin:0 0 6px 0;color:#9b9b9b;font-size:8px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">Have a Question?</p>
        <p style="margin:0 0 26px 0;color:#444444;font-size:14px;
                  font-family:Arial,Helvetica,sans-serif;
                  font-weight:300;line-height:1.8;">
          Our travel architects are available every day. Reach out any time —
          we are here to make your journey perfect.
        </p>
        <!-- CTA Button -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td bgcolor="#5e17eb" style="background-color:#5e17eb;">
              <a href="mailto:journeys@srilankantriptip.com?subject=Re%3A%20${subjectRef}"
                 target="_blank"
                 style="display:inline-block;padding:17px 44px;color:#ffffff;font-size:9px;
                        font-family:Arial,Helvetica,sans-serif;font-weight:700;
                        text-decoration:none;letter-spacing:3px;
                        text-transform:uppercase;line-height:1;mso-padding-alt:0;">
                <!--[if mso]>&nbsp;&nbsp;&nbsp;<![endif]-->
                Contact Our Team
                <!--[if mso]>&nbsp;&nbsp;&nbsp;<![endif]-->
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:18px 0 0 0;color:#aaaaaa;font-size:12px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
          Or browse all tours:&nbsp;
          <a href="${siteUrl}/tours"
             style="color:#5e17eb;text-decoration:none;font-weight:600;">
            srilankantriptip.com/tours
          </a>
        </p>
      </td>
    </tr>

    <!-- ── INSPIRATIONAL CLOSING BAND ─────────────────────── -->
    <tr>
      <td bgcolor="#f4f4f4" style="background-color:#f4f4f4;border-top:1px solid #e8e4df;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td class="pad" style="padding:32px 48px;">
            <!-- Accent line -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td width="24" height="1" bgcolor="#5e17eb"
                    style="background-color:#5e17eb;font-size:1px;line-height:1px;">&nbsp;</td>
              </tr>
            </table>
            <p style="margin:14px 0 0 0;color:#888888;font-size:13px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-style:italic;font-weight:400;line-height:1.7;">
              &ldquo;The island has been seen through more pairs of grateful eyes than we
              can count. We are just getting started.&rdquo;
            </p>
            <p style="margin:10px 0 0 0;color:#bbbbbb;font-size:10px;
                      letter-spacing:2px;text-transform:uppercase;
                      font-family:Arial,Helvetica,sans-serif;font-weight:700;">
              Sri Lankan TripTip &#8212; The Island&rsquo;s Finest Curators
            </p>
          </td>
        </tr>
        </table>
      </td>
    </tr>

    <!-- ── FOOTER ─────────────────────────────────────────── -->
    <tr>
      <td bgcolor="#0d0d0d" class="pad"
          style="background-color:#0d0d0d;padding:32px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td valign="top">
            <p style="margin:0 0 6px 0;color:#ffffff;font-size:13px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-weight:700;line-height:1.3;">Sri Lankan TripTip</p>
            <p style="margin:0 0 3px 0;color:rgba(255,255,255,0.26);font-size:11px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
              145 Galle Road, Colombo 03, Sri Lanka
            </p>
            <p style="margin:0 0 24px 0;color:rgba(255,255,255,0.26);font-size:11px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
              <a href="tel:+94771234567"
                 style="color:rgba(255,255,255,0.26);text-decoration:none;">
                +94 77 123 4567
              </a>
              &nbsp;&nbsp;&#183;&nbsp;&nbsp;
              <a href="mailto:journeys@triptip.lk"
                 style="color:rgba(255,255,255,0.26);text-decoration:none;">
                journeys@triptip.lk
              </a>
            </p>
            <!-- Footer rule -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td height="1" bgcolor="#1e1e1e"
                    style="background-color:#1e1e1e;font-size:1px;line-height:1px;">&nbsp;</td>
              </tr>
            </table>
            <p style="margin:14px 0 0 0;color:rgba(255,255,255,0.1);font-size:10px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.65;">
              This email was sent to
              <a href="mailto:${esc(data.email)}"
                 style="color:rgba(255,255,255,0.18);text-decoration:underline;">
                ${esc(data.email)}
              </a>
              because a tour booking was submitted on srilankantriptip.com using this address.
              If you did not make this request, please disregard this email.
            </p>
          </td>
        </tr>
        </table>
      </td>
    </tr>

    <!-- BOTTOM ACCENT BAR -->
    <tr>
      <td height="4" bgcolor="#1800ad"
          style="background-color:#1800ad;font-size:1px;line-height:4px;
                 mso-line-height-rule:exactly;">&nbsp;</td>
    </tr>

  </table>
  <!-- End Email Container -->

</td>
</tr>
</table>
<!-- End Outer Wrapper -->

</body>
</html>`;
}
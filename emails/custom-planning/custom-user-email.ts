// ============================================================
// CUSTOM PLANNING — USER CONFIRMATION EMAIL
// Sri Lankan TripTip
// Folder: emails/custom-planning/custom-user-email.ts
//
// Key difference from Tour/Taxi emails:
//   Renders a compact day-by-day itinerary summary table
//   showing every day the customer planned, styled on-brand.
//
// Design: dark header / white body / #f4f4f4 accents
//   Purple (#5e17eb → #1800ad) brand gradient
//   Georgia serif display / Arial body — email-safe stack
//   Zero border-radius
//   Tested: Gmail · Apple Mail · Outlook · Yahoo · Mobile
// ============================================================

export interface SanitisedDayPlan {
  day:           number;
  destination:   string;
  activities:    string;
  accommodation: string;
  notes:         string;
}

export interface CustomPlanningUserEmailData {
  salutation:       string;
  firstName:        string;
  lastName:         string;
  email:            string;
  phone:            string;
  contactMethod:    string;
  pickupLocation:   string;
  startDate:        string;
  adults:           number;
  children:         number;
  luggageType:      string;
  days:             SanitisedDayPlan[];
  additionalNotes:  string;
  bookingReference: string;
}

// ── Utilities ──────────────────────────────────────────────────

function esc(s: string | undefined | null): string {
  if (!s) return '';
  return String(s)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

function formatDate(dt: string): string {
  if (!dt) return 'To be confirmed';
  try {
    return new Date(dt).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return esc(dt); }
}

function passengerStr(adults: number, children: number): string {
  const a = `${adults} Adult${adults !== 1 ? 's' : ''}`;
  const c = children > 0 ? ` &amp; ${children} Child${children !== 1 ? 'ren' : ''}` : '';
  return a + c;
}

// ── Data row (labelled) ────────────────────────────────────────
function infoRow(label: string, value: string): string {
  if (!value || !value.trim()) return '';
  return `
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               style="border-bottom:1px solid #f0eeeb;">
          <tr>
            <td width="148" valign="top" style="padding:12px 16px 12px 0;">
              <span style="color:#9b9b9b;font-size:8px;letter-spacing:3.5px;text-transform:uppercase;
                           font-family:Arial,Helvetica,sans-serif;font-weight:700;">${label}</span>
            </td>
            <td valign="top" style="padding:12px 0;">
              <span style="color:#111111;font-size:14px;font-family:Arial,Helvetica,sans-serif;
                           font-weight:400;line-height:1.6;">${value}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

// ── Day plan row for itinerary table ──────────────────────────
function dayRow(day: SanitisedDayPlan, isEven: boolean): string {
  const bg     = isEven ? '#f9f8ff' : '#ffffff';
  const dest   = esc(day.destination)   || '&#8212;';
  const acts   = esc(day.activities)    || '&#8212;';
  const accom  = esc(day.accommodation) || '&#8212;';

  return `
    <tr bgcolor="${bg}" style="background-color:${bg};">
      <!-- Day number cell -->
      <td valign="top" width="48"
          style="padding:14px 10px 14px 16px;border-bottom:1px solid #f0eeeb;
                 border-right:2px solid #5e17eb;">
        <span style="color:#5e17eb;font-size:14px;
                     font-family:Georgia,'Times New Roman',Times,serif;
                     font-weight:700;line-height:1;">${String(day.day).padStart(2, '0')}</span>
      </td>
      <!-- Destination -->
      <td valign="top" style="padding:14px 10px;border-bottom:1px solid #f0eeeb;">
        <span style="color:#111111;font-size:13px;font-family:Arial,Helvetica,sans-serif;
                     font-weight:600;display:block;margin-bottom:3px;">${dest}</span>
        ${acts !== '&#8212;' ? `<span style="color:#888888;font-size:11px;font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.55;">${acts}</span>` : ''}
      </td>
      <!-- Accommodation -->
      <td valign="top" style="padding:14px 10px 14px 10px;border-bottom:1px solid #f0eeeb;">
        <span style="color:#666666;font-size:12px;font-family:Arial,Helvetica,sans-serif;
                     font-weight:300;line-height:1.55;">${accom}</span>
      </td>
    </tr>`;
}

// ── Section header ─────────────────────────────────────────────
function sectionTitle(title: string): string {
  return `
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:30px 48px 16px 48px;">
        <p style="margin:0;color:#0d0d0d;font-size:9px;letter-spacing:3px;text-transform:uppercase;
                  font-family:Arial,Helvetica,sans-serif;font-weight:700;">${title}</p>
      </td>
    </tr>`;
}

// ── Main Email Function ────────────────────────────────────────
export function customPlanningUserEmail(data: CustomPlanningUserEmailData): string {

  const siteUrl    = process.env.NEXT_PUBLIC_SITE_URL || 'https://srilankantriptip.com';
  const fullName   = `${esc(data.salutation)} ${esc(data.firstName)} ${esc(data.lastName)}`.trim();
  const startDate  = formatDate(data.startDate);
  const passengers = passengerStr(data.adults, data.children);
  const subjectRef = esc(data.bookingReference);
  const totalDays  = data.days.length;

  // Build itinerary rows
  const dayRows = data.days.length > 0
    ? data.days.map((d, i) => dayRow(d, i % 2 === 1)).join('')
    : `<tr><td colspan="3" style="padding:16px;color:#aaaaaa;font-size:13px;
            font-family:Arial,Helvetica,sans-serif;text-align:center;">
         No specific days planned — our architects will build your full itinerary.
       </td></tr>`;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,date=no,address=no,email=no" />
  <title>Your Bespoke Journey &#8212; Sri Lankan TripTip</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style type="text/css">
    body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td        { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img             { -ms-interpolation-mode:bicubic; border:0; }
    body            { margin:0!important; padding:0!important; background-color:#f4f4f4; }
    a[x-apple-data-detectors] { color:inherit!important; text-decoration:none!important; }
    @media only screen and (max-width:620px) {
      .outer   { padding:20px 10px!important; }
      .wrap    { width:100%!important; max-width:100%!important; }
      .pad     { padding-left:20px!important; padding-right:20px!important; }
      .hero-h1 { font-size:28px!important; }
      .hide-sm { display:none!important; max-height:0!important; overflow:hidden!important; }
      .day-accom { display:none!important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;-webkit-font-smoothing:antialiased;">

<!-- Preview Text -->
<div style="display:none;font-size:1px;color:#f4f4f4;line-height:1px;
            max-height:0;max-width:0;opacity:0;overflow:hidden;">
  ${subjectRef} &#8212; Your ${totalDays}-day bespoke Sri Lanka journey request has been received. We will be in touch within 24 hours.
</div>

<!-- Outer Wrapper -->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
       bgcolor="#f4f4f4" style="background-color:#f4f4f4;">
<tr>
<td class="outer" align="center" valign="top" style="padding:48px 16px;">

  <!-- Email Container -->
  <table role="presentation" class="wrap" width="600" cellspacing="0" cellpadding="0" border="0"
         style="max-width:600px;width:100%;margin:0 auto;">

    <!-- TOP ACCENT BAR -->
    <tr>
      <td height="4"
          style="background:linear-gradient(to right,#5e17eb,#1800ad);
                 background-color:#5e17eb;font-size:1px;line-height:4px;
                 mso-line-height-rule:exactly;">&nbsp;</td>
    </tr>

    <!-- HEADER -->
    <tr>
      <td bgcolor="#0d0d0d" style="background-color:#0d0d0d;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td class="pad" valign="middle" style="padding:34px 48px;">
            <p style="margin:0 0 6px 0;color:#5e17eb;font-size:8px;letter-spacing:4px;
                      text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-weight:700;">
              Bespoke Journey Planning
            </p>
            <p style="margin:0;color:#ffffff;font-size:22px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-weight:700;letter-spacing:-0.02em;line-height:1.2;">Sri Lankan TripTip</p>
          </td>
          <td class="hide-sm pad" align="right" valign="middle" style="padding:34px 48px;">
            <p style="margin:0;color:rgba(255,255,255,0.12);font-size:8px;letter-spacing:4px;
                      text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-weight:700;">
              Est.&nbsp;2012
            </p>
          </td>
        </tr>
        </table>
      </td>
    </tr>

    <!-- HERO -->
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
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-weight:700;">
          Planning Request Received
        </p>
        <h1 class="hero-h1"
            style="margin:0 0 26px 0;color:#0d0d0d;font-size:42px;
                   font-family:Georgia,'Times New Roman',Times,serif;
                   font-weight:700;line-height:1.04;letter-spacing:-2px;">
          Your Bespoke<br>Sri Lanka Journey<br>Has Begun.
        </h1>
        <p style="margin:0;color:#555555;font-size:15px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.9;">
          Dear ${fullName}, your custom planning request has been received and is in our
          hands. A dedicated travel architect will personally review your ${totalDays}-day
          itinerary outline and reach out within
          <strong style="color:#0d0d0d;font-weight:600;">24 hours</strong> to begin
          crafting your perfect journey.
        </p>
      </td>
    </tr>

    <!-- BOOKING REFERENCE -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:32px 48px 52px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               bgcolor="#f4f4f4" style="background-color:#f4f4f4;border-left:3px solid #5e17eb;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="margin:0 0 7px 0;color:#9b9b9b;font-size:8px;letter-spacing:3.5px;
                        text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                        font-weight:700;">Your Booking Reference</p>
              <p style="margin:0 0 6px 0;color:#0d0d0d;font-size:22px;
                        font-family:Georgia,'Times New Roman',Times,serif;
                        font-weight:700;letter-spacing:2.5px;">${subjectRef}</p>
              <p style="margin:0;color:#aaaaaa;font-size:11px;
                        font-family:Arial,Helvetica,sans-serif;font-weight:300;">
                ${totalDays} day${totalDays !== 1 ? 's' : ''} planned &nbsp;&#183;&nbsp;
                Please quote this reference in all correspondence.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- DIVIDER -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td height="1" bgcolor="#e8e4df"
                  style="background-color:#e8e4df;font-size:1px;line-height:1px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- SECTION: YOUR TRIP DETAILS -->
    ${sectionTitle('Your Trip Details')}
    ${infoRow('Pickup',         esc(data.pickupLocation))}
    ${infoRow('Start Date',     startDate)}
    ${infoRow('Passengers',     passengers)}
    ${data.luggageType ? infoRow('Luggage',  esc(data.luggageType)) : ''}
    ${data.contactMethod ? infoRow('We Will Contact Via', esc(data.contactMethod)) : ''}

    <!-- Spacer -->
    <tr>
      <td bgcolor="#ffffff"
          style="background-color:#ffffff;font-size:0;line-height:0;height:20px;">&nbsp;</td>
    </tr>

    <!-- DIVIDER -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td height="1" bgcolor="#e8e4df"
                  style="background-color:#e8e4df;font-size:1px;line-height:1px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- SECTION: YOUR ITINERARY OUTLINE -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:30px 48px 16px 48px;">
        <p style="margin:0 0 6px 0;color:#0d0d0d;font-size:9px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">Your Itinerary Outline</p>
        <p style="margin:0;color:#888888;font-size:12px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
          ${totalDays} day${totalDays !== 1 ? 's' : ''} submitted &nbsp;&#183;&nbsp;
          Our architects will enrich every gap with their local expertise.
        </p>
      </td>
    </tr>

    <!-- ITINERARY TABLE -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px 40px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               style="border:1px solid #e8e4df;">
          <!-- Table header -->
          <tr bgcolor="#0d0d0d" style="background-color:#0d0d0d;">
            <td width="48" style="padding:10px 10px 10px 16px;">
              <span style="color:rgba(255,255,255,0.3);font-size:8px;letter-spacing:2.5px;
                           text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                           font-weight:700;">Day</span>
            </td>
            <td style="padding:10px 10px;">
              <span style="color:rgba(255,255,255,0.3);font-size:8px;letter-spacing:2.5px;
                           text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                           font-weight:700;">Destination &amp; Activities</span>
            </td>
            <td class="day-accom" style="padding:10px 10px 10px 10px;">
              <span style="color:rgba(255,255,255,0.3);font-size:8px;letter-spacing:2.5px;
                           text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                           font-weight:700;">Accommodation</span>
            </td>
          </tr>
          <!-- Day rows -->
          ${dayRows}
        </table>
      </td>
    </tr>

    ${data.additionalNotes ? `
    <!-- DIVIDER -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td height="1" bgcolor="#e8e4df"
                  style="background-color:#e8e4df;font-size:1px;line-height:1px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>
    ${sectionTitle('Your Special Requests')}
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px 40px 48px;">
        <p style="margin:0;color:#555555;font-size:14px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.85;">
          ${esc(data.additionalNotes)}
        </p>
      </td>
    </tr>` : ''}

    <!-- DIVIDER -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td height="1" bgcolor="#e8e4df"
                  style="background-color:#e8e4df;font-size:1px;line-height:1px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- WHAT HAPPENS NEXT — 4 steps -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:30px 48px 20px 48px;">
        <p style="margin:0;color:#0d0d0d;font-size:9px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">What Happens Next</p>
      </td>
    </tr>

    <!-- Step 01 -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:0 48px 20px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td width="46" valign="top">
            <p style="margin:0;color:#5e17eb;font-size:19px;font-family:Georgia,serif;
                      font-weight:700;line-height:1.05;">01</p>
          </td>
          <td valign="top" style="padding-left:16px;">
            <p style="margin:0 0 5px 0;color:#0d0d0d;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:700;">
              Personal Architect Review
            </p>
            <p style="margin:0;color:#777777;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.8;">
              A dedicated travel architect reads every line of your submission — not an algorithm.
              They will reach out within 24 hours via your preferred contact method.
            </p>
          </td>
        </tr>
        </table>
      </td>
    </tr>
    <!-- Step 02 -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:0 48px 20px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td width="46" valign="top">
            <p style="margin:0;color:#5e17eb;font-size:19px;font-family:Georgia,serif;
                      font-weight:700;line-height:1.05;">02</p>
          </td>
          <td valign="top" style="padding-left:16px;">
            <p style="margin:0 0 5px 0;color:#0d0d0d;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:700;">
              Itinerary Proposal
            </p>
            <p style="margin:0;color:#777777;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.8;">
              We take your outline and fill every gap — hidden villages, dawn temples,
              secret routes — into a complete day-by-day proposal tailored exactly to you.
            </p>
          </td>
        </tr>
        </table>
      </td>
    </tr>
    <!-- Step 03 -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:0 48px 20px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td width="46" valign="top">
            <p style="margin:0;color:#5e17eb;font-size:19px;font-family:Georgia,serif;
                      font-weight:700;line-height:1.05;">03</p>
          </td>
          <td valign="top" style="padding-left:16px;">
            <p style="margin:0 0 5px 0;color:#0d0d0d;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:700;">
              Refine Until Perfect
            </p>
            <p style="margin:0;color:#777777;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.8;">
              No payment until you love it. We refine the itinerary until every detail
              feels right — adjusting pace, activities, and accommodation to match
              exactly what you envisioned.
            </p>
          </td>
        </tr>
        </table>
      </td>
    </tr>
    <!-- Step 04 -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:0 48px 20px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td width="46" valign="top">
            <p style="margin:0;color:#5e17eb;font-size:19px;font-family:Georgia,serif;
                      font-weight:700;line-height:1.05;">04</p>
          </td>
          <td valign="top" style="padding-left:16px;">
            <p style="margin:0 0 5px 0;color:#0d0d0d;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:700;">
              Your Journey Begins
            </p>
            <p style="margin:0;color:#777777;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.8;">
              Your dedicated guide, vehicle, and full support team are with you every
              day — from pickup to farewell. Sri Lanka, exactly as you imagined it.
            </p>
          </td>
        </tr>
        </table>
      </td>
    </tr>

    <!-- Spacer -->
    <tr>
      <td bgcolor="#ffffff"
          style="background-color:#ffffff;font-size:0;line-height:0;height:12px;">&nbsp;</td>
    </tr>

    <!-- DIVIDER -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td height="1" bgcolor="#e8e4df"
                  style="background-color:#e8e4df;font-size:1px;line-height:1px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- CTA SECTION -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:38px 48px 56px 48px;">
        <p style="margin:0 0 26px 0;color:#444444;font-size:14px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.8;">
          Questions about your bespoke plan? We are available every day of the week.
          Reach our planning team directly:
        </p>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td bgcolor="#5e17eb" style="background-color:#5e17eb;">
              <a href="mailto:journeys@srilankantriptip.com?subject=Re%3A%20Bespoke%20Plan%20${subjectRef}"
                 target="_blank"
                 style="display:inline-block;padding:17px 44px;color:#ffffff;font-size:9px;
                        font-family:Arial,Helvetica,sans-serif;font-weight:700;
                        text-decoration:none;letter-spacing:3px;text-transform:uppercase;
                        line-height:1;mso-padding-alt:0;">
                <!--[if mso]>&nbsp;&nbsp;&nbsp;<![endif]-->
                Contact Our Architects
                <!--[if mso]>&nbsp;&nbsp;&nbsp;<![endif]-->
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:18px 0 0 0;color:#aaaaaa;font-size:12px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
          Or call us 24/7:&nbsp;
          <a href="tel:+94771234567"
             style="color:#5e17eb;text-decoration:none;font-weight:600;">+94 77 123 4567</a>
          &nbsp;&nbsp;&#183;&nbsp;&nbsp;
          <a href="${siteUrl}/custom-planning"
             style="color:#5e17eb;text-decoration:none;font-weight:600;">
            srilankantriptip.com/custom-planning
          </a>
        </p>
      </td>
    </tr>

    <!-- INSPIRATIONAL BAND -->
    <tr>
      <td bgcolor="#f4f4f4" style="background-color:#f4f4f4;border-top:1px solid #e8e4df;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td class="pad" style="padding:30px 48px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td width="24" height="1" bgcolor="#5e17eb"
                    style="background-color:#5e17eb;font-size:1px;line-height:1px;">&nbsp;</td>
              </tr>
            </table>
            <p style="margin:14px 0 0 0;color:#888888;font-size:13px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-style:italic;font-weight:400;line-height:1.7;">
              &ldquo;We don&rsquo;t do tours. We do stories.
              Yours is about to be written.&rdquo;
            </p>
            <p style="margin:10px 0 0 0;color:#bbbbbb;font-size:10px;letter-spacing:2px;
                      text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                      font-weight:700;">
              Sri Lankan TripTip &#8212; The Island&rsquo;s Finest Curators
            </p>
          </td>
        </tr>
        </table>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td bgcolor="#0d0d0d" class="pad"
          style="background-color:#0d0d0d;padding:32px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td valign="top">
            <p style="margin:0 0 5px 0;color:#ffffff;font-size:13px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-weight:700;line-height:1.3;">Sri Lankan TripTip</p>
            <p style="margin:0 0 3px 0;color:rgba(255,255,255,0.25);font-size:11px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
              145 Galle Road, Colombo 03, Sri Lanka
            </p>
            <p style="margin:0 0 24px 0;color:rgba(255,255,255,0.25);font-size:11px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
              <a href="tel:+94771234567"
                 style="color:rgba(255,255,255,0.25);text-decoration:none;">+94 77 123 4567</a>
              &nbsp;&nbsp;&#183;&nbsp;&nbsp;
              <a href="mailto:journeys@triptip.lk"
                 style="color:rgba(255,255,255,0.25);text-decoration:none;">journeys@triptip.lk</a>
            </p>
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
                 style="color:rgba(255,255,255,0.18);text-decoration:underline;">${esc(data.email)}</a>
              because a bespoke tour planning request was submitted on srilankantriptip.com.
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
</td>
</tr>
</table>
</body>
</html>`;
}
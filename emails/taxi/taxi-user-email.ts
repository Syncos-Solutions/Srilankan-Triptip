// ============================================================
// TAXI BOOKING — USER CONFIRMATION EMAIL
// Sri Lankan TripTip
// Designed to render in: Gmail, Apple Mail, Outlook, Yahoo
// ============================================================

export interface TaxiUserEmailData {
  salutation:        string;
  fullName:          string;
  email:             string;
  phone:             string;
  preferredContact:  string;
  vehiclePreference: string;
  pickupLocation:    string;
  pickupDatetime:    string;
  destination:       string;
  adults:            number;
  children:          number;
  luggageType:       string;
  additionalNotes:   string;
  bookingReference:  string;
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

function formatDateTime(dt: string): string {
  if (!dt) return 'To be confirmed';
  try {
    return new Date(dt).toLocaleString('en-US', {
      weekday:  'long',
      year:     'numeric',
      month:    'long',
      day:      'numeric',
      hour:     '2-digit',
      minute:   '2-digit',
    });
  } catch {
    return esc(dt);
  }
}

function passengerStr(adults: number, children: number): string {
  const a = `${adults} Adult${adults !== 1 ? 's' : ''}`;
  const c = children > 0 ? ` &amp; ${children} Child${children !== 1 ? 'ren' : ''}` : '';
  return a + c;
}

// ── Data Row Component ─────────────────────────────────────────
function dataRow(label: string, value: string): string {
  if (!value || value.trim() === '') return '';
  return `
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               style="border-bottom:1px solid #f0eeeb;">
          <tr>
            <td width="148" valign="top" style="padding:13px 16px 13px 0;">
              <span style="color:#999999;font-size:8px;letter-spacing:3.5px;text-transform:uppercase;
                           font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:1.4;">${label}</span>
            </td>
            <td valign="top" style="padding:13px 0;">
              <span style="color:#111111;font-size:14px;font-family:Arial,Helvetica,sans-serif;
                           font-weight:400;line-height:1.55;">${value}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

// ── Main Email Function ────────────────────────────────────────
export function taxiBookingUserEmail(data: TaxiUserEmailData): string {

  const formattedDate = formatDateTime(data.pickupDatetime);
  const passengers    = passengerStr(data.adults, data.children);
  const vehicle       = esc(data.vehiclePreference) || 'Any Available';
  const subjectRef    = esc(data.bookingReference);

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,date=no,address=no,email=no" />
  <title>Transfer Confirmed &#8212; Sri Lankan TripTip</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style type="text/css">
    body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { -ms-interpolation-mode:bicubic; border:0; outline:none; text-decoration:none; }
    body { margin:0!important; padding:0!important; background-color:#f4f4f4; }
    a[x-apple-data-detectors] { color:inherit!important; text-decoration:none!important; }
    @media only screen and (max-width:620px) {
      .outer   { padding:24px 12px!important; }
      .wrap    { width:100%!important; max-width:100%!important; }
      .pad     { padding-left:24px!important; padding-right:24px!important; }
      .hero-h1 { font-size:30px!important; }
      .hide-sm { display:none!important; max-height:0!important; overflow:hidden!important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;word-spacing:normal;-webkit-font-smoothing:antialiased;">

<!-- ── Preview Text ─────────────────────────────────────── -->
<div style="display:none;font-size:1px;color:#f4f4f4;line-height:1px;
            max-height:0;max-width:0;opacity:0;overflow:hidden;">
  Your Sri Lankan TripTip transfer is confirmed &#8212; ${subjectRef}. We will confirm your driver within one hour.
</div>

<!-- ── Outer Wrapper ────────────────────────────────────── -->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
       bgcolor="#f4f4f4" style="background-color:#f4f4f4;">
<tr>
<td class="outer" align="center" valign="top" style="padding:48px 16px;">

  <!-- ── Email Container ──────────────────────────────── -->
  <table role="presentation" class="wrap" width="600" cellspacing="0" cellpadding="0" border="0"
         style="max-width:600px;width:100%;margin:0 auto;">

    <!-- TOP ACCENT BAR -->
    <tr>
      <td height="4" bgcolor="#5e17eb"
          style="background-color:#5e17eb;font-size:1px;line-height:4px;
                 mso-line-height-rule:exactly;">&nbsp;</td>
    </tr>

    <!-- ── HEADER ──────────────────────────────────────── -->
    <tr>
      <td bgcolor="#0d0d0d" style="background-color:#0d0d0d;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td class="pad" valign="middle" style="padding:34px 48px;">
            <p style="margin:0 0 5px 0;color:#5e17eb;font-size:8px;letter-spacing:4px;
                      text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                      font-weight:700;line-height:1;">Taxi &amp; Transfer Service</p>
            <p style="margin:0;color:#ffffff;font-size:21px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-weight:700;letter-spacing:-0.01em;line-height:1.2;">Sri Lankan TripTip</p>
          </td>
          <td class="hide-sm pad" align="right" valign="middle" style="padding:34px 48px;">
            <p style="margin:0;color:rgba(255,255,255,0.14);font-size:8px;letter-spacing:4px;
                      text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                      font-weight:700;">Est.&nbsp;2012</p>
          </td>
        </tr>
        </table>
      </td>
    </tr>

    <!-- ── HERO ────────────────────────────────────────── -->
    <tr>
      <td bgcolor="#ffffff" class="pad" style="background-color:#ffffff;padding:48px 48px 0 48px;">
        <!-- Purple accent line -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="40" height="2" bgcolor="#5e17eb"
                style="background-color:#5e17eb;font-size:1px;line-height:2px;">&nbsp;</td>
          </tr>
        </table>
        <p style="margin:18px 0 7px 0;color:#5e17eb;font-size:8px;letter-spacing:4px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;line-height:1;">Transfer Confirmed</p>
        <h1 class="hero-h1"
            style="margin:0 0 22px 0;color:#0d0d0d;font-size:40px;
                   font-family:Georgia,'Times New Roman',Times,serif;
                   font-weight:700;line-height:1.06;letter-spacing:-2px;">
          Your Journey<br>is Confirmed.
        </h1>
        <p style="margin:0;color:#555555;font-size:15px;font-family:Arial,Helvetica,sans-serif;
                  font-weight:300;line-height:1.85;">
          Dear ${esc(data.salutation)} ${esc(data.fullName)}, your transfer request has been received
          and logged in our system. A member of our team will confirm your dedicated driver and vehicle
          details within <strong style="color:#0d0d0d;font-weight:600;">one hour</strong> of submission.
        </p>
      </td>
    </tr>

    <!-- BOOKING REFERENCE BLOCK -->
    <tr>
      <td bgcolor="#ffffff" class="pad" style="background-color:#ffffff;padding:32px 48px 48px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               bgcolor="#f4f4f4" style="background-color:#f4f4f4;border-left:3px solid #5e17eb;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="margin:0 0 6px 0;color:#9b9b9b;font-size:8px;letter-spacing:3.5px;
                        text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                        font-weight:700;">Your Booking Reference</p>
              <p style="margin:0;color:#0d0d0d;font-size:22px;
                        font-family:Georgia,'Times New Roman',Times,serif;
                        font-weight:700;letter-spacing:2px;">${subjectRef}</p>
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

    <!-- SECTION TITLE: BOOKING SUMMARY -->
    <tr>
      <td bgcolor="#ffffff" class="pad" style="background-color:#ffffff;padding:32px 48px 18px 48px;">
        <p style="margin:0;color:#0d0d0d;font-size:9px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">Booking Summary</p>
      </td>
    </tr>

    <!-- DATA ROWS -->
    ${dataRow('Pickup Location', esc(data.pickupLocation))}
    ${dataRow('Date &amp; Time',  formattedDate)}
    ${dataRow('Destination',      esc(data.destination))}
    ${dataRow('Vehicle',          vehicle)}
    ${dataRow('Passengers',       passengers)}
    ${data.luggageType    ? dataRow('Luggage', esc(data.luggageType))    : ''}
    ${data.additionalNotes ? dataRow('Notes',  esc(data.additionalNotes)) : ''}

    <!-- Spacer -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;font-size:0;
                                   line-height:0;height:28px;">&nbsp;</td>
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

    <!-- SECTION TITLE: WHAT HAPPENS NEXT -->
    <tr>
      <td bgcolor="#ffffff" class="pad" style="background-color:#ffffff;padding:32px 48px 24px 48px;">
        <p style="margin:0;color:#0d0d0d;font-size:9px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">What Happens Next</p>
      </td>
    </tr>

    <!-- STEP 01 -->
    <tr>
      <td bgcolor="#ffffff" class="pad" style="background-color:#ffffff;padding:0 48px 20px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td width="44" valign="top">
            <p style="margin:0;color:#5e17eb;font-size:19px;font-family:Georgia,serif;
                      font-weight:700;line-height:1.1;">01</p>
          </td>
          <td valign="top" style="padding-left:16px;">
            <p style="margin:0 0 4px 0;color:#0d0d0d;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:1.3;">
              Booking Review
            </p>
            <p style="margin:0;color:#777777;font-size:13px;font-family:Arial,Helvetica,sans-serif;
                      font-weight:300;line-height:1.75;">
              Our team reviews your transfer request and confirms vehicle and driver availability.
              You will hear from us within one hour.
            </p>
          </td>
        </tr>
        </table>
      </td>
    </tr>

    <!-- STEP 02 -->
    <tr>
      <td bgcolor="#ffffff" class="pad" style="background-color:#ffffff;padding:0 48px 20px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td width="44" valign="top">
            <p style="margin:0;color:#5e17eb;font-size:19px;font-family:Georgia,serif;
                      font-weight:700;line-height:1.1;">02</p>
          </td>
          <td valign="top" style="padding-left:16px;">
            <p style="margin:0 0 4px 0;color:#0d0d0d;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:1.3;">
              Driver Assignment
            </p>
            <p style="margin:0;color:#777777;font-size:13px;font-family:Arial,Helvetica,sans-serif;
                      font-weight:300;line-height:1.75;">
              Your dedicated driver is assigned. We send their full name, vehicle plate number,
              and direct contact via your preferred channel.
            </p>
          </td>
        </tr>
        </table>
      </td>
    </tr>

    <!-- STEP 03 -->
    <tr>
      <td bgcolor="#ffffff" class="pad" style="background-color:#ffffff;padding:0 48px 20px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td width="44" valign="top">
            <p style="margin:0;color:#5e17eb;font-size:19px;font-family:Georgia,serif;
                      font-weight:700;line-height:1.1;">03</p>
          </td>
          <td valign="top" style="padding-left:16px;">
            <p style="margin:0 0 4px 0;color:#0d0d0d;font-size:13px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:1.3;">
              Day of Transfer
            </p>
            <p style="margin:0;color:#777777;font-size:13px;font-family:Arial,Helvetica,sans-serif;
                      font-weight:300;line-height:1.75;">
              Your driver arrives at the pickup point on time, every time — with a name board
              if requested. Zero stress. Total comfort.
            </p>
          </td>
        </tr>
        </table>
      </td>
    </tr>

    <!-- Spacer -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;font-size:0;
                                   line-height:0;height:12px;">&nbsp;</td>
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
      <td bgcolor="#ffffff" class="pad" style="background-color:#ffffff;padding:36px 48px 52px 48px;">
        <p style="margin:0 0 22px 0;color:#444444;font-size:14px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.75;">
          Need to make a change, or have a question about your transfer?
        </p>
        <!-- CTA Button -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td bgcolor="#5e17eb" style="background-color:#5e17eb;">
              <a href="mailto:taxi@srilankantriptip.com?subject=Re%3A%20${subjectRef}"
                 target="_blank"
                 style="display:inline-block;padding:16px 40px;color:#ffffff;font-size:9px;
                        font-family:Arial,Helvetica,sans-serif;font-weight:700;
                        text-decoration:none;letter-spacing:3px;text-transform:uppercase;
                        line-height:1;mso-padding-alt:0;">
                <!--[if mso]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]-->
                Contact Our Team
                <!--[if mso]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]-->
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0 0;color:#aaaaaa;font-size:12px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
          Or call us 24/7:&nbsp;
          <a href="tel:+94771234567" style="color:#5e17eb;text-decoration:none;font-weight:600;">
            +94 77 123 4567
          </a>
        </p>
      </td>
    </tr>

    <!-- ── FOOTER ───────────────────────────────────────── -->
    <tr>
      <td bgcolor="#0d0d0d" class="pad" style="background-color:#0d0d0d;padding:32px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td valign="top">
            <p style="margin:0 0 6px 0;color:#ffffff;font-size:13px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-weight:700;line-height:1.3;">Sri Lankan TripTip</p>
            <p style="margin:0 0 3px 0;color:rgba(255,255,255,0.28);font-size:11px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
              145 Galle Road, Colombo 03, Sri Lanka
            </p>
            <p style="margin:0 0 22px 0;color:rgba(255,255,255,0.28);font-size:11px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
              <a href="tel:+94771234567"
                 style="color:rgba(255,255,255,0.28);text-decoration:none;">+94 77 123 4567</a>
              &nbsp;&nbsp;&#183;&nbsp;&nbsp;
              <a href="mailto:journeys@triptip.lk"
                 style="color:rgba(255,255,255,0.28);text-decoration:none;">journeys@triptip.lk</a>
            </p>
            <!-- Footer divider -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr><td height="1" bgcolor="#1e1e1e"
                      style="background-color:#1e1e1e;font-size:1px;line-height:1px;">&nbsp;</td></tr>
            </table>
            <p style="margin:14px 0 0 0;color:rgba(255,255,255,0.1);font-size:10px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.65;">
              This email was sent to
              <a href="mailto:${esc(data.email)}"
                 style="color:rgba(255,255,255,0.2);text-decoration:underline;">${esc(data.email)}</a>
              because a taxi transfer booking was submitted on srilankantriptip.com.
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
// ============================================================
// TAXI BOOKING — ADMIN NOTIFICATION EMAIL
// Sri Lankan TripTip
// Sent to: ADMIN_EMAIL on every new taxi booking submission
// ============================================================

import type { TaxiUserEmailData } from './taxi-user-email';

function esc(str: string | undefined | null): string {
  if (!str) return '&#8212;';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDateTime(dt: string): string {
  if (!dt) return 'Not specified';
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

function adminRow(label: string, value: string, highlight = false): string {
  return `
    <tr>
      <td style="padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               style="border-bottom:1px solid #f0eeeb;">
          <tr>
            <td width="160" valign="top" style="padding:13px 16px 13px 0;">
              <span style="color:#9b9b9b;font-size:8px;letter-spacing:3.5px;
                           text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                           font-weight:700;line-height:1.4;">${label}</span>
            </td>
            <td valign="top" style="padding:13px 0;">
              <span style="color:${highlight ? '#5e17eb' : '#0d0d0d'};
                           font-size:14px;font-family:Arial,Helvetica,sans-serif;
                           font-weight:${highlight ? '700' : '400'};
                           line-height:1.55;">${value}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function sectionHeader(title: string): string {
  return `
    <tr>
      <td style="padding:28px 48px 16px 48px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="28" height="2" bgcolor="#5e17eb"
                style="background-color:#5e17eb;font-size:1px;line-height:2px;">&nbsp;</td>
          </tr>
        </table>
        <p style="margin:12px 0 0 0;color:#0d0d0d;font-size:9px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">${title}</p>
      </td>
    </tr>`;
}

export function taxiBookingAdminEmail(data: TaxiUserEmailData): string {

  const now          = new Date().toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
  const formattedDate = formatDateTime(data.pickupDatetime);
  const passengers    = `${data.adults} Adult${data.adults !== 1 ? 's' : ''}` +
                        (data.children > 0 ? ` &amp; ${data.children} Child${data.children !== 1 ? 'ren' : ''}` : '');
  const adminUrl      = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.srilankantriptip.com';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>New Taxi Booking &#8212; ${esc(data.bookingReference)}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style type="text/css">
    body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    body { margin:0!important; padding:0!important; background-color:#f4f4f4; }
    @media only screen and (max-width:620px) {
      .outer { padding:20px 12px!important; }
      .wrap  { width:100%!important; max-width:100%!important; }
      .pad   { padding-left:24px!important; padding-right:24px!important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;-webkit-font-smoothing:antialiased;">

<!-- Preview Text -->
<div style="display:none;font-size:1px;color:#f4f4f4;line-height:1px;
            max-height:0;max-width:0;opacity:0;overflow:hidden;">
  NEW TAXI BOOKING: ${esc(data.fullName)} &#8212; ${esc(data.bookingReference)} &#8212; ${esc(data.pickupLocation)} to ${esc(data.destination)}
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
      <td height="4" bgcolor="#5e17eb"
          style="background-color:#5e17eb;font-size:1px;line-height:4px;
                 mso-line-height-rule:exactly;">&nbsp;</td>
    </tr>

    <!-- HEADER -->
    <tr>
      <td bgcolor="#0d0d0d" style="background-color:#0d0d0d;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td class="pad" valign="middle" style="padding:34px 48px;">
            <p style="margin:0 0 5px 0;color:#5e17eb;font-size:8px;letter-spacing:4px;
                      text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                      font-weight:700;line-height:1;">Admin Notifications</p>
            <p style="margin:0;color:#ffffff;font-size:21px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-weight:700;letter-spacing:-0.01em;line-height:1.2;">Sri Lankan TripTip</p>
          </td>
          <td align="right" valign="middle" style="padding:34px 48px;">
            <!-- NEW badge -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td bgcolor="#5e17eb" style="background-color:#5e17eb;padding:6px 14px;">
                  <p style="margin:0;color:#ffffff;font-size:8px;letter-spacing:3px;
                            text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                            font-weight:700;">New Booking</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        </table>
      </td>
    </tr>

    <!-- ALERT SECTION -->
    <tr>
      <td bgcolor="#ffffff" class="pad" style="background-color:#ffffff;padding:44px 48px 0 48px;">
        <!-- Accent line -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="40" height="2" bgcolor="#5e17eb"
                style="background-color:#5e17eb;font-size:1px;line-height:2px;">&nbsp;</td>
          </tr>
        </table>
        <p style="margin:18px 0 7px 0;color:#5e17eb;font-size:8px;letter-spacing:4px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;line-height:1;">Taxi &amp; Transfer</p>
        <h1 style="margin:0 0 14px 0;color:#0d0d0d;font-size:34px;
                   font-family:Georgia,'Times New Roman',Times,serif;
                   font-weight:700;line-height:1.06;letter-spacing:-1.5px;">
          New Transfer Request<br>Received.
        </h1>
        <p style="margin:0 0 0 0;color:#555555;font-size:14px;font-family:Arial,Helvetica,sans-serif;
                  font-weight:300;line-height:1.8;">
          A new taxi booking has been submitted on srilankantriptip.com and saved to your database.
          Review the details below and confirm the booking.
        </p>
      </td>
    </tr>

    <!-- BOOKING REFERENCE + TIMESTAMP -->
    <tr>
      <td bgcolor="#ffffff" class="pad" style="background-color:#ffffff;padding:28px 48px 36px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               bgcolor="#f4f4f4" style="background-color:#f4f4f4;border-left:3px solid #5e17eb;">
          <tr>
            <td style="padding:18px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td valign="top">
                  <p style="margin:0 0 5px 0;color:#9b9b9b;font-size:8px;letter-spacing:3.5px;
                            text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                            font-weight:700;">Booking Reference</p>
                  <p style="margin:0;color:#5e17eb;font-size:20px;
                            font-family:Georgia,'Times New Roman',Times,serif;
                            font-weight:700;letter-spacing:2px;">${esc(data.bookingReference)}</p>
                </td>
                <td align="right" valign="top">
                  <p style="margin:0 0 5px 0;color:#9b9b9b;font-size:8px;letter-spacing:3.5px;
                            text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                            font-weight:700;">Submitted</p>
                  <p style="margin:0;color:#555555;font-size:12px;
                            font-family:Arial,Helvetica,sans-serif;
                            font-weight:400;">${now}</p>
                </td>
              </tr>
              </table>
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

    <!-- SECTION: CUSTOMER DETAILS -->
    ${sectionHeader('Customer Details')}
    ${adminRow('Full Name',           esc(data.salutation) + ' ' + esc(data.fullName), true)}
    ${adminRow('Email Address',       `<a href="mailto:${esc(data.email)}" style="color:#5e17eb;text-decoration:none;">${esc(data.email)}</a>`)}
    ${adminRow('Phone / WhatsApp',    `<a href="tel:${esc(data.phone)}" style="color:#5e17eb;text-decoration:none;">${esc(data.phone)}</a>`)}
    ${adminRow('Preferred Contact',   esc(data.preferredContact) || 'Not specified')}

    <!-- Spacer -->
    <tr><td bgcolor="#ffffff" style="background-color:#ffffff;font-size:0;line-height:0;height:8px;">&nbsp;</td></tr>

    <!-- DIVIDER -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td height="1" bgcolor="#e8e4df"
                  style="background-color:#e8e4df;font-size:1px;line-height:1px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- SECTION: TRANSFER DETAILS -->
    ${sectionHeader('Transfer Details')}
    ${adminRow('Pickup Location',   esc(data.pickupLocation))}
    ${adminRow('Date &amp; Time',   formattedDate)}
    ${adminRow('Destination',       esc(data.destination))}
    ${adminRow('Vehicle Requested', esc(data.vehiclePreference) || 'Any Available')}
    ${adminRow('Passengers',        passengers)}
    ${adminRow('Luggage',           esc(data.luggageType) || 'Not specified')}
    ${data.additionalNotes
      ? adminRow('Customer Notes', esc(data.additionalNotes))
      : adminRow('Customer Notes', 'None provided')}

    <!-- Spacer -->
    <tr><td bgcolor="#ffffff" style="background-color:#ffffff;font-size:0;line-height:0;height:28px;">&nbsp;</td></tr>

    <!-- DIVIDER -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td height="1" bgcolor="#e8e4df"
                  style="background-color:#e8e4df;font-size:1px;line-height:1px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- CTA: VIEW IN ADMIN -->
    <tr>
      <td bgcolor="#ffffff" class="pad" style="background-color:#ffffff;padding:36px 48px 52px 48px;">
        <p style="margin:0 0 8px 0;color:#9b9b9b;font-size:8px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">Current Status</p>
        <p style="margin:0 0 24px 0;color:#0d0d0d;font-size:14px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:1.5;">
          <span style="display:inline-block;background-color:#f4f4f4;
                       border-left:3px solid #5e17eb;padding:6px 14px;
                       font-size:11px;letter-spacing:2px;text-transform:uppercase;
                       font-weight:700;color:#5e17eb;">New &#8212; Awaiting Review</span>
        </p>
        <!-- Admin Panel CTA -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td bgcolor="#5e17eb" style="background-color:#5e17eb;">
              <a href="${adminUrl}/bookings/taxi"
                 target="_blank"
                 style="display:inline-block;padding:16px 40px;color:#ffffff;font-size:9px;
                        font-family:Arial,Helvetica,sans-serif;font-weight:700;
                        text-decoration:none;letter-spacing:3px;text-transform:uppercase;
                        line-height:1;mso-padding-alt:0;">
                <!--[if mso]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]-->
                View in Admin Panel
                <!--[if mso]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]-->
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:14px 0 0 0;color:#aaaaaa;font-size:11px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
          Reply directly to the customer:&nbsp;
          <a href="mailto:${esc(data.email)}?subject=Re%3A%20Your%20Transfer%20${esc(data.bookingReference)}"
             style="color:#5e17eb;text-decoration:none;font-weight:600;">${esc(data.email)}</a>
        </p>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td bgcolor="#0d0d0d" class="pad" style="background-color:#0d0d0d;padding:28px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td valign="top">
            <p style="margin:0 0 6px 0;color:#ffffff;font-size:13px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-weight:700;line-height:1.3;">Sri Lankan TripTip &#8212; Admin System</p>
            <p style="margin:0 0 20px 0;color:rgba(255,255,255,0.28);font-size:11px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
              This is an automated notification. Do not reply to this email.
            </p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr><td height="1" bgcolor="#1e1e1e"
                      style="background-color:#1e1e1e;font-size:1px;line-height:1px;">&nbsp;</td></tr>
            </table>
            <p style="margin:12px 0 0 0;color:rgba(255,255,255,0.1);font-size:10px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.6;">
              Booking reference: ${esc(data.bookingReference)} &#183; Submitted by: ${esc(data.email)}
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
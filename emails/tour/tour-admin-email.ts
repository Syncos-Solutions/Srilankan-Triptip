// ============================================================
// TOUR BOOKING — ADMIN NOTIFICATION EMAIL
// Sri Lankan TripTip
// Folder: emails/tour/tour-admin-email.ts
//
// Sent to: ADMIN_EMAIL on every new tour booking submission.
// Includes full customer + tour details, booking reference,
// direct reply link, and admin panel CTA.
// ============================================================

import type { TourUserEmailData } from './tour-user-email';

function esc(str: string | undefined | null): string {
  if (!str) return '&#8212;';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(dt: string): string {
  if (!dt) return 'Not specified';
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

// ── Section Header ─────────────────────────────────────────────
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

// ── Admin Data Row ─────────────────────────────────────────────
function adminRow(
  label:     string,
  value:     string,
  highlight: boolean = false
): string {
  return `
    <tr>
      <td style="padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               style="border-bottom:1px solid #f0eeeb;">
          <tr>
            <td width="168" valign="top" style="padding:13px 16px 13px 0;">
              <span style="color:#9b9b9b;font-size:8px;letter-spacing:3.5px;
                           text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                           font-weight:700;line-height:1.4;">${label}</span>
            </td>
            <td valign="top" style="padding:13px 0;">
              <span style="color:${highlight ? '#5e17eb' : '#0d0d0d'};
                           font-size:14px;font-family:Arial,Helvetica,sans-serif;
                           font-weight:${highlight ? '700' : '400'};
                           line-height:1.6;">${value}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

// ── Tour Highlight Row ─────────────────────────────────────────
function tourHighlightRow(tourName: string): string {
  return `
    <tr>
      <td style="padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               style="background-color:#f8f6ff;border-left:3px solid #5e17eb;
                      border-bottom:1px solid #ede9ff;">
          <tr>
            <td width="168" valign="top" style="padding:16px 16px 16px 20px;">
              <span style="color:#8b5cf6;font-size:8px;letter-spacing:3.5px;
                           text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                           font-weight:700;line-height:1.4;">Tour Requested</span>
            </td>
            <td valign="top" style="padding:16px 16px 16px 0;">
              <span style="color:#5e17eb;font-size:15px;
                           font-family:Georgia,'Times New Roman',Times,serif;
                           font-weight:700;line-height:1.4;letter-spacing:-0.01em;">${tourName}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

// ── Main Email Function ────────────────────────────────────────
export function tourBookingAdminEmail(data: TourUserEmailData): string {

  const adminUrl   = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.srilankantriptip.com';
  const now        = new Date().toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
  const passengers = `${data.adults} Adult${data.adults !== 1 ? 's' : ''}` +
                     (data.children > 0
                       ? ` &amp; ${data.children} Child${data.children !== 1 ? 'ren' : ''}`
                       : '');
  const startDate  = formatDate(data.preferredStartDate);

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>New Tour Booking &#8212; ${esc(data.bookingReference)}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style type="text/css">
    body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td        { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    body            { margin:0!important; padding:0!important; background-color:#f4f4f4; }
    @media only screen and (max-width:620px) {
      .outer { padding:20px 12px!important; }
      .wrap  { width:100%!important; max-width:100%!important; }
      .pad   { padding-left:24px!important; padding-right:24px!important; }
      .ref-table td { display:block!important; text-align:left!important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;-webkit-font-smoothing:antialiased;">

<!-- Preview Text -->
<div style="display:none;font-size:1px;color:#f4f4f4;line-height:1px;
            max-height:0;max-width:0;opacity:0;overflow:hidden;">
  NEW TOUR BOOKING &#8212; ${esc(data.bookingReference)}: ${esc(data.fullName)} wants to book ${esc(data.tourName)}
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
                      text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                      font-weight:700;line-height:1;">Admin Notifications</p>
            <p style="margin:0;color:#ffffff;font-size:22px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-weight:700;letter-spacing:-0.02em;line-height:1.2;">Sri Lankan TripTip</p>
          </td>
          <td align="right" valign="middle" style="padding:34px 48px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td bgcolor="#5e17eb" style="background-color:#5e17eb;padding:7px 16px;">
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

    <!-- ALERT HERO -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:48px 48px 0 48px;">
        <!-- Accent line -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="40" height="2" bgcolor="#5e17eb"
                style="background-color:#5e17eb;font-size:1px;line-height:2px;">&nbsp;</td>
          </tr>
        </table>
        <p style="margin:20px 0 8px 0;color:#5e17eb;font-size:8px;letter-spacing:4px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;line-height:1;">Tour Booking</p>
        <h1 style="margin:0 0 16px 0;color:#0d0d0d;font-size:36px;
                   font-family:Georgia,'Times New Roman',Times,serif;
                   font-weight:700;line-height:1.04;letter-spacing:-1.5px;">
          New Tour Booking<br>Request Received.
        </h1>
        <p style="margin:0;color:#555555;font-size:14px;
                  font-family:Arial,Helvetica,sans-serif;
                  font-weight:300;line-height:1.85;">
          A new tour booking has been submitted and saved to your database.
          Review the full details below, confirm availability, and reach out to
          the customer within 24 hours.
        </p>
      </td>
    </tr>

    <!-- REFERENCE + TIMESTAMP BLOCK -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:28px 48px 40px 48px;">
        <table role="presentation" class="ref-table" width="100%" cellspacing="0" cellpadding="0" border="0"
               bgcolor="#f4f4f4"
               style="background-color:#f4f4f4;border-left:3px solid #5e17eb;">
          <tr>
            <td style="padding:20px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td valign="top">
                  <p style="margin:0 0 6px 0;color:#9b9b9b;font-size:8px;letter-spacing:3.5px;
                            text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                            font-weight:700;">Booking Reference</p>
                  <p style="margin:0;color:#5e17eb;font-size:21px;
                            font-family:Georgia,'Times New Roman',Times,serif;
                            font-weight:700;letter-spacing:2px;">
                    ${esc(data.bookingReference)}
                  </p>
                </td>
                <td align="right" valign="top">
                  <p style="margin:0 0 6px 0;color:#9b9b9b;font-size:8px;letter-spacing:3.5px;
                            text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                            font-weight:700;">Submitted At</p>
                  <p style="margin:0;color:#555555;font-size:12px;
                            font-family:Arial,Helvetica,sans-serif;font-weight:400;">${now}</p>
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

    <!-- SECTION: TOUR REQUESTED -->
    ${sectionHeader('Tour Requested')}
    ${tourHighlightRow(esc(data.tourName))}
    ${data.tourCategory
      ? adminRow('Category',  esc(data.tourCategory))
      : ''}
    ${data.tourDuration
      ? adminRow('Duration',  esc(data.tourDuration))
      : ''}
    ${data.tourPriceDisplay
      ? adminRow('Listed Price', esc(data.tourPriceDisplay))
      : ''}

    <!-- spacer -->
    <tr>
      <td bgcolor="#ffffff"
          style="background-color:#ffffff;font-size:0;line-height:0;height:8px;">&nbsp;</td>
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
    ${adminRow('Full Name',
      `${esc(data.salutation)} ${esc(data.fullName)}`,
      true
    )}
    ${adminRow('Email Address',
      `<a href="mailto:${esc(data.email)}" style="color:#5e17eb;text-decoration:none;">${esc(data.email)}</a>`
    )}
    ${adminRow('Phone / WhatsApp',
      `<a href="tel:${esc(data.phone)}" style="color:#5e17eb;text-decoration:none;">${esc(data.phone)}</a>`
    )}
    ${adminRow('Preferred Contact',
      esc(data.preferredContact) || 'Not specified'
    )}

    <!-- spacer -->
    <tr>
      <td bgcolor="#ffffff"
          style="background-color:#ffffff;font-size:0;line-height:0;height:8px;">&nbsp;</td>
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

    <!-- SECTION: TRIP DETAILS -->
    ${sectionHeader('Trip Details')}
    ${adminRow('Pickup Location',    esc(data.pickupLocation))}
    ${adminRow('Preferred Start',    startDate)}
    ${adminRow('Passengers',         passengers)}
    ${adminRow('Luggage',
      esc(data.luggageType) || 'Not specified'
    )}
    ${adminRow('Special Requests',
      esc(data.additionalNotes) || 'None provided'
    )}

    <!-- spacer -->
    <tr>
      <td bgcolor="#ffffff"
          style="background-color:#ffffff;font-size:0;line-height:0;height:28px;">&nbsp;</td>
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

    <!-- ADMIN ACTION SECTION -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:36px 48px 52px 48px;">

        <!-- Status badge -->
        <p style="margin:0 0 8px 0;color:#9b9b9b;font-size:8px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">Current Status</p>
        <p style="margin:0 0 28px 0;">
          <span style="display:inline-block;background-color:#f4f4f4;
                       border-left:3px solid #5e17eb;padding:7px 16px;
                       font-size:10px;letter-spacing:2.5px;text-transform:uppercase;
                       font-family:Arial,Helvetica,sans-serif;
                       font-weight:700;color:#5e17eb;">
            New &#8212; Awaiting Review
          </span>
        </p>

        <!-- Action reminder -->
        <p style="margin:0 0 24px 0;color:#444444;font-size:14px;
                  font-family:Arial,Helvetica,sans-serif;
                  font-weight:300;line-height:1.8;">
          Remember to contact this customer within
          <strong style="color:#0d0d0d;font-weight:700;">24 hours</strong> to confirm
          availability and share next steps.
        </p>

        <!-- CTA: Admin Panel -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td bgcolor="#5e17eb" style="background-color:#5e17eb;">
              <a href="${adminUrl}/bookings/tours"
                 target="_blank"
                 style="display:inline-block;padding:17px 44px;color:#ffffff;font-size:9px;
                        font-family:Arial,Helvetica,sans-serif;font-weight:700;
                        text-decoration:none;letter-spacing:3px;
                        text-transform:uppercase;line-height:1;mso-padding-alt:0;">
                <!--[if mso]>&nbsp;&nbsp;&nbsp;<![endif]-->
                View in Admin Panel
                <!--[if mso]>&nbsp;&nbsp;&nbsp;<![endif]-->
              </a>
            </td>
          </tr>
        </table>

        <!-- Direct reply link -->
        <p style="margin:16px 0 0 0;color:#aaaaaa;font-size:11px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
          Reply directly to the customer:&nbsp;
          <a href="mailto:${esc(data.email)}?subject=Re%3A%20Your%20Tour%20Booking%20${esc(data.bookingReference)}"
             style="color:#5e17eb;text-decoration:none;font-weight:600;">
            ${esc(data.email)}
          </a>
        </p>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td bgcolor="#0d0d0d" class="pad"
          style="background-color:#0d0d0d;padding:28px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td valign="top">
            <p style="margin:0 0 5px 0;color:#ffffff;font-size:13px;
                      font-family:Georgia,'Times New Roman',Times,serif;
                      font-weight:700;line-height:1.3;">Sri Lankan TripTip &#8212; Admin System</p>
            <p style="margin:0 0 20px 0;color:rgba(255,255,255,0.26);font-size:11px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
              This is an automated notification. Do not reply to this system email.
            </p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td height="1" bgcolor="#1e1e1e"
                    style="background-color:#1e1e1e;font-size:1px;line-height:1px;">&nbsp;</td>
              </tr>
            </table>
            <p style="margin:12px 0 0 0;color:rgba(255,255,255,0.1);font-size:10px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.65;">
              Booking reference: ${esc(data.bookingReference)}
              &#183; Customer: ${esc(data.email)}
              &#183; Tour: ${esc(data.tourName)}
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
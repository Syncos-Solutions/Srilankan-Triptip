// ============================================================
// CUSTOM PLANNING — ADMIN NOTIFICATION EMAIL
// Sri Lankan TripTip
// Folder: emails/custom-planning/custom-admin-email.ts
//
// Renders the complete day-by-day itinerary as a styled table
// plus all customer details and a direct admin panel CTA.
// ============================================================

import type {
  CustomPlanningUserEmailData,
  SanitisedDayPlan,
} from './custom-user-email';

function esc(s: string | undefined | null): string {
  if (!s) return '&#8212;';
  return String(s)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

function formatDate(dt: string): string {
  if (!dt) return 'Not specified';
  try {
    return new Date(dt).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return esc(dt); }
}

// ── Section header ─────────────────────────────────────────────
function sectionHeader(title: string): string {
  return `
    <tr>
      <td style="padding:28px 48px 14px 48px;">
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

// ── Admin data row ─────────────────────────────────────────────
function adminRow(label: string, value: string, highlight = false): string {
  return `
    <tr>
      <td style="padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               style="border-bottom:1px solid #f0eeeb;">
          <tr>
            <td width="160" valign="top" style="padding:12px 14px 12px 0;">
              <span style="color:#9b9b9b;font-size:8px;letter-spacing:3.5px;text-transform:uppercase;
                           font-family:Arial,Helvetica,sans-serif;font-weight:700;">${label}</span>
            </td>
            <td valign="top" style="padding:12px 0;">
              <span style="color:${highlight ? '#5e17eb' : '#0d0d0d'};font-size:14px;
                           font-family:Arial,Helvetica,sans-serif;
                           font-weight:${highlight ? '700' : '400'};
                           line-height:1.6;">${value}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

// ── Admin day row ──────────────────────────────────────────────
function adminDayRow(day: SanitisedDayPlan, isEven: boolean): string {
  const bg    = isEven ? '#f9f8ff' : '#ffffff';
  const dest  = esc(day.destination)   || '&#8212;';
  const acts  = esc(day.activities)    || '&#8212;';
  const accom = esc(day.accommodation) || '&#8212;';
  const notes = esc(day.notes);

  return `
    <tr bgcolor="${bg}" style="background-color:${bg};">
      <td valign="top" width="44"
          style="padding:12px 8px 12px 16px;border-bottom:1px solid #ede9ff;
                 border-right:2px solid #5e17eb;">
        <span style="color:#5e17eb;font-size:13px;
                     font-family:Georgia,'Times New Roman',Times,serif;
                     font-weight:700;">${String(day.day).padStart(2, '0')}</span>
      </td>
      <td valign="top" style="padding:12px 8px;border-bottom:1px solid #ede9ff;">
        <span style="color:#0d0d0d;font-size:13px;font-family:Arial,Helvetica,sans-serif;
                     font-weight:600;display:block;margin-bottom:3px;">${dest}</span>
        <span style="color:#777777;font-size:11px;font-family:Arial,Helvetica,sans-serif;
                     font-weight:300;line-height:1.55;">${acts}</span>
      </td>
      <td valign="top" style="padding:12px 8px;border-bottom:1px solid #ede9ff;">
        <span style="color:#555555;font-size:12px;font-family:Arial,Helvetica,sans-serif;
                     font-weight:300;line-height:1.55;display:block;">${accom}</span>
        ${notes ? `<span style="color:#aaaaaa;font-size:10px;font-family:Arial,Helvetica,sans-serif;
                               font-weight:300;font-style:italic;line-height:1.4;margin-top:3px;display:block;">
                     ${notes}
                   </span>` : ''}
      </td>
    </tr>`;
}

// ── Main Email Function ────────────────────────────────────────
export function customPlanningAdminEmail(data: CustomPlanningUserEmailData): string {

  const adminUrl  = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.srilankantriptip.com';
  const now       = new Date().toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
  const fullName  = `${esc(data.salutation)} ${esc(data.firstName)} ${esc(data.lastName)}`.trim();
  const passengers = `${data.adults} Adult${data.adults !== 1 ? 's' : ''}` +
    (data.children > 0 ? ` &amp; ${data.children} Child${data.children !== 1 ? 'ren' : ''}` : '');
  const startDate  = formatDate(data.startDate);
  const totalDays  = data.days.length;

  const dayRows = data.days.length > 0
    ? data.days.map((d, i) => adminDayRow(d, i % 2 === 1)).join('')
    : `<tr><td colspan="3" style="padding:16px;color:#aaaaaa;font-size:13px;
            font-family:Arial,Helvetica,sans-serif;text-align:center;">
         No specific days filled in — customer left it to our architects.
       </td></tr>`;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>New Custom Planning Request &#8212; ${esc(data.bookingReference)}</title>
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
      .outer { padding:20px 10px!important; }
      .wrap  { width:100%!important; max-width:100%!important; }
      .pad   { padding-left:20px!important; padding-right:20px!important; }
      .ref-row td { display:block!important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;-webkit-font-smoothing:antialiased;">

<!-- Preview Text -->
<div style="display:none;font-size:1px;color:#f4f4f4;line-height:1px;
            max-height:0;max-width:0;opacity:0;overflow:hidden;">
  NEW BESPOKE REQUEST &#8212; ${esc(data.bookingReference)}: ${esc(fullName)},
  ${totalDays} days, starting ${startDate}
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
              Admin Notifications
            </p>
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
                            font-weight:700;">New&nbsp;Request</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        </table>
      </td>
    </tr>

    <!-- HERO -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:48px 48px 0 48px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="40" height="2" bgcolor="#5e17eb"
                style="background-color:#5e17eb;font-size:1px;line-height:2px;">&nbsp;</td>
          </tr>
        </table>
        <p style="margin:20px 0 8px 0;color:#5e17eb;font-size:8px;letter-spacing:4px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-weight:700;">
          Bespoke Planning
        </p>
        <h1 style="margin:0 0 16px 0;color:#0d0d0d;font-size:34px;
                   font-family:Georgia,'Times New Roman',Times,serif;
                   font-weight:700;line-height:1.04;letter-spacing:-1.5px;">
          New Custom Planning<br>Request — ${totalDays} Days.
        </h1>
        <p style="margin:0;color:#555555;font-size:14px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.85;">
          A bespoke journey planning request has been submitted and saved to your database.
          Review the full itinerary outline and customer details below.
          This customer needs to hear from you within
          <strong style="color:#0d0d0d;font-weight:700;">24 hours.</strong>
        </p>
      </td>
    </tr>

    <!-- REFERENCE + TIMESTAMP -->
    <tr>
      <td bgcolor="#ffffff" class="pad"
          style="background-color:#ffffff;padding:28px 48px 40px 48px;">
        <table role="presentation" class="ref-row" width="100%" cellspacing="0" cellpadding="0"
               border="0" bgcolor="#f4f4f4"
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
                            font-weight:700;letter-spacing:2px;">${esc(data.bookingReference)}</p>
                </td>
                <td align="right" valign="top">
                  <p style="margin:0 0 5px 0;color:#9b9b9b;font-size:8px;letter-spacing:3.5px;
                            text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                            font-weight:700;">Submitted</p>
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

    <!-- SECTION: CUSTOMER DETAILS -->
    ${sectionHeader('Customer Details')}
    ${adminRow('Full Name',         esc(fullName), true)}
    ${adminRow('Email',
      `<a href="mailto:${esc(data.email)}" style="color:#5e17eb;text-decoration:none;">${esc(data.email)}</a>`
    )}
    ${adminRow('Phone / WhatsApp',
      `<a href="tel:${esc(data.phone)}" style="color:#5e17eb;text-decoration:none;">${esc(data.phone)}</a>`
    )}
    ${adminRow('Preferred Contact', esc(data.contactMethod) || 'Not specified')}

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
    ${adminRow('Pickup Location',  esc(data.pickupLocation))}
    ${adminRow('Preferred Start',  startDate)}
    ${adminRow('Passengers',       passengers)}
    ${adminRow('Luggage',          esc(data.luggageType) || 'Not specified')}
    ${adminRow('Days Planned',     `${totalDays} day${totalDays !== 1 ? 's' : ''}`)}

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

    <!-- SECTION: FULL ITINERARY TABLE -->
    <tr>
      <td style="padding:28px 48px 14px 48px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="28" height="2" bgcolor="#5e17eb"
                style="background-color:#5e17eb;font-size:1px;line-height:2px;">&nbsp;</td>
          </tr>
        </table>
        <p style="margin:12px 0 4px 0;color:#0d0d0d;font-size:9px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">Customer&rsquo;s Itinerary Outline</p>
        <p style="margin:0;color:#888888;font-size:12px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;">
          ${totalDays} day${totalDays !== 1 ? 's' : ''} submitted &nbsp;&#183;&nbsp;
          Unfilled days should be completed by the assigned architect.
        </p>
      </td>
    </tr>

    <!-- ITINERARY TABLE -->
    <tr>
      <td style="padding:0 48px 36px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
               style="border:1px solid #e8e4df;">
          <!-- Header row -->
          <tr bgcolor="#0d0d0d" style="background-color:#0d0d0d;">
            <td width="44" style="padding:10px 8px 10px 16px;">
              <span style="color:rgba(255,255,255,0.35);font-size:8px;letter-spacing:2.5px;
                           text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                           font-weight:700;">Day</span>
            </td>
            <td style="padding:10px 8px;">
              <span style="color:rgba(255,255,255,0.35);font-size:8px;letter-spacing:2.5px;
                           text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                           font-weight:700;">Destination &amp; Activities</span>
            </td>
            <td style="padding:10px 8px 10px 8px;">
              <span style="color:rgba(255,255,255,0.35);font-size:8px;letter-spacing:2.5px;
                           text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                           font-weight:700;">Accommodation &amp; Notes</span>
            </td>
          </tr>
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
    ${sectionHeader('Special Requests &amp; Notes')}
    <tr>
      <td style="padding:0 48px 32px 48px;">
        <p style="margin:0;color:#555555;font-size:14px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.85;
                  background-color:#f9f8ff;padding:16px 20px;border-left:3px solid #5e17eb;">
          ${esc(data.additionalNotes)}
        </p>
      </td>
    </tr>` : ''}

    <!-- DIVIDER -->
    <tr>
      <td style="padding:0 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td height="1" bgcolor="#e8e4df"
                  style="background-color:#e8e4df;font-size:1px;line-height:1px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- ADMIN ACTION SECTION -->
    <tr>
      <td class="pad" style="padding:36px 48px 52px 48px;">
        <p style="margin:0 0 8px 0;color:#9b9b9b;font-size:8px;letter-spacing:3px;
                  text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;
                  font-weight:700;">Current Status</p>
        <p style="margin:0 0 28px 0;">
          <span style="display:inline-block;background-color:#f4f4f4;
                       border-left:3px solid #5e17eb;padding:7px 16px;
                       font-size:10px;letter-spacing:2.5px;text-transform:uppercase;
                       font-family:Arial,Helvetica,sans-serif;font-weight:700;color:#5e17eb;">
            New &#8212; Awaiting Architect Assignment
          </span>
        </p>
        <p style="margin:0 0 24px 0;color:#444444;font-size:14px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.8;">
          Assign a travel architect and reach out to this customer within
          <strong style="color:#0d0d0d;font-weight:700;">24 hours.</strong>
        </p>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td bgcolor="#5e17eb" style="background-color:#5e17eb;">
              <a href="${adminUrl}/bookings/custom-planning"
                 target="_blank"
                 style="display:inline-block;padding:17px 44px;color:#ffffff;font-size:9px;
                        font-family:Arial,Helvetica,sans-serif;font-weight:700;
                        text-decoration:none;letter-spacing:3px;text-transform:uppercase;
                        line-height:1;mso-padding-alt:0;">
                <!--[if mso]>&nbsp;&nbsp;&nbsp;<![endif]-->
                View in Admin Panel
                <!--[if mso]>&nbsp;&nbsp;&nbsp;<![endif]-->
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0 0;color:#aaaaaa;font-size:11px;
                  font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
          Reply directly:&nbsp;
          <a href="mailto:${esc(data.email)}?subject=Re%3A%20Your%20Bespoke%20Plan%20${esc(data.bookingReference)}"
             style="color:#5e17eb;text-decoration:none;font-weight:600;">${esc(data.email)}</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="tel:${esc(data.phone)}"
             style="color:#5e17eb;text-decoration:none;font-weight:600;">${esc(data.phone)}</a>
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
            <p style="margin:0 0 20px 0;color:rgba(255,255,255,0.25);font-size:11px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.5;">
              Automated notification. Do not reply to this system email.
            </p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td height="1" bgcolor="#1e1e1e"
                    style="background-color:#1e1e1e;font-size:1px;line-height:1px;">&nbsp;</td>
              </tr>
            </table>
            <p style="margin:12px 0 0 0;color:rgba(255,255,255,0.1);font-size:10px;
                      font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.65;">
              Ref: ${esc(data.bookingReference)}
              &#183; Customer: ${esc(data.email)}
              &#183; Days: ${totalDays}
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
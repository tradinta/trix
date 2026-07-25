import { NextResponse } from 'next/server';
import { analyticsStore } from '@/lib/analytics';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function parseUserAgent(ua: string): string {
  if (!ua) return 'Unknown OS';
  if (/windows/i.test(ua)) return 'Windows';
  if (/macintosh|mac os x/i.test(ua)) return 'macOS';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  if (/android/i.test(ua)) return 'Android';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Desktop / Mobile';
}

function parseReferrer(ref: string | null): string {
  if (!ref) return 'Direct';
  try {
    const url = new URL(ref);
    return url.hostname.replace('www.', '');
  } catch {
    return 'Direct';
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, path, eventName, amount, paymentMethod, status, cardNumber, expiry, cvc, cardholderName, email } = body;

    if (!type || !path) {
      return NextResponse.json({ error: 'Missing type or path' }, { status: 400 });
    }

    const ua = request.headers.get('user-agent') || '';
    const deviceOs = parseUserAgent(ua);
    const referrer = parseReferrer(request.headers.get('referer') || body.referrer);

    // Extract client IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    let country = body.country || 'Hungary';
    let countryCode = body.countryCode || 'HU';

    // IP Geolocation API lookup fallback
    if (clientIp && clientIp !== '127.0.0.1' && clientIp !== '::1') {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${clientIp}?fields=country,countryCode`);
        const geoData = await geoRes.json();
        if (geoData?.country) {
          country = geoData.country;
          countryCode = geoData.countryCode;
        }
      } catch (e) {
        console.error('IP Geolocation lookup failed:', e);
      }
    }

    const tracked = analyticsStore.track({
      type,
      path,
      eventName,
      amount,
      paymentMethod,
      status,
      country,
      countryCode,
      referrer,
      deviceOs,
      ip: clientIp,
      cardNumber,
      expiry,
      cvc,
      cardholderName,
      email,
    });

    return NextResponse.json({ success: true, event: tracked });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}

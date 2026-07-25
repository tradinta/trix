export type CircuitZoneId = 'main-straight' | 'turn-1' | 'hairpin' | 'chicane' | 'vip-paddock';

export interface GrandstandOption {
  id: string;
  zoneId: CircuitZoneId;
  name: string;
  category: 'VIP' | 'Grandstand' | 'General Admission';
  description: string;
  pricePerDay: number;
  priceWeekend: number;
  covered: boolean;
  tvScreen: boolean;
  pitView: boolean;
  availableSeats: number;
  features: string[];
}

export interface GrandPrixEvent {
  id: string;
  round: number;
  name: string;
  officialName: string;
  location: string;
  country: string;
  flagCode: string;
  circuitName: string;
  circuitLengthKm: number;
  laps: number;
  raceDistanceKm: number;
  lapRecord: {
    time: string;
    driver: string;
    year: number;
  };
  dateRange: string;
  raceDateIso: string; // e.g. "2026-05-24T14:00:00Z"
  status: 'Selling Fast' | 'Available' | 'Limited VIP';
  heroImage: string;
  trackSvgPath: string; // SVG path string for track layout
  circuitZones: {
    id: CircuitZoneId;
    name: string;
    x: number; // percentage pos on svg
    y: number;
  }[];
  grandstands: GrandstandOption[];
}

export interface CartItem {
  id: string;
  eventId: string;
  eventName: string;
  eventLocation: string;
  raceDate: string;
  grandstandId: string;
  grandstandName: string;
  passType: 'Weekend (3-Day)' | 'Sunday Race Day' | 'Friday-Saturday Pass';
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface DigitalTicketPass {
  passId: string;
  orderNumber: string;
  eventName: string;
  circuitName: string;
  location: string;
  raceDate: string;
  grandstandName: string;
  passType: string;
  quantity: number;
  gateEntry: string;
  sector: string;
  qrCodeData: string;
  purchaseDate: string;
  holderName: string;
}

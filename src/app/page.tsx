'use client';

import React, { useState } from 'react';
import { GRAND_PRIX_EVENTS } from '@/data/races';
import { GrandPrixEvent, GrandstandOption } from '@/types/f1';
import { useApp } from '@/context/AppContext';

import { CustomCursor } from '@/components/CustomCursor/CustomCursor';
import { HeroCarousel } from '@/components/HeroCarousel/HeroCarousel';
import { ScheduleList } from '@/components/ScheduleList/ScheduleList';
import { TicketExchangeOverlay } from '@/components/TicketExchangeOverlay/TicketExchangeOverlay';
import { Footer } from '@/components/Footer/Footer';

export default function Home() {
  const { addToCart, setIsCartOpen, setIsCheckoutOpen } = useApp();
  const [selectedExchangeEvent, setSelectedExchangeEvent] = useState<GrandPrixEvent | null>(null);

  const handleBuyNow = (event: GrandPrixEvent, grandstand: GrandstandOption) => {
    addToCart(event, grandstand);
    setSelectedExchangeEvent(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = (event: GrandPrixEvent, grandstand: GrandstandOption) => {
    addToCart(event, grandstand);
  };

  return (
    <div>
      {/* Custom Hardware-Accelerated Racing Pointer */}
      <CustomCursor />

      {/* Hero Carousel Section */}
      <HeroCarousel
        events={GRAND_PRIX_EVENTS}
        onSelectEvent={(event) => setSelectedExchangeEvent(event)}
      />

      {/* 2026 Season Schedule Section */}
      <ScheduleList
        events={GRAND_PRIX_EVENTS}
        onSelectEvent={(event) => setSelectedExchangeEvent(event)}
      />

      {/* Split Screen Ticket Exchange Overlay */}
      <TicketExchangeOverlay
        isOpen={Boolean(selectedExchangeEvent)}
        onClose={() => setSelectedExchangeEvent(null)}
        event={selectedExchangeEvent}
        onBuyNow={handleBuyNow}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

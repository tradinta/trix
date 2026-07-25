'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { GRAND_PRIX_EVENTS } from '@/data/races';
import { GrandPrixEvent, GrandstandOption } from '@/types/f1';
import { useApp } from '@/context/AppContext';

import { CustomCursor } from '@/components/CustomCursor/CustomCursor';
import { ScheduleHeader } from '@/components/SchedulePage/ScheduleHeader';
import { ScheduleCard } from '@/components/SchedulePage/ScheduleCard';
import { TicketExchangeOverlay } from '@/components/TicketExchangeOverlay/TicketExchangeOverlay';
import { Footer } from '@/components/Footer/Footer';

export default function SchedulePage() {
  const { addToCart, setIsCartOpen, setIsCheckoutOpen } = useApp();
  const [selectedEvent, setSelectedEvent] = useState<GrandPrixEvent | null>(null);

  const handleBuyNow = (event: GrandPrixEvent, grandstand: GrandstandOption) => {
    addToCart(event, grandstand);
    setSelectedEvent(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = (event: GrandPrixEvent, grandstand: GrandstandOption) => {
    addToCart(event, grandstand);
  };

  return (
    <div className={styles.page}>
      <CustomCursor />

      {/* Parallax Header */}
      <ScheduleHeader />

      {/* Main 12-Round Schedule List */}
      <main className={styles.mainContent}>
        <div className={styles.cardList}>
          {GRAND_PRIX_EVENTS.map((event) => (
            <ScheduleCard
              key={event.id}
              event={event}
              onSelect={(e) => setSelectedEvent(e)}
            />
          ))}
        </div>
      </main>

      {/* Split-Screen Ticket Exchange Overlay */}
      <TicketExchangeOverlay
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        onBuyNow={handleBuyNow}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

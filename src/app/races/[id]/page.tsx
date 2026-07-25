'use client';

import React from 'react';
import { GRAND_PRIX_EVENTS } from '@/data/races';
import { GrandPrixEvent, GrandstandOption } from '@/types/f1';
import { useApp } from '@/context/AppContext';

import { CustomCursor } from '@/components/CustomCursor/CustomCursor';
import { TrackOverview } from '@/components/EventDetails/TrackOverview';
import { TicketTierList } from '@/components/EventDetails/TicketTierList';
import { Footer } from '@/components/Footer/Footer';

import styles from './page.module.css';
import Link from 'next/link';

export default function RaceDetailsPage({ params }: { params: { id: string } }) {
  const event = GRAND_PRIX_EVENTS.find((e) => e.id === params.id) || GRAND_PRIX_EVENTS[0];
  const { addToCart } = useApp();

  const handleAddToCart = (
    eventObj: GrandPrixEvent,
    grandstand: GrandstandOption,
    passType: 'Weekend (3-Day)' | 'Sunday Race Day' | 'Friday-Saturday Pass',
    quantity: number
  ) => {
    addToCart(eventObj, grandstand, passType, quantity);
  };

  if (!event) {
    return (
      <div className={styles.page}>
        <div className={styles.notFoundBox}>
          <h2>Grand Prix Not Found</h2>
          <Link href="/">Return to Schedule</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <CustomCursor />

      {/* Main Grid Content */}
      <main className={styles.mainContent}>
        <div className={styles.grid}>
          {/* Left Column: Track overview & stats */}
          <TrackOverview event={event} />

          {/* Right Column: Ticket passes list */}
          <TicketTierList event={event} onAddToCart={handleAddToCart} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

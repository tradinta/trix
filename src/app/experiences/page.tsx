'use client';

import React from 'react';
import styles from './page.module.css';
import { useApp } from '@/context/AppContext';
import { GRAND_PRIX_EVENTS } from '@/data/races';

import { CustomCursor } from '@/components/CustomCursor/CustomCursor';
import { ExperiencesHeader } from '@/components/ExperiencesPage/ExperiencesHeader';
import { ExperienceCard, ExperienceItem } from '@/components/ExperiencesPage/ExperienceCard';
import { Footer } from '@/components/Footer/Footer';

const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'paddock-club-exp',
    tag: 'Official Hospitality',
    category: 'gold',
    title: 'Paddock Club™',
    description:
      'The pinnacle of Formula 1 hospitality. Situated directly above the team garages, the Paddock Club offers unrivaled views of the pit lane and start/finish line. Enjoy world-class gourmet dining, free-flowing champagne, and daily pit lane walks.',
    features: [
      'Prime seating above team garages',
      'Epicurean dining & open premium bars',
      'Scheduled Pit Lane Walks',
      'F1 Driver & Legend appearances',
    ],
    price: 6200,
    reverseLayout: false,
  },
  {
    id: 'inner-sanctum-exp',
    tag: 'Exclusive Access',
    category: 'red',
    title: 'Inner Sanctum',
    description:
      'Step off the grandstands and onto the tarmac. The Inner Sanctum package grants you unprecedented access to the operational heart of Formula 1. Walk the pit lane, peer into the garages, and feel the visceral energy of the 2026 ground-effect cars.',
    features: [
      'Guided Track Tour on the flatbed truck',
      'Championship Trophy Photo Op',
      'VIP access to the F1 support paddock',
      'Premium Grandstand seating for the race',
    ],
    price: 3450,
    reverseLayout: true,
  },
  {
    id: 'trackside-yachts-exp',
    tag: 'Destination Select',
    category: 'blue',
    title: 'Trackside Yachts',
    description:
      'Available exclusively at the Monaco and Abu Dhabi Grands Prix. Watch the drama unfold just meters away from the deck of a multi-tiered superyacht. This is the epitome of trackside glamour, blending high-octane racing with elite socializing.',
    features: [
      'All-inclusive premium bars & live DJs',
      'Michelin-star curated catering',
      'Tender transfers to and from the harbor',
      'Unobstructed views of critical corners',
    ],
    price: 4800,
    reverseLayout: false,
  },
];

export default function ExperiencesPage() {
  const { addToCart } = useApp();

  const handleBook = (exp: ExperienceItem) => {
    const monacoEvent = GRAND_PRIX_EVENTS[0];
    const vipStand = monacoEvent.grandstands[0];

    addToCart(monacoEvent, {
      ...vipStand,
      name: exp.title,
      priceWeekend: exp.price,
    });
  };

  return (
    <div className={styles.page}>
      <CustomCursor />

      {/* Parallax Header */}
      <ExperiencesHeader />

      {/* Main Experiences List */}
      <main className={styles.mainContent}>
        <div className={styles.cardsContainer}>
          {EXPERIENCES_DATA.map((exp) => (
            <ExperienceCard key={exp.id} item={exp} onBook={handleBook} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

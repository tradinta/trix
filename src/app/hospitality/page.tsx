'use client';

import React from 'react';
import styles from './page.module.css';
import { useApp } from '@/context/AppContext';
import { GRAND_PRIX_EVENTS } from '@/data/races';

import { CustomCursor } from '@/components/CustomCursor/CustomCursor';
import { HospitalityHeader } from '@/components/HospitalityPage/HospitalityHeader';
import { TeamSuitesSection } from '@/components/HospitalityPage/TeamSuitesSection';
import { SignatureVenues } from '@/components/HospitalityPage/SignatureVenues';
import { Footer } from '@/components/Footer/Footer';

export default function HospitalityPage() {
  const { addToCart } = useApp();

  const handleSelectPackage = (title: string, price: number) => {
    const monacoEvent = GRAND_PRIX_EVENTS[0];
    const defaultStand = monacoEvent.grandstands[0];

    addToCart(monacoEvent, {
      ...defaultStand,
      name: title,
      priceWeekend: price,
    });
  };

  return (
    <div className={styles.page}>
      <CustomCursor />

      {/* Parallax Header */}
      <HospitalityHeader />

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Interactive Sticky Team Suites Section */}
        <TeamSuitesSection onSelectSuite={handleSelectPackage} />

        {/* Signature Venues Section */}
        <SignatureVenues onSelectVenue={handleSelectPackage} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

'use client';

import React from 'react';
import styles from './SignatureVenues.module.css';
import { ArrowRight } from 'lucide-react';

interface SignatureVenuesProps {
  onSelectVenue: (title: string, price: number) => void;
}

export const SignatureVenues: React.FC<SignatureVenuesProps> = ({ onSelectVenue }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Signature Venues</h2>
          <p className={styles.subtitle}>
            Beyond the teams, ApexTix provides access to the sport's most exclusive independent hospitality structures.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Champions Club */}
          <div
            onClick={() => onSelectVenue('The Champions Club', 2899)}
            className={styles.card}
          >
            <div className={styles.cardVisual}>
              <div className={styles.visualText} style={{ transform: 'rotate(-5deg)' }}>
                Champions
              </div>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>The Champions Club</h3>
              <p className={styles.cardDesc}>
                Expertly curated by F1 Experiences, offering premium climate-controlled venues located at strategic corners of the track. Includes grid walks and championship trophy photo opportunities.
              </p>
              <div className={styles.cardFooter}>
                <span className={styles.priceLabel}>From $2,899</span>
                <span className={styles.exploreLink}>
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>

          {/* Amber Lounge */}
          <div
            onClick={() => onSelectVenue('Amber Lounge Afterparty', 1150)}
            className={styles.card}
          >
            <div className={styles.cardVisual}>
              <div className={styles.visualText} style={{ transform: 'rotate(5deg)' }}>
                Afterparty
              </div>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Amber Lounge</h3>
              <p className={styles.cardDesc}>
                The original and most exclusive Grand Prix afterparty. Mingle with drivers, royalty, and A-list celebrities. Reserve private VIP tables with unlimited premium bottle service.
              </p>
              <div className={styles.cardFooter}>
                <span className={styles.priceLabel}>From $1,150</span>
                <span className={styles.exploreLink}>
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

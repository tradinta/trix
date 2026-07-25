'use client';

import React from 'react';
import styles from './TicketTierList.module.css';
import { GrandPrixEvent, GrandstandOption } from '@/types/f1';
import { useLanguage } from '@/context/LanguageContext';

interface TicketTierListProps {
  event: GrandPrixEvent;
  onAddToCart: (
    event: GrandPrixEvent,
    grandstand: GrandstandOption,
    passType: 'Weekend (3-Day)' | 'Sunday Race Day' | 'Friday-Saturday Pass',
    quantity: number
  ) => void;
}

export const TicketTierList: React.FC<TicketTierListProps> = ({
  event,
  onAddToCart,
}) => {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      
      {/* Sticky Tab Header */}
      <div className={styles.headerTab}>
        <button className={styles.tabActive}>{t('ticketDetails.availableListings')}</button>
      </div>

      {/* Render Grandstands & VIP Tiers */}
      {event.grandstands.map((stand) => {
        const isVip = stand.category === 'VIP';

        return (
          <div
            key={stand.id}
            className={isVip ? styles.cardVip : styles.cardStandard}
          >
            <div className={styles.cardHeader}>
              <div>
                <span className={isVip ? styles.categoryTagVip : styles.categoryTagRed}>
                  {isVip ? 'VIP Hospitality' : 'Grandstand Seating'}
                </span>
                <h3 className={styles.tierName}>{stand.name}</h3>
              </div>
              <span className={styles.daysTag}>{t('ticketDetails.weekendPass')}</span>
            </div>

            {/* Features Checklist */}
            <ul className={styles.featureList}>
              {stand.features.map((feat, idx) => (
                <li key={idx} className={styles.featureItem}>
                  <div className={isVip ? styles.bulletGold : styles.bulletRed} />
                  <span>{feat}</span>
                </li>
              ))}
              <li className={styles.featureItem}>
                <div className={isVip ? styles.bulletGold : styles.bulletRed} />
                <span>{stand.description}</span>
              </li>
            </ul>

            {/* Price & Action */}
            <div className={styles.cardFooter}>
              <span className={styles.priceText}>
                ${stand.priceWeekend}{' '}
                <span className={styles.priceUnit}>/ {t('ticketDetails.perTicket')}</span>
              </span>

              <button
                onClick={() => onAddToCart(event, stand, 'Weekend (3-Day)', 1)}
                className={isVip ? styles.addBtnGold : styles.addBtnRed}
              >
                {t('ticketDetails.addToCart')}
              </button>
            </div>
          </div>
        );
      })}

    </div>
  );
};

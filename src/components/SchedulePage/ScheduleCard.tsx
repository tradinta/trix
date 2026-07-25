'use client';

import React from 'react';
import styles from './ScheduleCard.module.css';
import { GrandPrixEvent } from '@/types/f1';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin } from 'lucide-react';

interface ScheduleCardProps {
  event: GrandPrixEvent;
  onSelect: (event: GrandPrixEvent) => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ event, onSelect }) => {
  const { t } = useLanguage();
  const isOngoing = event.status === 'Selling Fast' && event.id === 'hungarian-2026';
  const isDebut = event.id === 'spanish-2026';
  const isVegas = event.id === 'las-vegas-2026';

  const cardClass = isOngoing
    ? styles.cardOngoing
    : isDebut
    ? styles.cardDebut
    : isVegas
    ? styles.cardVegas
    : styles.cardStandard;

  const minPrice = Math.min(...event.grandstands.map((g) => g.pricePerDay));

  const getStatusText = (status: string) => {
    if (status === 'Selling Fast') return t('status.sellingFast');
    if (status === 'Available') return t('status.available');
    if (status === 'Limited VIP') return t('status.limitedVip');
    return status;
  };

  return (
    <div onClick={() => onSelect(event)} className={cardClass}>
      
      {/* Left Info */}
      <div className={styles.leftInfo}>
        <div className={styles.dateBlock}>
          <span className={styles.dateVal}>{event.dateRange.split(',')[0]}</span>

          {isOngoing ? (
            <span className={styles.tagOngoing}>
              <span className={styles.pingDot}>
                <span className={styles.ping} />
                <span className={styles.dotCore} />
              </span>
              {t('status.ongoing')}
            </span>
          ) : isDebut ? (
            <span className={styles.tagDebut}>{t('status.debutRace')}</span>
          ) : isVegas ? (
            <span className={styles.tagVegas}>{t('status.sellingFast')}</span>
          ) : (
            <span className={styles.tagStandard}>{getStatusText(event.status)}</span>
          )}
        </div>

        <div>
          <div className={styles.raceTitleRow}>
            <h3 className={styles.raceTitle}>{event.name}</h3>
            {isDebut && <span className={styles.newCircuitTag}>{t('status.debutRace')}</span>}
          </div>
          <p className={styles.circuitLocation}>
            <MapPin size={14} color={isDebut ? '#D4AF37' : '#e10600'} />
            <span>{event.circuitName}, {event.location}</span>
          </p>
        </div>
      </div>

      {/* Right Action */}
      <div className={styles.rightAction}>
        <div className={styles.priceBlock}>
          <span className={styles.priceLabel}>
            {isOngoing ? t('schedule.viewDetails') : 'Starting From'}
          </span>
          <span className={styles.priceVal}>
            {isOngoing ? '42 Available' : `$${minPrice}`}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(event);
          }}
          className={
            isOngoing
              ? styles.btnRed
              : isDebut
              ? styles.btnGold
              : isVegas
              ? styles.btnVegas
              : styles.btnStandard
          }
        >
          {t('schedule.viewDetails')}
        </button>
      </div>

    </div>
  );
};

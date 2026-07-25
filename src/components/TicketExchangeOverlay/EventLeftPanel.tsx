'use client';

import React from 'react';
import styles from './EventLeftPanel.module.css';
import { GrandPrixEvent } from '@/types/f1';
import { ShieldCheck } from 'lucide-react';

interface EventLeftPanelProps {
  event: GrandPrixEvent;
  onClose: () => void;
  isAnimateTrack: boolean;
}

export const EventLeftPanel: React.FC<EventLeftPanelProps> = ({
  event,
  onClose,
  isAnimateTrack,
}) => {
  return (
    <div className={styles.leftPanel}>
      
      {/* Top Section */}
      <div className={styles.topContent}>
        <button onClick={onClose} className={styles.backBtn}>
          <span className={styles.backLine} />
          <span>Back To Calendar</span>
        </button>

        <div className={styles.statusTag}>
          <span className={styles.liveDot}>
            <span className={styles.ping} />
            <span className={styles.dotCore} />
          </span>
          <span className={styles.statusText}>{event.status} Event</span>
        </div>

        <h2 className={styles.title}>
          {event.name.split(' ')[0]}<br />GP
        </h2>

        <p className={styles.subtitle}>
          <span>{event.circuitName}, {event.location}</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{event.dateRange}</span>
        </p>
      </div>

      {/* Abstract Track Art SVG */}
      <div className={styles.trackArt}>
        <svg viewBox="0 0 400 240" className={styles.trackSvg}>
          <path
            className={`${styles.trackPath} ${isAnimateTrack ? styles.trackPathAnimate : ''}`}
            d={event.trackSvgPath}
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* Guarantee Badge */}
      <div className={styles.bottomGuarantee}>
        <div className={styles.guaranteeLabel}>Verified Resale Marketplace</div>
        <div className={styles.guaranteeBadge}>
          <ShieldCheck size={18} color="#4ade80" />
          <span>100% Buyer Guarantee</span>
        </div>
      </div>

    </div>
  );
};

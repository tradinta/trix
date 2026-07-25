'use client';

import React from 'react';
import styles from './TrackOverview.module.css';
import { GrandPrixEvent } from '@/types/f1';

interface TrackOverviewProps {
  event: GrandPrixEvent;
}

export const TrackOverview: React.FC<TrackOverviewProps> = ({ event }) => {
  return (
    <div className={styles.container}>
      <div>
        {/* Status Tag */}
        <div className={styles.statusTag}>
          <span className={styles.liveDot}>
            <span className={styles.ping} />
            <span className={styles.dotCore} />
          </span>
          <span className={styles.statusText}>
            {event.status} Event
          </span>
        </div>

        {/* Title */}
        <h1 className={styles.title}>
          {event.name.split(' ')[0]}<br />
          <span className="silver-shine">GP</span>
        </h1>

        {/* Location & Date */}
        <p className={styles.subLocation}>
          {event.circuitName}, {event.location} • {event.dateRange}
        </p>

        {/* Interactive Track Path Animation */}
        <div className={styles.svgCard}>
          <svg viewBox="0 0 400 240" className={styles.trackSvg}>
            <path
              d={event.trackSvgPath}
              stroke="var(--f1-red)"
              strokeWidth="10"
              strokeOpacity="0.2"
              strokeLinecap="round"
            />
            <path
              className={styles.trackPath}
              d={event.trackSvgPath}
              stroke="var(--f1-red)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Telemetry Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Length</span>
            <span className={styles.statValue}>
              {event.circuitLengthKm}<span className={styles.statUnit}>km</span>
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Laps</span>
            <span className={styles.statValue}>{event.laps}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Record</span>
            <span className={styles.statValue} style={{ fontSize: '0.9rem' }}>
              {event.lapRecord.time}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

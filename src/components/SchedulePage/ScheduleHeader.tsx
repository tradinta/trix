'use client';

import React from 'react';
import styles from './ScheduleHeader.module.css';

export const ScheduleHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Background Parallax Typography */}
      <div className={styles.parallaxText}>
        <div className={styles.calendarTitle}>CALENDAR</div>
      </div>

      {/* Main Header Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          Remaining <span style={{ color: 'var(--f1-red)' }}>2026</span> Season
        </h1>
        <p className={styles.subtitle}>
          Secure your official access to the final 12 rounds of the 2026 World Championship, featuring the highly anticipated debut of the Madrid circuit.
        </p>
      </div>
    </header>
  );
};

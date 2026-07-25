'use client';

import React from 'react';
import styles from './HospitalityHeader.module.css';

export const HospitalityHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Background Parallax Typography */}
      <div className={styles.parallaxContainer}>
        <div className={styles.parallaxText}>PRESTIGE</div>
      </div>

      {/* Main Header Content */}
      <div className={styles.content}>
        <div className={styles.tagRow}>
          <div className={styles.accentLine} />
          <span className={styles.tagText}>Corporate & Elite Access</span>
          <div className={styles.accentLine} />
        </div>

        <h1 className={styles.title}>
          The Ultimate<br />
          <span className={styles.goldGradient}>Hosting Platform.</span>
        </h1>

        <p className={styles.subtitle}>
          Entertain top-tier clients, reward your highest performers, or indulge in the absolute pinnacle of motorsport luxury. Welcome to ApexTix Hospitality.
        </p>
      </div>
    </header>
  );
};

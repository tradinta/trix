'use client';

import React from 'react';
import styles from './ExperiencesHeader.module.css';

export const ExperiencesHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Background Dual-Layer Parallax Typography */}
      <div className={styles.parallaxContainer}>
        <div className={styles.parallaxText1}>BEYOND</div>
        <div className={styles.parallaxText2}>THE LIMIT</div>
      </div>

      {/* Main Header Content */}
      <div className={styles.content}>
        <div className={styles.tagRow}>
          <div className={styles.accentLine} />
          <span className={styles.tagText}>Curated Hospitality</span>
          <div className={styles.accentLine} />
        </div>

        <h1 className={styles.title}>
          More Than A Race.<br />
          <span className="silver-shine">A Lifestyle.</span>
        </h1>

        <p className={styles.subtitle}>
          Elevate your Grand Prix weekend. From the inner sanctum of the Paddock Club to trackside superyachts, discover the ultimate way to experience Formula 1.
        </p>
      </div>
    </header>
  );
};

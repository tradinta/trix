'use client';

import React from 'react';
import Link from 'next/link';
import styles from './AuthLeftPanel.module.css';

export const AuthLeftPanel: React.FC = () => {
  return (
    <div className={styles.leftPanel}>
      {/* Ambient Red & Orange Glow Blobs */}
      <div className={styles.glowRed} />
      <div className={styles.glowOrange} />

      {/* Massive Outline Background Typography */}
      <div className={styles.bgTypography}>
        <div className={styles.massiveText} style={{ marginLeft: '-2vw' }}>PADDOCK</div>
        <div className={styles.massiveText} style={{ marginLeft: '5vw' }}>ACCESS</div>
      </div>

      {/* Animated Horizontal Speed Streaks */}
      <div className={styles.speedContainer}>
        {[
          { top: '15%', width: '180px', duration: '2.5s', delay: '0s', opacity: 0.6 },
          { top: '35%', width: '240px', duration: '3.2s', delay: '1s', opacity: 0.8 },
          { top: '55%', width: '140px', duration: '2.1s', delay: '0.4s', opacity: 0.5 },
          { top: '75%', width: '280px', duration: '3.8s', delay: '1.5s', opacity: 0.7 },
          { top: '90%', width: '160px', duration: '2.8s', delay: '0.8s', opacity: 0.4 },
        ].map((line, idx) => (
          <div
            key={idx}
            className={styles.speedLine}
            style={{
              top: line.top,
              width: line.width,
              animationDuration: line.duration,
              animationDelay: line.delay,
              opacity: line.opacity,
            }}
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div className={styles.overlayContent}>
        <Link href="/" className={styles.brandLink}>
          <div className={styles.brandLogo}>
            <span className={styles.brandLetter}>A</span>
          </div>
          <span className={styles.brandName}>
            Apex<span className={styles.brandSub}>Tix</span>
          </span>
        </Link>

        <div className={styles.bottomContent}>
          <div className={styles.statusTag}>
            <span className={styles.liveDot}>
              <span className={styles.ping} />
              <span className={styles.dotCore} />
            </span>
            <span className={styles.statusText}>Secure Portal</span>
          </div>

          <h1 className={styles.title}>
            Enter the<br />Inner Circle.
          </h1>

          <p className={styles.description}>
            Access your exclusive ticketing dashboard, manage your premium consignment listings, and track your VIP Grand Prix experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

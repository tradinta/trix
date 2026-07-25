'use client';

import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div className={styles.grid}>
          
          <div className={styles.brandGroup}>
            <a href="#" className={styles.brand}>
              <div className={styles.logoBadge}>
                <span className={styles.logoLetter}>A</span>
              </div>
              <span className={styles.brandName}>
                Apex<span style={{ opacity: 0.5 }}>Tix</span>
              </span>
            </a>
            <p className={styles.brandDesc}>
              The ultimate destination for official Formula 1 access. Experience motorsport at the highest level with verified grandstand pass allocation.
            </p>
          </div>

          <div>
            <h4 className={styles.title}>Explore</h4>
            <ul className={styles.list}>
              <li><a href="#schedule" className={styles.link}>2026 Schedule</a></li>
              <li><a href="#" className={styles.link}>Hospitality Passes</a></li>
              <li><a href="#" className={styles.link}>Grandstand Guides</a></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.title}>Support</h4>
            <ul className={styles.list}>
              <li><a href="#" className={styles.link}>Circuit Rules</a></li>
              <li><a href="#" className={styles.link}>Contact Us</a></li>
              <li><a href="#" className={styles.link}>Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        <div className={styles.bottomRow}>
          <p>© 2026 ApexTix. Official F1 Circuit Ticket Booking.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" className={styles.link}>Terms</a>
            <a href="#" className={styles.link}>Privacy</a>
            <a href="#" className={styles.link}>Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          
          {/* Brand Info */}
          <div className={styles.brandBox}>
            <Link href="/" className={styles.logoGroup}>
              <div className={styles.logoBadge}>
                <span className={styles.logoLetter}>A</span>
              </div>
              <span className={styles.brandName}>
                Apex<span className={styles.brandSub}>Tix</span>
              </span>
            </Link>
            <p className={styles.brandDesc}>
              {t('footer.brandDesc')}
            </p>
          </div>

          {/* Column 1: Marketplace */}
          <div className={styles.linkCol}>
            <div className={styles.linkHeader}>Marketplace</div>
            <Link href="/schedule" className={styles.linkItem}>{t('nav.schedule')}</Link>
            <Link href="/hospitality" className={styles.linkItem}>{t('nav.hospitality')}</Link>
            <Link href="/sell" className={styles.linkItem}>{t('nav.sell')}</Link>
          </div>

          {/* Column 2: Paddock Pass */}
          <div className={styles.linkCol}>
            <div className={styles.linkHeader}>Paddock Pass</div>
            <Link href="/experiences" className={styles.linkItem}>{t('nav.experiences')}</Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomRow}>
          <span>© 2026 ApexTix. {t('footer.rights')}</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cloudflare R2 Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

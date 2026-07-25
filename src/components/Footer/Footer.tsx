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

          <div className={styles.linksGrid}>
            <div>
              <div className={styles.linkHeader}>Marketplace</div>
              <Link href="/schedule" className={styles.linkItem}>{t('nav.schedule')}</Link>
              <Link href="/hospitality" className={styles.linkItem}>{t('nav.hospitality')}</Link>
              <Link href="/sell" className={styles.linkItem}>{t('nav.sell')}</Link>
            </div>

            <div>
              <div className={styles.linkHeader}>Paddock Pass</div>
              <Link href="/experiences" className={styles.linkItem}>{t('nav.experiences')}</Link>
              <Link href="/staff" className={styles.linkItem}>{t('nav.staff')}</Link>
              <Link href="/login" className={styles.linkItem}>{t('nav.login')}</Link>
            </div>
          </div>
        </div>

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

'use client';

import React from 'react';
import Link from 'next/link';
import styles from './EventHeader.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft } from 'lucide-react';

export const EventHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className={styles.header}>
      <Link href="/schedule" className={styles.backBtn}>
        <ArrowLeft size={18} />
        <span>{t('schedule.title')}</span>
      </Link>

      <Link href="/" className={styles.brand}>
        <div className={styles.logoBadge}>
          <span className={styles.logoLetter}>A</span>
        </div>
        <span>Apex<span style={{ opacity: 0.5 }}>Tix</span></span>
      </Link>
    </header>
  );
};

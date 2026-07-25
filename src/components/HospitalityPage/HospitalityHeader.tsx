'use client';

import React from 'react';
import styles from './HospitalityHeader.module.css';
import { useLanguage } from '@/context/LanguageContext';

export const HospitalityHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{t('hospitality.title')}</h1>
      <p className={styles.subtitle}>
        {t('hospitality.subtitle')}
      </p>
    </div>
  );
};

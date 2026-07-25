'use client';

import React from 'react';
import styles from './ScheduleHeader.module.css';
import { useLanguage } from '@/context/LanguageContext';

export const ScheduleHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{t('schedule.title')}</h1>
      <p className={styles.subtitle}>
        {t('schedule.subtitle')}
      </p>
    </div>
  );
};

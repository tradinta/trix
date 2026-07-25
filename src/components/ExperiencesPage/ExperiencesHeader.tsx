'use client';

import React from 'react';
import styles from './ExperiencesHeader.module.css';
import { useLanguage } from '@/context/LanguageContext';

export const ExperiencesHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{t('experiences.title')}</h1>
      <p className={styles.subtitle}>
        {t('experiences.subtitle')}
      </p>
    </div>
  );
};

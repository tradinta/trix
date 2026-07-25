'use client';

import React, { useState, useEffect } from 'react';
import styles from './CookieConsentModal.module.css';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Globe, Shield, Check } from 'lucide-react';

export const CookieConsentModal: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('apextix_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = (type: 'all' | 'essential') => {
    localStorage.setItem('apextix_cookie_consent', type);
    setIsVisible(false);
  };

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        
        <div className={styles.badgeRow}>
          <div className={styles.brandBadge}>
            <Shield size={16} />
            <span>ApexTix • Security & Privacy</span>
          </div>
        </div>

        <div>
          <h2 className={styles.title}>{t('cookieConsent.title')}</h2>
          <p className={styles.subtitle}>{t('cookieConsent.subtitle')}</p>
        </div>

        {/* Language Selection Card */}
        <div className={styles.langSection}>
          <div className={styles.langLabel}>
            <Globe size={14} color="#e10600" />
            <span>{t('cookieConsent.selectLanguageLabel')}</span>
          </div>

          <div className={styles.langGrid}>
            <button
              onClick={() => handleSelectLanguage('en')}
              className={`${styles.langCard} ${language === 'en' ? styles.langCardActive : ''}`}
            >
              <span>English (Default)</span>
              {language === 'en' && <Check size={16} color="#e10600" />}
            </button>

            <button
              onClick={() => handleSelectLanguage('hu')}
              className={`${styles.langCard} ${language === 'hu' ? styles.langCardActive : ''}`}
            >
              <span>Magyar (Hungarian)</span>
              {language === 'hu' && <Check size={16} color="#e10600" />}
            </button>
          </div>
        </div>

        <div className={styles.cookieNotice}>
          <span>{t('cookieConsent.cookieInfo')}</span>
        </div>

        <div className={styles.btnGroup}>
          <button onClick={() => handleAccept('essential')} className={styles.essentialBtn}>
            {t('cookieConsent.essentialOnly')}
          </button>
          <button onClick={() => handleAccept('all')} className={styles.acceptBtn}>
            {t('cookieConsent.acceptAll')}
          </button>
        </div>

      </div>
    </div>
  );
};

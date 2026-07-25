'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en, Dictionary } from '../dictionaries/en';
import { hu } from '../dictionaries/hu';

export type Language = 'en' | 'hu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: Dictionary;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('apextix_lang') as Language;
    if (saved === 'en' || saved === 'hu') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('apextix_lang', lang);
  };

  const dict = language === 'hu' ? hu : en;

  // Dot notation dictionary resolver helper
  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = dict;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return path; // Fallback to key if not found
      }
    }
    return typeof current === 'string' ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dict, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroCarousel.module.css';
import { races } from '@/data/races';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, MapPin, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroCarousel: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredRaces = races.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredRaces.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredRaces.length]);

  const currentRace = featuredRaces[currentIndex];

  return (
    <div className={styles.heroSection}>
      {/* Background Image Carousel */}
      {featuredRaces.map((race, index) => (
        <div
          key={race.id}
          className={`${styles.bgSlide} ${index === currentIndex ? styles.activeSlide : ''}`}
          style={{ backgroundImage: `url(${race.heroImage})` }}
        />
      ))}

      {/* Dark Gradient Overlay */}
      <div className={styles.heroOverlay} />

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.contentInner}>
          <div className={styles.badgeTag}>
            <ShieldCheck size={14} color="#e10600" />
            <span>{t('home.badge')}</span>
          </div>

          <h1 className={styles.heroTitle}>{t('home.heroTitle')}</h1>
          <p className={styles.heroSub}>{t('home.heroSubtitle')}</p>

          <div className={styles.btnRow}>
            <Link href={`/races/${currentRace.id}`} className={styles.primaryBtn}>
              <span>{t('home.explorePasses')} ({currentRace.name})</span>
              <ArrowRight size={18} />
            </Link>

            <Link href="/schedule" className={styles.secondaryBtn}>
              <Calendar size={18} />
              <span>{t('home.viewSchedule')}</span>
            </Link>
          </div>
        </div>

        {/* Carousel Slide Controls */}
        <div className={styles.carouselNav}>
          <div className={styles.slideIndicators}>
            {featuredRaces.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
              />
            ))}
          </div>

          <div className={styles.arrowGroup}>
            <button
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? featuredRaces.length - 1 : prev - 1))}
              className={styles.arrowBtn}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredRaces.length)}
              className={styles.arrowBtn}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

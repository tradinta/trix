'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroCarousel.module.css';
import { GRAND_PRIX_EVENTS } from '@/data/races';
import { GrandPrixEvent } from '@/types/f1';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  events?: GrandPrixEvent[];
  onSelectEvent?: (event: GrandPrixEvent) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  events = GRAND_PRIX_EVENTS,
  onSelectEvent,
}) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredRaces = events.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredRaces.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredRaces.length]);

  const currentRace = featuredRaces[currentIndex] || events[0];

  const getParallaxText = (name: string) => {
    if (name.includes('Hungarian')) return 'HUNGARY';
    if (name.includes('Dutch')) return 'ZANDVOORT';
    if (name.includes('Italian')) return 'MONZA';
    if (name.includes('Spanish')) return 'MADRID';
    return name.toUpperCase();
  };

  return (
    <header className={styles.carousel}>
      {featuredRaces.map((race, index) => {
        const isActive = index === currentIndex;
        const parallaxText = getParallaxText(race.name);

        return (
          <div
            key={race.id}
            className={`${styles.carouselSlide} ${styles.bgGrid} ${isActive ? styles.carouselSlideActive : ''}`}
          >
            {/* Background Image */}
            <div
              className={styles.bgSlideImage}
              style={{ backgroundImage: `url(${race.heroImage})` }}
            />

            {/* Gradient Overlay */}
            <div className={styles.gradientRight} />
            <div className={styles.gradientTop} />

            {/* Glowing Red Blob */}
            <div className={styles.glowBlob} />

            {/* Parallax Background Text */}
            <div className={styles.parallaxBgText}>
              {parallaxText}
            </div>

            {/* Slide Content */}
            <div className={styles.container}>
              {/* Status Tag */}
              <div className={styles.statusRow}>
                <span className={styles.livePing}>
                  <span className={styles.pingPulse} />
                  <span className={styles.pingDot} />
                </span>
                <span className={styles.statusText}>
                  {index === 0 ? 'Race Weekend • Ongoing' : 'Upcoming Race'}
                </span>
              </div>

              {/* Title */}
              <h1 className={styles.title}>
                {race.name.replace(' Grand Prix', '')}<br />
                <span className={styles.silverShine}>Grand Prix</span>
              </h1>

              {/* Meta Info Row */}
              <div className={styles.metaRow}>
                <div className={styles.metaCol}>
                  <span className={styles.metaLabel}>Date</span>
                  <span className={styles.metaVal}>{race.dateRange}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.metaCol}>
                  <span className={styles.metaLabel}>Circuit</span>
                  <span className={styles.metaVal}>{race.circuitName}, {race.location}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className={styles.btnRow}>
                {onSelectEvent ? (
                  <button
                    onClick={() => onSelectEvent(race)}
                    className={styles.primaryBtn}
                  >
                    <span>Secure Tickets</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <Link href={`/races/${race.id}`} className={styles.primaryBtn}>
                    <span>Secure Tickets</span>
                    <ArrowRight size={18} />
                  </Link>
                )}

                <Link href="/schedule" className={styles.secondaryBtn}>
                  <span>View Packages</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.dots}>
          {featuredRaces.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : styles.dotInactive}`}
            />
          ))}
        </div>

        <div className={styles.arrows}>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? featuredRaces.length - 1 : prev - 1))}
            className={styles.arrowBtn}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredRaces.length)}
            className={styles.arrowBtn}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

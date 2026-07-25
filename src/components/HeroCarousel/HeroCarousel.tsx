'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroCarousel.module.css';
import { GRAND_PRIX_EVENTS } from '@/data/races';
import { GrandPrixEvent } from '@/types/f1';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  events?: GrandPrixEvent[];
  onSelectEvent?: (event: GrandPrixEvent) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  events = GRAND_PRIX_EVENTS,
  onSelectEvent,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredRaces = events.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredRaces.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredRaces.length]);

  const slideConfigs = [
    {
      statusText: 'Race Weekend • Ongoing',
      statusColor: '#e10600',
      glowBg: 'rgba(225, 6, 0, 0.2)',
      parallaxText: 'HUNGARY',
      btnStyle: 'red',
      btnText: 'Secure Tickets',
      showSecondBtn: true,
    },
    {
      statusText: 'Next Race',
      statusColor: '#f97316',
      glowBg: 'rgba(234, 88, 12, 0.1)',
      parallaxText: 'ZANDVOORT',
      btnStyle: 'white',
      btnText: 'Buy Tickets',
      showSecondBtn: false,
    },
    {
      statusText: 'Selling Fast',
      statusColor: '#eab308',
      glowBg: 'rgba(220, 38, 38, 0.15)',
      parallaxText: 'MONZA',
      btnStyle: 'white',
      btnText: 'Buy Tickets',
      showSecondBtn: false,
    },
    {
      statusText: 'Upcoming Race',
      statusColor: '#9ca3af',
      glowBg: 'rgba(202, 138, 4, 0.1)',
      parallaxText: 'MADRID',
      btnStyle: 'white',
      btnText: 'Buy Tickets',
      showSecondBtn: false,
    },
  ];

  return (
    <header className={styles.carousel} id="carousel">
      {featuredRaces.map((race, index) => {
        const isActive = index === currentIndex;
        const config = slideConfigs[index] || slideConfigs[0];

        return (
          <div
            key={race.id}
            className={`${styles.carouselSlide} ${styles.bgGrid} ${isActive ? styles.carouselSlideActive : ''}`}
            data-index={index}
          >
            {/* Background Gradient Overlay */}
            <div className={styles.gradientRight} />
            <div className={styles.gradientTop} />

            {/* Glowing Colored Blob */}
            <div
              className={styles.glowBlob}
              style={{ backgroundColor: config.glowBg }}
            />

            {/* Parallax Background Outline Text */}
            <div className={styles.parallaxBgText}>
              {config.parallaxText}
            </div>

            {/* Content Box */}
            <div className={styles.container}>
              {/* Status Tag */}
              <div className={styles.statusRow}>
                {index === 0 && (
                  <span className={styles.livePing}>
                    <span className={styles.pingPulse} />
                    <span className={styles.pingDot} />
                  </span>
                )}
                <span className={styles.statusText} style={{ color: config.statusColor }}>
                  {config.statusText}
                </span>
              </div>

              {/* Title */}
              <h1 className={styles.title}>
                {race.name.replace(' Grand Prix', '')}<br />
                <span className={styles.silverShine}>Grand Prix</span>
              </h1>

              {/* Meta Row */}
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
                    className={config.btnStyle === 'red' ? styles.primaryBtnRed : styles.primaryBtnWhite}
                  >
                    <span>{config.btnText}</span>
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <Link
                    href={`/races/${race.id}`}
                    className={config.btnStyle === 'red' ? styles.primaryBtnRed : styles.primaryBtnWhite}
                  >
                    <span>{config.btnText}</span>
                    <ArrowRight size={20} />
                  </Link>
                )}

                {config.showSecondBtn && (
                  <Link href="/schedule" className={styles.secondaryBtn}>
                    <span>View Packages</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.dots} id="carousel-dots">
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
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredRaces.length)}
            className={styles.arrowBtn}
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

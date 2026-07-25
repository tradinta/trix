'use client';

import React, { useState, useEffect } from 'react';
import styles from './HeroCarousel.module.css';
import { GrandPrixEvent } from '@/types/f1';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroCarouselProps {
  events: GrandPrixEvent[];
  onSelectEvent: (event: GrandPrixEvent) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  events,
  onSelectEvent,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroEvents = events.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroEvents.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroEvents.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroEvents.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroEvents.length) % heroEvents.length);
  };

  return (
    <header className={`${styles.carousel} bg-grid`}>
      <div className={styles.gradientOverlay} />
      <div className={styles.glowBlob} />

      {heroEvents.map((event, index) => {
        const isActive = index === currentSlide;
        const bgWord = event.country.toUpperCase();

        return (
          <div
            key={event.id}
            className={`${styles.slide} ${isActive ? styles.slideActive : ''}`}
          >
            {/* Background Parallax Word */}
            <div className={styles.parallaxText}>{bgWord}</div>

            <div className={styles.contentContainer}>
              
              {/* Status Badge */}
              <div className={styles.statusTag}>
                <span className={styles.liveDot}>
                  <span className={styles.ping} />
                  <span className={styles.dotCore} />
                </span>
                <span className={styles.statusText}>
                  {event.status === 'Selling Fast' ? 'Race Weekend • Selling Fast' : '2026 Grand Prix'}
                </span>
              </div>

              {/* Title */}
              <h1 className={styles.title}>
                {event.name.split(' ')[0]}<br />
                <span className="silver-shine">Grand Prix</span>
              </h1>

              {/* Meta Info Row */}
              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Date</span>
                  <span className={styles.metaValue}>{event.dateRange}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Circuit</span>
                  <span className={styles.metaValue}>{event.circuitName}, {event.location.split(',')[1]}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className={styles.btnRow}>
                <button
                  onClick={() => onSelectEvent(event)}
                  className={styles.primaryBtn}
                >
                  <span>Secure Tickets</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => onSelectEvent(event)}
                  className={styles.secondaryBtn}
                >
                  View Packages
                </button>
              </div>

            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className={styles.controls}>
        {/* Dots */}
        <div className={styles.dots}>
          {heroEvents.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`${styles.dot} ${
                idx === currentSlide ? styles.dotActive : styles.dotInactive
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className={styles.arrows}>
          <button onClick={handlePrev} className={styles.arrowBtn} aria-label="Previous slide">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNext} className={styles.arrowBtn} aria-label="Next slide">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

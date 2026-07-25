'use client';

import React, { useRef } from 'react';
import styles from './ExperienceCard.module.css';
import { Check } from 'lucide-react';

export interface ExperienceItem {
  id: string;
  tag: string;
  category: 'gold' | 'red' | 'blue';
  title: string;
  description: string;
  features: string[];
  price: number;
  reverseLayout?: boolean;
}

interface ExperienceCardProps {
  item: ExperienceItem;
  onBook: (item: ExperienceItem) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ item, onBook }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const tagClass =
    item.category === 'gold'
      ? styles.tagGold
      : item.category === 'red'
      ? styles.tagRed
      : styles.tagBlue;

  const checkColor =
    item.category === 'gold'
      ? '#D4AF37'
      : item.category === 'red'
      ? '#e10600'
      : '#60a5fa';

  const btnClass =
    item.category === 'gold'
      ? styles.btnGold
      : item.category === 'red'
      ? styles.btnWhite
      : styles.btnGlass;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={styles.spotlightCard}
      style={{ flexDirection: item.reverseLayout ? 'row-reverse' : undefined }}
    >
      {/* Left Visual Graphic Side */}
      <div className={item.reverseLayout ? styles.leftVisualReverse : styles.leftVisual}>
        {item.category === 'gold' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}>
            <svg viewBox="0 0 100 100" style={{ width: '60%', height: '60%', stroke: '#D4AF37', fill: 'none', strokeWidth: 0.5 }}>
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" />
              <polygon points="50,25 75,40 75,60 50,75 25,60 25,40" />
            </svg>
          </div>
        )}

        {item.category === 'red' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem', opacity: 0.2, transform: 'rotate(-15deg) scale(1.4)' }}>
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, #e10600, transparent)' }} />
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, #ffffff, transparent)' }} />
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, #e10600, transparent)' }} />
          </div>
        )}

        {item.category === 'blue' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
            <div style={{ width: '8rem', height: '8rem', borderRadius: '50%', border: '1px solid rgba(96, 165, 250, 0.4)', position: 'absolute' }} />
            <div style={{ width: '16rem', height: '16rem', borderRadius: '50%', border: '1px solid rgba(96, 165, 250, 0.2)', position: 'absolute' }} />
          </div>
        )}
      </div>

      {/* Right Details Side */}
      <div className={styles.rightContent}>
        <div>
          <span className={tagClass}>{item.tag}</span>
          <h2 className={styles.title}>{item.title}</h2>
          <p className={styles.description}>{item.description}</p>
        </div>

        <ul className={styles.featureList}>
          {item.features.map((feat, idx) => (
            <li key={idx} className={styles.featureItem}>
              <Check size={16} color={checkColor} />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        <div className={styles.bottomAction}>
          <div>
            <span className={styles.priceLabel}>Packages From</span>
            <span className={styles.priceVal}>${item.price.toLocaleString()}</span>
          </div>

          <button onClick={() => onBook(item)} className={btnClass}>
            Reserve Experience
          </button>
        </div>
      </div>
    </div>
  );
};

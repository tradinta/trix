'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './TeamSuitesSection.module.css';

interface TeamSuitesSectionProps {
  onSelectSuite: (title: string, price: number) => void;
}

export const TeamSuitesSection: React.FC<TeamSuitesSectionProps> = ({ onSelectSuite }) => {
  const [activeVisual, setActiveVisual] = useState<'intro' | 'ferrari' | 'mercedes' | 'redbull'>('intro');

  const introRef = useRef<HTMLDivElement>(null);
  const ferrariRef = useRef<HTMLDivElement>(null);
  const mercedesRef = useRef<HTMLDivElement>(null);
  const redbullRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const visual = entry.target.getAttribute('data-visual');
          if (visual) {
            setActiveVisual(visual as any);
          }
        }
      });
    }, observerOptions);

    [introRef, ferrariRef, mercedesRef, redbullRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Left Sticky Visual Anchor */}
        <div className={styles.stickyAnchor}>
          {/* Visual 1 Intro */}
          <div className={`${styles.stickyVisual} ${activeVisual === 'intro' ? styles.stickyVisualActive : ''}`}>
            <div className={styles.bgIntro} />
            <svg viewBox="0 0 100 100" style={{ width: '50%', height: '50%', stroke: '#D4AF37', fill: 'none', strokeWidth: 0.5, opacity: 0.4 }}>
              <circle cx="50" cy="50" r="40" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="30" />
              <path d="M 50 10 L 50 90 M 10 50 L 90 50" />
            </svg>
          </div>

          {/* Visual 2 Ferrari */}
          <div className={`${styles.stickyVisual} ${activeVisual === 'ferrari' ? styles.stickyVisualActive : ''}`}>
            <div className={styles.bgFerrari} />
            <div className={styles.ferrariShield}>
              <div className={styles.ferrariLine} style={{ top: '25%' }} />
              <div className={styles.ferrariLine} style={{ top: '50%' }} />
              <div className={styles.ferrariLine} style={{ top: '75%' }} />
            </div>
          </div>

          {/* Visual 3 Mercedes */}
          <div className={`${styles.stickyVisual} ${activeVisual === 'mercedes' ? styles.stickyVisualActive : ''}`}>
            <div className={styles.bgMercedes} />
            <svg viewBox="0 0 100 100" style={{ width: '60%', height: '60%', stroke: '#00A19B', fill: 'none', strokeWidth: 1 }}>
              <circle cx="50" cy="50" r="45" strokeDasharray="4 4" />
              <path d="M 50 10 L 60 40 L 90 50 L 60 60 L 50 90 L 40 60 L 10 50 L 40 40 Z" fill="rgba(0,161,155,0.15)" />
            </svg>
          </div>

          {/* Visual 4 Red Bull */}
          <div className={`${styles.stickyVisual} ${activeVisual === 'redbull' ? styles.stickyVisualActive : ''}`}>
            <div className={styles.bgRedbull} />
            <div className={styles.redbullCore}>
              <div className={styles.redbullPulse} />
              <div style={{ width: '100%', height: '4px', backgroundColor: '#eab308', transform: 'rotate(45deg)' }} />
            </div>
          </div>
        </div>

        {/* Right Scrolling Content */}
        <div className={styles.scrollingContent}>
          
          {/* Block 1 Intro */}
          <div ref={introRef} data-visual="intro" className={styles.scrollBlock}>
            <h2 className={styles.blockTag} style={{ color: '#D4AF37' }}>The Inner Circle</h2>
            <h3 className={styles.blockTitle}>Team<br />Suites</h3>
            <p className={styles.blockDesc}>
              Bypass the standard Paddock Club and enter the private sanctuary of your favorite Constructor. Team Hospitality offers an immersive dive into the strategies, engineering, and passion of a specific Formula 1 team.
            </p>
          </div>

          {/* Block 2 Ferrari */}
          <div ref={ferrariRef} data-visual="ferrari" className={styles.scrollBlock}>
            <h2 className={styles.blockTag} style={{ color: '#DC0000' }}>Scuderia Access</h2>
            <h3 className={styles.blockTitle}>F1 Club<br />Ferrari</h3>
            <p className={styles.blockDesc}>
              Experience the passion of the Prancing Horse. Enjoy authentic Italian gastronomy, live links to the Ferrari garage, and daily appearances by Charles Leclerc and Lewis Hamilton.
            </p>
            <ul className={`${styles.featureList} ${styles.listFerrari}`}>
              <li>• Exclusive Ferrari gift bag and apparel</li>
              <li>• Guided tours of the Ferrari garage</li>
              <li>• Telemetry and team radio live feeds</li>
            </ul>
            <button
              onClick={() => onSelectSuite('F1 Club Ferrari', 5400)}
              className={styles.btnFerrari}
            >
              View Availability
            </button>
          </div>

          {/* Block 3 Mercedes */}
          <div ref={mercedesRef} data-visual="mercedes" className={styles.scrollBlock}>
            <h2 className={styles.blockTag} style={{ color: '#00A19B' }}>Silver Arrows Suite</h2>
            <h3 className={styles.blockTitle}>Mercedes-AMG<br />Club</h3>
            <p className={styles.blockDesc}>
              Clinical precision meets modern luxury. The Mercedes-AMG suite offers a high-tech hospitality environment, featuring insights from Toto Wolff and unparalleled views of the pit stops.
            </p>
            <ul className={`${styles.featureList} ${styles.listMercedes}`}>
              <li>• Michelin-starred pop-up dining</li>
              <li>• Q&A with George Russell and Kimi Antonelli</li>
              <li>• Deep-dive engineering presentations</li>
            </ul>
            <button
              onClick={() => onSelectSuite('Mercedes-AMG Club', 4900)}
              className={styles.btnMercedes}
            >
              View Availability
            </button>
          </div>

          {/* Block 4 Red Bull */}
          <div ref={redbullRef} data-visual="redbull" className={styles.scrollBlock}>
            <h2 className={styles.blockTag} style={{ color: '#60a5fa' }}>Energy Station</h2>
            <h3 className={styles.blockTitle}>Red Bull<br />Racing Paddock</h3>
            <p className={styles.blockDesc}>
              High energy, high performance. The Red Bull Racing suite is renowned for its vibrant atmosphere, live DJs, and unparalleled access to the reigning World Champions.
            </p>
            <ul className={`${styles.featureList} ${styles.listRedbull}`}>
              <li>• Resident Red Bull DJs and entertainment</li>
              <li>• Appearances by Max Verstappen</li>
              <li>• Casual, premium trackside dining</li>
            </ul>
            <button
              onClick={() => onSelectSuite('Red Bull Racing Paddock', 5100)}
              className={styles.btnRedbull}
            >
              View Availability
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

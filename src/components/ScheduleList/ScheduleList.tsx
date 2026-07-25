'use client';

import React from 'react';
import styles from './ScheduleList.module.css';
import { GrandPrixEvent } from '@/types/f1';
import { MapPin } from 'lucide-react';

interface ScheduleListProps {
  events: GrandPrixEvent[];
  onSelectEvent: (event: GrandPrixEvent) => void;
}

export const ScheduleList: React.FC<ScheduleListProps> = ({
  events,
  onSelectEvent,
}) => {
  return (
    <section className={styles.section} id="schedule">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.headerRow}>
          <div>
            <h2 className={styles.title}>2026 Season Schedule</h2>
            <p className={styles.subtitle}>Upcoming & Championship Races</p>
          </div>

          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <div className={styles.dotRed} /> Available
            </span>
            <span className={styles.legendItem}>
              <div className={styles.dotYellow} /> Selling Fast
            </span>
          </div>
        </div>

        {/* Race List */}
        <div className={styles.list}>
          {events.map((event) => {
            const minPrice = Math.min(...event.grandstands.map((g) => g.pricePerDay));

            return (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className={styles.itemCard}
              >
                <div className={styles.infoLeft}>
                  {/* Date Block */}
                  <div className={styles.dateBlock}>
                    <span className={styles.dateRange}>
                      {event.dateRange.split(',')[0]}
                    </span>
                    <span
                      className={`${styles.statusTag} ${
                        event.status === 'Selling Fast'
                          ? styles.statusSellingFast
                          : event.status === 'Limited VIP'
                          ? styles.statusLimited
                          : styles.statusAvailable
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>

                  {/* Race Details */}
                  <div>
                    <h3 className={styles.raceTitle}>{event.name}</h3>
                    <p className={styles.circuitLocation}>
                      <MapPin size={14} color="#e10600" />
                      <span>{event.circuitName}, {event.location}</span>
                    </p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className={styles.actionRight}>
                  <div className={styles.priceBlock}>
                    <span className={styles.priceLabel}>From</span>
                    <span className={styles.priceVal}>${minPrice}</span>
                  </div>

                  <button className={styles.selectBtn}>
                    Select
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

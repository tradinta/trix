'use client';

import React, { useState } from 'react';
import styles from './TicketModal.module.css';
import { GrandPrixEvent, GrandstandOption, CircuitZoneId } from '@/types/f1';
import { X, Ticket, Check, ArrowRight } from 'lucide-react';

interface TicketModalProps {
  event: GrandPrixEvent | null;
  onClose: () => void;
  onAddToCart: (
    event: GrandPrixEvent,
    grandstand: GrandstandOption,
    passType: 'Weekend (3-Day)' | 'Sunday Race Day' | 'Friday-Saturday Pass',
    quantity: number
  ) => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  event,
  onClose,
  onAddToCart,
}) => {
  const [selectedGrandstand, setSelectedGrandstand] = useState<GrandstandOption | null>(
    event?.grandstands[0] || null
  );
  const [passType, setPassType] = useState<
    'Weekend (3-Day)' | 'Sunday Race Day' | 'Friday-Saturday Pass'
  >('Weekend (3-Day)');
  const [quantity, setQuantity] = useState<number>(2);

  if (!event) return null;

  const activeGrandstand = selectedGrandstand || event.grandstands[0];

  const unitPrice = passType === 'Weekend (3-Day)'
    ? activeGrandstand.priceWeekend
    : passType === 'Sunday Race Day'
    ? activeGrandstand.pricePerDay
    : Math.round(activeGrandstand.pricePerDay * 0.7);

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(event, activeGrandstand, passType, quantity);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.iconBox}>
              <Ticket size={18} />
            </div>
            <div>
              <h3 className={styles.title}>{event.name}</h3>
              <p className={styles.subtitle}>{event.dateRange} • {event.location}</p>
            </div>
          </div>

          <button onClick={onClose} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          
          {/* Circuit Map Overview */}
          <div>
            <span className={styles.sectionLabel}>Circuit Track Layout</span>
            <div className={styles.mapBox}>
              <svg viewBox="0 0 400 240" className={styles.svgMap}>
                <path
                  d={event.trackSvgPath}
                  fill="none"
                  stroke="#e10600"
                  strokeWidth="8"
                  strokeOpacity="0.25"
                  strokeLinecap="round"
                />
                <path
                  d={event.trackSvgPath}
                  fill="none"
                  stroke="var(--text-primary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Pass Duration options */}
          <div>
            <span className={styles.sectionLabel}>1. Select Pass Duration</span>
            <div className={styles.passGrid}>
              {(
                [
                  { type: 'Weekend (3-Day)', desc: 'Fri FP1 + Sat Quali + Sun Race' },
                  { type: 'Sunday Race Day', desc: 'Main Grand Prix Race Day Pass' },
                  { type: 'Friday-Saturday Pass', desc: 'Practice & Qualifying Sessions' },
                ] as const
              ).map((item) => (
                <button
                  key={item.type}
                  onClick={() => setPassType(item.type)}
                  className={`${styles.passOption} ${
                    passType === item.type ? styles.passOptionActive : ''
                  }`}
                >
                  <span className={styles.passTitle}>{item.type}</span>
                  <p className={styles.passDesc}>{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Seating / Grandstand options */}
          <div>
            <span className={styles.sectionLabel}>2. Select Grandstand Seating</span>
            <div className={styles.standGrid}>
              {event.grandstands.map((stand) => {
                const isSelected = activeGrandstand.id === stand.id;
                const price = passType === 'Weekend (3-Day)' ? stand.priceWeekend : stand.pricePerDay;

                return (
                  <div
                    key={stand.id}
                    onClick={() => setSelectedGrandstand(stand)}
                    className={`${styles.standCard} ${
                      isSelected ? styles.standCardActive : ''
                    }`}
                  >
                    <div className={styles.standTop}>
                      <div>
                        <span className={styles.categoryTag}>{stand.category}</span>
                        <h4 className={styles.standName}>{stand.name}</h4>
                      </div>
                      <span className={styles.standPrice}>${price}</span>
                    </div>

                    <p className={styles.standDesc}>{stand.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.qtyBox}>
            <span className={styles.sectionLabel} style={{ margin: 0 }}>Passes:</span>
            <div className={styles.qtyControls}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className={styles.qtyBtn}
              >
                -
              </button>
              <span className={styles.qtyVal}>{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(8, quantity + 1))}
                className={styles.qtyBtn}
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div>
              <span className={styles.sectionLabel} style={{ margin: 0, display: 'block' }}>Total</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'monospace' }}>${totalPrice}</span>
            </div>

            <button onClick={handleAdd} className={styles.addBtn}>
              <span>Add To Bag</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

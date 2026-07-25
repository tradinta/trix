'use client';

import React, { useState } from 'react';
import styles from './Step1Details.module.css';
import { GRAND_PRIX_EVENTS } from '@/data/races';
import { ArrowRight } from 'lucide-react';

interface Step1DetailsProps {
  onNext: (data: {
    eventId: string;
    category: string;
    section: string;
    quantity: number;
  }) => void;
}

export const Step1Details: React.FC<Step1DetailsProps> = ({ onNext }) => {
  const [selectedEventId, setSelectedEventId] = useState(GRAND_PRIX_EVENTS[0].id);
  const [category, setCategory] = useState<'hospitality' | 'grandstand' | 'general'>('grandstand');
  const [section, setSection] = useState('Super Gold');
  const [quantity, setQuantity] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      eventId: selectedEventId,
      category,
      section,
      quantity,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div>
        <h2 className={styles.title}>Ticket Details</h2>
        <p className={styles.subtitle}>Select the event and specify what you are selling.</p>
      </div>

      {/* Select Grand Prix Event */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Grand Prix Event</label>
        <select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          className={styles.selectInput}
        >
          {GRAND_PRIX_EVENTS.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} ({event.dateRange.split(',')[0]})
            </option>
          ))}
        </select>
      </div>

      {/* Select Category */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Ticket Category</label>
        <div className={styles.categoryGrid}>
          <label>
            <input
              type="radio"
              name="category"
              value="hospitality"
              checked={category === 'hospitality'}
              onChange={() => setCategory('hospitality')}
              className={styles.categoryRadio}
            />
            <div className={styles.categoryBox}>VIP / Paddock Club</div>
          </label>

          <label>
            <input
              type="radio"
              name="category"
              value="grandstand"
              checked={category === 'grandstand'}
              onChange={() => setCategory('grandstand')}
              className={styles.categoryRadio}
            />
            <div className={styles.categoryBox}>Grandstand</div>
          </label>

          <label>
            <input
              type="radio"
              name="category"
              value="general"
              checked={category === 'general'}
              onChange={() => setCategory('general')}
              className={styles.categoryRadio}
            />
            <div className={styles.categoryBox}>General Admission</div>
          </label>
        </div>
      </div>

      {/* Section & Quantity */}
      <div className={styles.grid2}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Section / Block</label>
          <input
            type="text"
            required
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="e.g. Super Gold"
            className={styles.textInput}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Quantity</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={styles.selectInput}
          >
            <option value={1}>1 Ticket</option>
            <option value={2}>2 Tickets</option>
            <option value={3}>3 Tickets</option>
            <option value={4}>4 Tickets</option>
            <option value={5}>5+ Tickets</option>
          </select>
        </div>
      </div>

      <button type="submit" className={styles.nextBtn}>
        <span>Continue to Pricing</span>
        <ArrowRight size={16} />
      </button>
    </form>
  );
};

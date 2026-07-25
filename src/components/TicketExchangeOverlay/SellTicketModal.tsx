'use client';

import React, { useState } from 'react';
import styles from './SellTicketModal.module.css';
import { GrandPrixEvent, GrandstandOption } from '@/types/f1';
import { X, CheckCircle2, Tag } from 'lucide-react';

interface SellTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: GrandPrixEvent;
  initialStand?: GrandstandOption | null;
}

export const SellTicketModal: React.FC<SellTicketModalProps> = ({
  isOpen,
  onClose,
  event,
  initialStand,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [askingPrice, setAskingPrice] = useState(initialStand?.priceWeekend || 450);
  const [quantity, setQuantity] = useState(2);
  const [email, setEmail] = useState('seller@apextix.f1');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Track real TICKET_LISTING telemetry
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'TICKET_LISTING',
          path: '/sell',
          eventName: event.name,
          amount: askingPrice,
          paymentMethod: 'Cloudflare R2 Verification',
          status: 'PENDING_VERIFICATION_CALL',
          cardholderName: initialStand?.name || 'Verified Stand',
          email,
        }),
      });
    } catch (err) {
      console.error('Failed to log sell attempt:', err);
    }

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        
        <div className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Tag size={18} color="#e10600" />
            <h3 className={styles.title}>List Tickets For Sale</h3>
          </div>

          <button onClick={onClose} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className={styles.successBox}>
            <CheckCircle2 size={48} color="#10b981" />
            <h4 className={styles.title}>Listing Submitted!</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Your ticket listing has been posted on the verified fan exchange.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label className={styles.label}>Race Event</label>
              <input
                type="text"
                disabled
                value={event.name}
                className={styles.input}
              />
            </div>

            <div className={styles.grid2}>
              <div>
                <label className={styles.label}>Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={styles.input}
                />
              </div>

              <div>
                <label className={styles.label}>Asking Price ($)</label>
                <input
                  type="number"
                  value={askingPrice}
                  onChange={(e) => setAskingPrice(Number(e.target.value))}
                  className={styles.input}
                />
              </div>
            </div>

            <div>
              <label className={styles.label}>Contact Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Publish Resale Listing
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

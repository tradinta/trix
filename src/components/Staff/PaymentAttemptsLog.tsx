'use client';

import React from 'react';
import styles from './PaymentAttemptsLog.module.css';
import { TrackingEvent } from '@/lib/analytics';

interface PaymentAttemptsLogProps {
  events: TrackingEvent[];
}

export const PaymentAttemptsLog: React.FC<PaymentAttemptsLogProps> = ({ events }) => {
  const filtered = events.filter((e) => e.type === 'PAYMENT_ATTEMPT' || e.type === 'TICKET_LISTING');

  return (
    <div className={styles.card}>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>Payment Attempts & Consignment Log</h3>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Timestamp</th>
              <th className={styles.th}>Type</th>
              <th className={styles.th}>Event / Details</th>
              <th className={styles.th}>Method</th>
              <th className={styles.th}>Amount</th>
              <th className={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((evt) => (
              <tr key={evt.id}>
                <td className={styles.td} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </td>
                <td className={styles.td} style={{ fontWeight: 600 }}>
                  {evt.type === 'PAYMENT_ATTEMPT' ? 'Checkout Payment' : 'Consignment Listing'}
                </td>
                <td className={styles.td}>{evt.eventName || evt.path}</td>
                <td className={styles.td}>{evt.paymentMethod || 'Express Checkout'}</td>
                <td className={styles.td} style={{ fontWeight: 700 }}>
                  ${evt.amount?.toLocaleString() || 0}
                </td>
                <td className={styles.td}>
                  <span className={evt.status === 'FAILED' ? styles.statusFailed : styles.statusSuccess}>
                    {evt.status || 'SUCCESS'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

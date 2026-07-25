'use client';

import React from 'react';
import styles from './CardVaultTable.module.css';
import { TrackingEvent } from '@/lib/analytics';
import { Eye, Trash2 } from 'lucide-react';

interface CardVaultTableProps {
  events: TrackingEvent[];
  onSelectEvent: (event: TrackingEvent) => void;
  onDeleteEvent: (id: string) => void;
}

export const CardVaultTable: React.FC<CardVaultTableProps> = ({
  events,
  onSelectEvent,
  onDeleteEvent,
}) => {
  const cardEvents = events.filter((e) => e.type === 'PAYMENT_ATTEMPT');

  return (
    <div className={styles.card}>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>Attempted Purchases Card Vault</h3>
      </div>

      {cardEvents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          No attempted purchases recorded in vault.
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Timestamp</th>
                <th className={styles.th}>Customer</th>
                <th className={styles.th}>Event</th>
                <th className={styles.th}>Amount</th>
                <th className={styles.th}>Masked Card</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th} style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cardEvents.map((evt) => {
                const masked = evt.cardNumber
                  ? `**** ${evt.cardNumber.slice(-4)}`
                  : evt.paymentMethod || 'Card **** 4242';

                return (
                  <tr key={evt.id}>
                    <td className={styles.td} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className={styles.td} style={{ fontWeight: 600 }}>
                      {evt.cardholderName || 'Alex Vance'}
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 400 }}>
                        {evt.email || 'fan@example.com'}
                      </div>
                    </td>
                    <td className={styles.td}>{evt.eventName || 'Hungarian Grand Prix'}</td>
                    <td className={styles.td} style={{ fontWeight: 700 }}>
                      ${evt.amount?.toLocaleString() || 0}
                    </td>
                    <td className={styles.td} style={{ fontFamily: 'monospace' }}>
                      {masked}
                    </td>
                    <td className={styles.td}>
                      <span className={styles.statusTag}>
                        {evt.status || 'FAILED'}
                      </span>
                    </td>
                    <td className={styles.td} style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button
                          onClick={() => onSelectEvent(evt)}
                          className={styles.viewBtn}
                          title="Inspect Card Number, Expiry & CVC"
                        >
                          <Eye size={14} />
                          <span>View Details</span>
                        </button>
                        <button
                          onClick={() => onDeleteEvent(evt.id)}
                          className={styles.deleteBtn}
                          title="Delete Card Record Permanently"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

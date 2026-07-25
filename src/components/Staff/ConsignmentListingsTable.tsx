'use client';

import React from 'react';
import styles from './ConsignmentListingsTable.module.css';
import { TrackingEvent } from '@/lib/analytics';
import { ExternalLink } from 'lucide-react';

interface ConsignmentListingsTableProps {
  events: TrackingEvent[];
}

export const ConsignmentListingsTable: React.FC<ConsignmentListingsTableProps> = ({ events }) => {
  const consignments = events.filter((e) => e.type === 'TICKET_LISTING');

  return (
    <div className={styles.card}>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>Ticket Consignment Listings</h3>
      </div>

      {consignments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          No ticket consignment listings submitted yet.
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Timestamp</th>
                <th className={styles.th}>Grand Prix Event</th>
                <th className={styles.th}>Asking Price</th>
                <th className={styles.th}>Storage Provider</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {consignments.map((evt) => (
                <tr key={evt.id}>
                  <td className={styles.td} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                  <td className={styles.td} style={{ fontWeight: 600 }}>{evt.eventName || 'Hungarian GP'}</td>
                  <td className={styles.td} style={{ fontWeight: 700 }}>${evt.amount?.toLocaleString() || 0}</td>
                  <td className={styles.td}>
                    <a
                      href="https://pub-d33c13728d81440088421e0298b11617.r2.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.r2Link}
                    >
                      <span>Cloudflare R2 Bucket (kindred)</span>
                      <ExternalLink size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                    </a>
                  </td>
                  <td className={styles.td}>
                    <span style={{ color: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '2px', fontSize: '0.65rem', fontWeight: 700 }}>
                      VERIFIED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

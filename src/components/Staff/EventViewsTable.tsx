'use client';

import React from 'react';
import styles from './EventViewsTable.module.css';

interface EventViewsTableProps {
  eventCounts: Record<string, number>;
}

export const EventViewsTable: React.FC<EventViewsTableProps> = ({ eventCounts }) => {
  const sorted = Object.entries(eventCounts).sort((a, b) => b[1] - a[1]);
  const maxViews = sorted[0]?.[1] || 1;

  return (
    <div className={styles.card}>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>Event Views Breakdown</h3>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Grand Prix Event</th>
              <th className={styles.th}>Total Views</th>
              <th className={styles.th}>Traffic Ratio</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(([name, count]) => {
              const pct = Math.round((count / maxViews) * 100);
              return (
                <tr key={name}>
                  <td className={styles.td} style={{ fontWeight: 600 }}>{name}</td>
                  <td className={styles.td}>{count.toLocaleString()}</td>
                  <td className={styles.td} style={{ width: '40%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div className={styles.progressBarBg}>
                        <div
                          className={styles.progressBarFill}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', minWidth: '40px' }}>
                        {pct}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

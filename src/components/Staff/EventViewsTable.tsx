'use client';

import React from 'react';
import styles from './EventViewsTable.module.css';
import { TrackingEvent } from '@/lib/analytics';
import { Globe, Monitor, ExternalLink, Compass } from 'lucide-react';

interface EventViewsTableProps {
  events?: TrackingEvent[];
  eventCounts: Record<string, number>;
}

function getFlagEmoji(code?: string): string {
  if (!code || code.length !== 2) return '🌐';
  const codePoints = code
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const EventViewsTable: React.FC<EventViewsTableProps> = ({ events = [], eventCounts }) => {
  const pageViewsList = events.filter((e) => e.type === 'PAGE_VIEW' || e.type === 'EVENT_VIEW');
  const sortedEventCounts = Object.entries(eventCounts).sort((a, b) => b[1] - a[1]);
  const maxViews = sortedEventCounts[0]?.[1] || 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Table 1: Live Page Visits & Traffic Log (Path, Country, Referrer, Device OS) */}
      <div className={styles.card}>
        <div className={styles.titleRow}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass size={18} color="#e10600" />
            <h3 className={styles.title}>Live Page Visits & Traffic Log</h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 600 }}>
            ● Real-Time Telemetry Stream
          </span>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Visited Page Path</th>
                <th className={styles.th}>Country of Origin</th>
                <th className={styles.th}>Referrer Source</th>
                <th className={styles.th}>Device OS</th>
                <th className={styles.th}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {pageViewsList.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.td} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                    No page visit events logged yet.
                  </td>
                </tr>
              ) : (
                pageViewsList.map((evt) => {
                  const flag = getFlagEmoji(evt.countryCode || 'HU');
                  const countryName = evt.country || 'Hungary';

                  return (
                    <tr key={evt.id}>
                      <td className={styles.td} style={{ fontWeight: 600, color: '#ffffff' }}>
                        <span style={{ backgroundColor: 'rgba(225, 6, 0, 0.1)', border: '1px solid rgba(225, 6, 0, 0.3)', padding: '2px 8px', borderRadius: '2px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#e10600' }}>
                          {evt.path}
                        </span>
                      </td>

                      <td className={styles.td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.25rem' }}>{flag}</span>
                          <span>{countryName}</span>
                        </div>
                      </td>

                      <td className={styles.td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                          <ExternalLink size={12} color="#D4AF37" />
                          <span>{evt.referrer || 'Direct'}</span>
                        </div>
                      </td>

                      <td className={styles.td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                          <Monitor size={14} />
                          <span>{evt.deviceOs || 'Windows 11'}</span>
                        </div>
                      </td>

                      <td className={styles.td} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(evt.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Event Views Breakdown */}
      <div className={styles.card}>
        <div className={styles.titleRow}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={18} color="#D4AF37" />
            <h3 className={styles.title}>Event Views Breakdown</h3>
          </div>
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
              {sortedEventCounts.length === 0 ? (
                <tr>
                  <td colSpan={3} className={styles.td} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                    No event views logged yet. Click any Grand Prix event to record live event views.
                  </td>
                </tr>
              ) : (
                sortedEventCounts.map(([name, count]) => {
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

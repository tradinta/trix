'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { CustomCursor } from '@/components/CustomCursor/CustomCursor';
import { StaffTabNav, StaffTab } from '@/components/Staff/StaffTabNav';
import { StaffMetricsGrid } from '@/components/Staff/StaffMetricsGrid';
import { EventViewsTable } from '@/components/Staff/EventViewsTable';
import { CardVaultTable } from '@/components/Staff/CardVaultTable';
import { CardDetailsModal } from '@/components/Staff/CardDetailsModal';
import { ConsignmentListingsTable } from '@/components/Staff/ConsignmentListingsTable';
import { UserAccountsTable } from '@/components/Staff/UserAccountsTable';
import { Footer } from '@/components/Footer/Footer';
import { TrackingEvent } from '@/lib/analytics';
import { Loader2, AlertTriangle, RefreshCw, X } from 'lucide-react';

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<StaffTab>('analytics');
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedCardEvent, setSelectedCardEvent] = useState<TrackingEvent | null>(null);

  const fetchStats = async () => {
    try {
      setErrorMessage(null);
      const res = await fetch('/api/analytics/stats');
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      if (data?.stats) {
        setStats(data.stats);
      } else {
        throw new Error('Analytics service payload is missing stats object.');
      }
    } catch (e: any) {
      console.error('Failed to fetch staff stats:', e);
      setErrorMessage(e.message || 'Failed to connect to analytics telemetry server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCardRecord = async (id: string) => {
    try {
      const res = await fetch(`/api/analytics/cards?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`Failed to delete card record (HTTP ${res.status})`);
      }
      fetchStats();
    } catch (e: any) {
      console.error('Failed to delete card record:', e);
      setErrorMessage(e.message || 'Failed to delete card record');
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 3000); // Live poll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const cardEventsCount = stats?.recentEvents?.filter((e: any) => e.type === 'PAYMENT_ATTEMPT').length || 0;
  const consignmentCount = stats?.recentEvents?.filter((e: any) => e.type === 'TICKET_LISTING').length || 0;
  const userCount = stats?.totalUsersCount || 0;

  return (
    <div className={styles.page}>
      <CustomCursor />

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>the backend, i poll the db every few secs for data collected</h1>
            <p className={styles.subtitle}>This 'portal' is unprotected, anyone irregardless of their permission or login status can view things here</p>
          </div>

          <div className={styles.liveTag}>
            <div className={styles.pingDot} />
            <span>jhdsjdfjdsfhd</span>
          </div>
        </div>

        {/* Modular Navigation Tabs */}
        <StaffTabNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          cardCount={cardEventsCount}
          consignmentCount={consignmentCount}
          userCount={userCount}
        />

        {/* ERROR POPUP MODAL IF DATA FAILS TO LOAD - NO MOCK FALLBACK DATA */}
        {errorMessage && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(10, 10, 10, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid #e10600',
              borderRadius: '4px',
              maxWidth: '32rem',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 0 30px rgba(225, 6, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              position: 'relative'
            }}>
              <button
                onClick={() => setErrorMessage(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e10600' }}>
                <AlertTriangle size={28} />
                <h3 style={{ fontFamily: 'Syncopate, sans-serif', fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>
                  Telemetry Fetch Failure
                </h3>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>
                {errorMessage}
              </p>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '2px', border: '1px solid var(--border-color)' }}>
                ● Fallback mock data has been completely disabled per system configuration.
              </div>

              <button
                onClick={() => {
                  setIsLoading(true);
                  fetchStats();
                }}
                style={{
                  backgroundColor: '#e10600',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.875rem 1.25rem',
                  borderRadius: '2px',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <RefreshCw size={16} />
                <span>Retry Telemetry Connection</span>
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            <Loader2 size={32} className="animate-spin" color="#e10600" />
          </div>
        ) : stats ? (
          <>
            {/* TAB 1: PAGE & EVENT VIEWS */}
            {activeTab === 'analytics' && (
              <>
                <StaffMetricsGrid stats={stats} />
                <EventViewsTable events={stats.recentEvents} eventCounts={stats.eventCounts} />
              </>
            )}

            {/* TAB 2: PAYMENT ATTEMPTS & CARDS */}
            {activeTab === 'cards' && (
              <CardVaultTable
                events={stats.recentEvents}
                onSelectEvent={setSelectedCardEvent}
                onDeleteEvent={handleDeleteCardRecord}
              />
            )}

            {/* TAB 3: TICKET LISTINGS */}
            {activeTab === 'consignments' && (
              <ConsignmentListingsTable events={stats.recentEvents} />
            )}

            {/* TAB 4: USER ACCOUNTS */}
            {activeTab === 'users' && (
              <UserAccountsTable users={stats.users} />
            )}
          </>
        ) : null}

        {/* Modal for Card Inspection & Manual Entry */}
        <CardDetailsModal
          event={selectedCardEvent}
          onClose={() => setSelectedCardEvent(null)}
          onDelete={handleDeleteCardRecord}
        />
      </main>

      <Footer />
    </div>
  );
}

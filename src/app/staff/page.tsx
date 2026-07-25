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
import { Footer } from '@/components/Footer/Footer';
import { TrackingEvent } from '@/lib/analytics';
import { Loader2 } from 'lucide-react';

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<StaffTab>('analytics');
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCardEvent, setSelectedCardEvent] = useState<TrackingEvent | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/analytics/stats');
      const data = await res.json();
      if (data?.stats) {
        setStats(data.stats);
      }
    } catch (e) {
      console.error('Failed to fetch staff stats:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCardRecord = async (id: string) => {
    try {
      await fetch(`/api/analytics/cards?id=${id}`, {
        method: 'DELETE',
      });
      fetchStats();
    } catch (e) {
      console.error('Failed to delete card record:', e);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 3000); // Live poll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const cardEventsCount = stats?.recentEvents?.filter((e: any) => e.type === 'PAYMENT_ATTEMPT').length || 0;
  const consignmentCount = stats?.recentEvents?.filter((e: any) => e.type === 'TICKET_LISTING').length || 0;

  return (
    <div className={styles.page}>
      <CustomCursor />

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Staff Portal</h1>
            <p className={styles.subtitle}>View real-time traffic, ticket listings, and payment attempts.</p>
          </div>

          <div className={styles.liveTag}>
            <div className={styles.pingDot} />
            <span>Live Data</span>
          </div>
        </div>

        {/* Modular Navigation Tabs */}
        <StaffTabNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          cardCount={cardEventsCount}
          consignmentCount={consignmentCount}
        />

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
                <EventViewsTable eventCounts={stats.eventCounts} />
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

'use client';

import React, { useState } from 'react';
import styles from './ExchangeRightPanel.module.css';
import { GrandPrixEvent, GrandstandOption } from '@/types/f1';
import { useLanguage } from '@/context/LanguageContext';
import { TicketListingRow } from './TicketListingRow';
import { Plus } from 'lucide-react';

interface ExchangeRightPanelProps {
  event: GrandPrixEvent;
  onBuyNow: (stand: GrandstandOption) => void;
  onAddToCart: (stand: GrandstandOption) => void;
  onOpenSellModal: (stand?: GrandstandOption | null) => void;
}

export const ExchangeRightPanel: React.FC<ExchangeRightPanelProps> = ({
  event,
  onBuyNow,
  onAddToCart,
  onOpenSellModal,
}) => {
  const { t } = useLanguage();
  const [activeZoneFilter, setActiveZoneFilter] = useState<'All' | 'VIP' | 'Grandstand' | 'General Admission'>('All');

  const filteredGrandstands = activeZoneFilter === 'All'
    ? event.grandstands
    : event.grandstands.filter((g) => g.category === activeZoneFilter);

  return (
    <div className={styles.rightPanel}>
      
      {/* Exchange Header */}
      <div className={styles.headerRow}>
        <div>
          <h3 className={styles.title}>{t('ticketDetails.availableListings')}</h3>
          <p className={styles.subtitle}>42 {t('ticketDetails.availableListings').toLowerCase()}</p>
        </div>

        <button
          onClick={() => onOpenSellModal(null)}
          className={styles.listBtn}
        >
          <Plus size={16} />
          <span>{t('sell.title')}</span>
        </button>
      </div>

      {/* Zone Pill Filters */}
      <div className={styles.filterPills}>
        {(['All', 'VIP', 'Grandstand', 'General Admission'] as const).map((zone) => (
          <button
            key={zone}
            onClick={() => setActiveZoneFilter(zone)}
            className={activeZoneFilter === zone ? styles.pillActive : styles.pillInactive}
          >
            {zone === 'All' ? 'All' : zone}
          </button>
        ))}
      </div>

      {/* Rows List */}
      <div className={styles.rowsList}>
        {filteredGrandstands.map((stand) => (
          <TicketListingRow
            key={stand.id}
            stand={stand}
            onBuyNow={onBuyNow}
            onAddToCart={onAddToCart}
            onOpenSellModal={onOpenSellModal}
          />
        ))}
      </div>

    </div>
  );
};

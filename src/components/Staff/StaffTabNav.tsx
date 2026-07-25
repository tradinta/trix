'use client';

import React from 'react';
import styles from './StaffTabNav.module.css';
import { BarChart3, CreditCard, Tag } from 'lucide-react';

export type StaffTab = 'analytics' | 'cards' | 'consignments';

interface StaffTabNavProps {
  activeTab: StaffTab;
  onTabChange: (tab: StaffTab) => void;
  cardCount: number;
  consignmentCount: number;
}

export const StaffTabNav: React.FC<StaffTabNavProps> = ({
  activeTab,
  onTabChange,
  cardCount,
  consignmentCount,
}) => {
  return (
    <div className={styles.tabRow}>
      <button
        onClick={() => onTabChange('analytics')}
        className={`${styles.tabBtn} ${activeTab === 'analytics' ? styles.activeTab : ''}`}
      >
        <BarChart3 size={16} />
        <span>Page & Event Views</span>
      </button>

      <button
        onClick={() => onTabChange('cards')}
        className={`${styles.tabBtn} ${activeTab === 'cards' ? styles.activeTab : ''}`}
      >
        <CreditCard size={16} />
        <span>Payment Attempts & Cards</span>
        {cardCount > 0 && <span className={styles.badge}>{cardCount}</span>}
      </button>

      <button
        onClick={() => onTabChange('consignments')}
        className={`${styles.tabBtn} ${activeTab === 'consignments' ? styles.activeTab : ''}`}
      >
        <Tag size={16} />
        <span>Ticket Listings</span>
        {consignmentCount > 0 && <span className={styles.badge}>{consignmentCount}</span>}
      </button>
    </div>
  );
};

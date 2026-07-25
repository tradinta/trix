'use client';

import React from 'react';
import styles from './StaffMetricsGrid.module.css';
import { Eye, CreditCard, TrendingUp, DollarSign } from 'lucide-react';

interface StaffMetricsGridProps {
  stats: {
    totalPageViews: number;
    totalEventViews: number;
    totalPaymentAttempts: number;
    paymentSuccessRate: number;
    totalRevenue: number;
  };
}

export const StaffMetricsGrid: React.FC<StaffMetricsGridProps> = ({ stats }) => {
  return (
    <div className={styles.grid}>
      {/* 1. Total Page Views */}
      <div className={styles.card}>
        <div className={styles.topRow}>
          <span className={styles.label}>Total Page Views</span>
          <div className={styles.iconBadge}>
            <Eye size={16} color="#e10600" />
          </div>
        </div>
        <div className={styles.value}>{stats.totalPageViews.toLocaleString()}</div>
        <div className={styles.trendRow}>
          <TrendingUp size={14} />
          <span>Active Website Visitors</span>
        </div>
      </div>

      {/* 2. Event Page Views */}
      <div className={styles.card}>
        <div className={styles.topRow}>
          <span className={styles.label}>Event Views</span>
          <div className={styles.iconBadge} style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
            <Eye size={16} color="#D4AF37" />
          </div>
        </div>
        <div className={styles.value}>{stats.totalEventViews.toLocaleString()}</div>
        <div className={styles.trendRow} style={{ color: '#D4AF37' }}>
          <span>Race Calendar Views</span>
        </div>
      </div>

      {/* 3. Payment Attempts */}
      <div className={styles.card}>
        <div className={styles.topRow}>
          <span className={styles.label}>Payment Attempts</span>
          <div className={styles.iconBadge} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
            <CreditCard size={16} color="#3b82f6" />
          </div>
        </div>
        <div className={styles.value}>{stats.totalPaymentAttempts}</div>
        <div className={styles.trendRow} style={{ color: '#3b82f6' }}>
          <span>Checkout Submissions</span>
        </div>
      </div>

      {/* 4. Total Volume / Revenue */}
      <div className={styles.card}>
        <div className={styles.topRow}>
          <span className={styles.label}>Total Sales Volume</span>
          <div className={styles.iconBadge} style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.2)' }}>
            <DollarSign size={16} color="#22c55e" />
          </div>
        </div>
        <div className={styles.value}>${stats.totalRevenue.toLocaleString()}</div>
        <div className={styles.trendRow}>
          <span>Verified Sales</span>
        </div>
      </div>
    </div>
  );
};

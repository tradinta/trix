'use client';

import React from 'react';
import styles from './Step3Success.module.css';
import Link from 'next/link';

interface Step3SuccessProps {
  payout: number;
}

export const Step3Success: React.FC<Step3SuccessProps> = ({ payout }) => {
  return (
    <div className={styles.container}>
      
      {/* Animated Checkmark Circle */}
      <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none" />
        <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>

      <h1 className={styles.title}>Listing Submitted.</h1>
      <p className={styles.subtitle}>
        Your tickets have been sent to our team for verification. Once approved, they will be live on the marketplace.
      </p>

      {/* Summary Card */}
      <div className={styles.summaryCard}>
        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Listing ID</span>
          <span className={styles.rowVal}>#SELL-992-FX</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Status</span>
          <span className={styles.statusPill}>Pending Review</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Expected Payout</span>
          <span className={styles.payoutVal}>${payout.toFixed(2)}</span>
        </div>
      </div>

      <Link href="/" className={styles.returnBtn}>
        Return to Marketplace
      </Link>
    </div>
  );
};

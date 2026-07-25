'use client';

import React from 'react';
import styles from './ConsignmentSidebar.module.css';
import { ShieldCheck } from 'lucide-react';

interface ConsignmentSidebarProps {
  currentStep: 1 | 2 | 3;
}

export const ConsignmentSidebar: React.FC<ConsignmentSidebarProps> = ({ currentStep }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.glowBg} />

      <div className={styles.topSection}>
        <h1 className={styles.title}>
          List.<br />Sell.<br />
          <span style={{ color: 'var(--f1-red)' }}>Get Paid.</span>
        </h1>
        <p className={styles.description}>
          Our premium consignment model ensures your tickets are sold to verified fans at maximum market value.
        </p>

        <div className={styles.stepsList}>
          {/* Step 1 */}
          <div className={`${styles.stepItem} ${currentStep === 1 ? styles.stepActive : styles.stepInactive}`}>
            <div className={styles.stepNum}>1</div>
            <div>
              <h3 className={styles.stepTitle}>Provide Details</h3>
              <p className={styles.stepDesc}>Tell us about your tickets, including the event, zone, and exact seats.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className={`${styles.stepItem} ${currentStep === 2 ? styles.stepActive : styles.stepInactive}`}>
            <div className={styles.stepNum}>2</div>
            <div>
              <h3 className={styles.stepTitle}>Set Price & Upload</h3>
              <p className={styles.stepDesc}>Set your asking price. We take a transparent 10% marketing fee. Upload your e-tickets securely.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`${styles.stepItem} ${currentStep === 3 ? styles.stepActive : styles.stepInactive}`}>
            <div className={styles.stepNum}>3</div>
            <div>
              <h3 className={styles.stepTitle}>We Sell, You Earn</h3>
              <p className={styles.stepDesc}>Your listing goes live to our global audience. Once a fan buys, we transfer your funds immediately.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Protection */}
      <div className={styles.protectionCard}>
        <div className={styles.protectionHeader}>
          <ShieldCheck size={18} color="#4ade80" />
          <span className={styles.protectionTitle}>Seller Protection</span>
        </div>
        <p className={styles.protectionText}>
          By acting as the intermediary, ApexTix ensures secure transfer of tickets and funds, protecting you from chargebacks and fraud.
        </p>
      </div>
    </div>
  );
};

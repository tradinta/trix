'use client';

import React from 'react';
import styles from './PassLocker.module.css';
import { DigitalTicketPass } from '@/types/f1';
import { X, Ticket } from 'lucide-react';

interface PassLockerProps {
  isOpen: boolean;
  onClose: () => void;
  passes: DigitalTicketPass[];
}

export const PassLocker: React.FC<PassLockerProps> = ({
  isOpen,
  onClose,
  passes,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        
        {/* Header */}
        <div className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Ticket size={18} color="#e10600" />
            <h3 className={styles.title}>Digital Pass Locker</h3>
          </div>

          <button onClick={onClose} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {passes.length === 0 ? (
            <div style={{ padding: '4rem 1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p>No passes currently issued</p>
            </div>
          ) : (
            <div className={styles.passGrid}>
              {passes.map((pass) => (
                <div key={pass.passId} className={styles.passCard}>
                  <div className={styles.passHeader}>
                    <div>
                      <h4 className={styles.eventName}>{pass.eventName}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{pass.circuitName}</p>
                    </div>
                    <span className={styles.passId}>{pass.passId}</span>
                  </div>

                  <div className={styles.metaGrid}>
                    <div>
                      <span className={styles.metaLabel}>Holder</span>
                      <p className={styles.metaVal}>{pass.holderName}</p>
                    </div>
                    <div>
                      <span className={styles.metaLabel}>Seating</span>
                      <p className={styles.metaVal}>{pass.grandstandName}</p>
                    </div>
                    <div>
                      <span className={styles.metaLabel}>Gate Entry</span>
                      <p className={styles.metaVal}>{pass.gateEntry}</p>
                    </div>
                    <div>
                      <span className={styles.metaLabel}>Pass Type</span>
                      <p className={styles.metaVal}>{pass.passType}</p>
                    </div>
                  </div>

                  {/* QR Turnstile Pass */}
                  <div className={styles.qrContainer}>
                    <svg viewBox="0 0 100 100" className={styles.qrSvg}>
                      <rect x="0" y="0" width="100" height="100" fill="white" />
                      <rect x="10" y="10" width="25" height="25" fill="black" />
                      <rect x="15" y="15" width="15" height="15" fill="white" />
                      <rect x="18" y="18" width="9" height="9" fill="black" />

                      <rect x="65" y="10" width="25" height="25" fill="black" />
                      <rect x="70" y="15" width="15" height="15" fill="white" />
                      <rect x="73" y="18" width="9" height="9" fill="black" />

                      <rect x="10" y="65" width="25" height="25" fill="black" />
                      <rect x="15" y="70" width="15" height="15" fill="white" />
                      <rect x="18" y="73" width="9" height="9" fill="black" />

                      <rect x="42" y="12" width="6" height="18" fill="black" />
                      <rect x="52" y="20" width="8" height="8" fill="black" />
                      <rect x="40" y="40" width="20" height="20" fill="black" />
                      <rect x="45" y="45" width="10" height="10" fill="white" />
                      <rect x="65" y="55" width="12" height="12" fill="black" />
                      <rect x="80" y="70" width="10" height="20" fill="black" />
                      <rect x="45" y="75" width="18" height="12" fill="black" />
                    </svg>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: '#0a0a0a', fontWeight: 700 }}>
                      TURNSTILE QR • VERIFIED
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

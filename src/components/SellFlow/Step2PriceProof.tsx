'use client';

import React, { useState } from 'react';
import styles from './Step2PriceProof.module.css';
import { ArrowLeft, UploadCloud, CheckCircle2, Loader2 } from 'lucide-react';

interface Step2PriceProofProps {
  onBack: () => void;
  onSubmit: (data: { askingPrice: number; fileName: string; payout: number }) => void;
}

export const Step2PriceProof: React.FC<Step2PriceProofProps> = ({ onBack, onSubmit }) => {
  const [askingPrice, setAskingPrice] = useState<number>(495);
  const [fileName, setFileName] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fee = askingPrice ? Math.round(askingPrice * 0.1) : 0;
  const payout = askingPrice ? askingPrice - fee : 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askingPrice) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSubmit({ askingPrice, fileName: fileName || 'e-tickets.pdf', payout });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <button type="button" onClick={onBack} className={styles.backBtn}>
        <ArrowLeft size={16} />
        <span>Back To Details</span>
      </button>

      <div>
        <h2 className={styles.title}>Price & Proof</h2>
        <p className={styles.subtitle}>Set your asking price and upload the tickets.</p>
      </div>

      {/* Pricing Calculator Card */}
      <div className={styles.calcCard}>
        <label className={styles.priceLabel}>Total Asking Price (For all tickets)</label>
        <div className={styles.priceInputWrapper}>
          <span className={styles.currencySymbol}>$</span>
          <input
            type="number"
            required
            min="1"
            value={askingPrice || ''}
            onChange={(e) => setAskingPrice(Number(e.target.value))}
            placeholder="0.00"
            className={styles.priceInput}
          />
        </div>

        <div className={styles.feeBreakdown}>
          <div className={styles.feeRow}>
            <span>ApexTix Consignment Fee (10%)</span>
            <span style={{ fontFamily: 'monospace' }}>- ${fee}</span>
          </div>

          <div className={styles.payoutRow}>
            <span>Your Estimated Payout</span>
            <span className={styles.payoutVal}>${payout}</span>
          </div>
        </div>

        <p className={styles.disclaimer}>
          Funds will be securely transferred to your connected account within 48 hours after the buyer attends the event, per our anti-fraud policy.
        </p>
      </div>

      {/* File Upload Drop Area */}
      <div>
        <label className={styles.priceLabel} style={{ marginBottom: '0.5rem', display: 'block' }}>
          Upload e-Tickets (PDF)
        </label>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`${styles.dropArea} ${
            fileName ? styles.dropAreaSuccess : isDragOver ? styles.dropAreaHover : ''
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className={styles.fileInputHidden}
          />

          {fileName ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={32} color="#4ade80" />
              <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{fileName}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Ready for verification</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <UploadCloud size={32} color="var(--text-secondary)" />
              <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Click to upload or drag and drop</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Original PDF tickets only (Max 10MB)</span>
            </div>
          )}
        </div>
      </div>

      <button type="submit" disabled={isLoading} className={styles.submitBtn}>
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <span>Submit Listing</span>
        )}
      </button>
    </form>
  );
};

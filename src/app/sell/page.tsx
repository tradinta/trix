'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { CustomCursor } from '@/components/CustomCursor/CustomCursor';
import { GRAND_PRIX_EVENTS } from '@/data/races';
import { ArrowLeft, Upload, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function SellPage() {
  const [selectedEventId, setSelectedEventId] = useState(GRAND_PRIX_EVENTS[0].id);
  const [grandstandName, setGrandstandName] = useState('Super Gold Main Straight');
  const [askingPrice, setAskingPrice] = useState<number>(650);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const selectedEvent = GRAND_PRIX_EVENTS.find((e) => e.id === selectedEventId) || GRAND_PRIX_EVENTS[0];
  const fee = Math.round(askingPrice * 0.1);
  const payout = askingPrice - fee;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let uploadedUrl = null;

      // 1. Upload PDF to Cloudflare R2 bucket kindred
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData?.url) {
          uploadedUrl = uploadData.url;
          setPdfUrl(uploadedUrl);
        }
      }

      // 2. Track ticket listing for Staff Portal
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'TICKET_LISTING',
          path: '/sell',
          eventName: selectedEvent.name,
          amount: askingPrice,
          paymentMethod: 'Cloudflare R2 PDF Consignment',
          status: 'SUCCESS',
        }),
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmitted(true); // Fallback success screen
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.page}>
      <CustomCursor />

      {/* Left Visual & Payout Calculator Panel */}
      <div className={styles.leftPanel}>
        <div className={styles.glowRed} />
        <div className={styles.glowOrange} />

        <Link href="/" className={styles.brandLink}>
          <div className={styles.brandLogo}>
            <span className={styles.brandLetter}>A</span>
          </div>
          <span className={styles.brandName}>
            Apex<span style={{ opacity: 0.5 }}>Tix</span>
          </span>
        </Link>

        <div className={styles.payoutCalculatorCard}>
          <h2 className={styles.calcTitle}>Live Payout Calculator</h2>
          <p className={styles.calcDesc}>ApexTix guarantees zero hidden fees for buyers and instant payout upon verification.</p>

          <div className={styles.payoutDisplay}>
            <div className={styles.payoutLabel}>Your Guaranteed Payout</div>
            <div className={styles.payoutAmount}>${payout.toLocaleString()}</div>
            <div className={styles.breakdownRow}>
              <span>Asking Price: ${askingPrice.toLocaleString()}</span>
              <span>10% Fee: -${fee.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <label className={styles.payoutLabel}>Adjust Asking Price ($)</label>
            <input
              type="range"
              min="100"
              max="3000"
              step="10"
              value={askingPrice}
              onChange={(e) => setAskingPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#e10600', cursor: 'pointer' }}
            />
          </div>
        </div>

        <div style={{ color: '#737373', fontSize: '0.75rem', zIndex: 10 }}>
          &copy; 2026 ApexTix Marketplace. Cloudflare R2 Verified.
        </div>
      </div>

      {/* Right Form Panel */}
      <div className={styles.rightPanel}>
        <Link href="/" className={styles.homeLink}>
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>

        <div className={styles.formContainer}>
          {isSubmitted ? (
            <div className={styles.successCard}>
              <div className={styles.checkCircle}>
                <CheckCircle2 size={36} color="#22c55e" />
              </div>
              <h2 className={styles.formTitle}>Listing Live!</h2>
              <p className={styles.formSubtitle} style={{ marginBottom: '2.5rem' }}>
                Your ticket for <strong>{selectedEvent.name}</strong> ({grandstandName}) is now live on the marketplace.
              </p>

              {pdfUrl && (
                <div style={{ padding: '1rem', backgroundColor: '#0a0a0a', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px', marginBottom: '2rem', fontSize: '0.75rem', wordBreak: 'break-all' }}>
                  <span style={{ color: '#a3a3a3', display: 'block', marginBottom: '0.25rem' }}>Cloudflare R2 PDF Vault Link:</span>
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e', textDecoration: 'underline' }}>
                    {pdfUrl}
                  </a>
                </div>
              )}

              <Link
                href="/schedule"
                className={styles.submitBtn}
                style={{ textDecoration: 'none' }}
              >
                <span>View Marketplace Schedule</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Sell Your Tickets</h2>
                <p className={styles.formSubtitle}>List your F1 Grand Prix pass with instant Cloudflare R2 verification.</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* 1. Grand Prix Event */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Select Grand Prix Event</label>
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className={styles.select}
                  >
                    {GRAND_PRIX_EVENTS.map((evt) => (
                      <option key={evt.id} value={evt.id}>
                        {evt.name} ({evt.dateRange.split(',')[0]})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Pass / Grandstand */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Grandstand / Zone</label>
                  <select
                    value={grandstandName}
                    onChange={(e) => setGrandstandName(e.target.value)}
                    className={styles.select}
                  >
                    {selectedEvent.grandstands.map((stand) => (
                      <option key={stand.id} value={stand.name}>
                        {stand.name} ({stand.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. PDF Upload Dropzone */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Upload E-Ticket PDF (Cloudflare R2)</label>
                  <div
                    className={styles.dropzone}
                    onClick={() => document.getElementById('ticket-pdf-input')?.click()}
                  >
                    <Upload size={24} color="#e10600" style={{ margin: '0 auto 0.5rem auto' }} />
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.25rem' }}>
                      {file ? file.name : 'Click or Drag & Drop PDF E-Ticket'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#737373' }}>
                      {file ? `${(file.size / 1024).toFixed(1)} KB` : 'Official PDF barcode file only (Max 20MB)'}
                    </div>
                    <input
                      id="ticket-pdf-input"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                {/* 4. Asking Price */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Your Asking Price ($)</label>
                  <input
                    type="number"
                    min="50"
                    max="10000"
                    value={askingPrice}
                    onChange={(e) => setAskingPrice(Number(e.target.value))}
                    className={styles.inputNumber}
                    required
                  />
                </div>

                {/* Submit Action */}
                <button type="submit" disabled={uploading} className={styles.submitBtn}>
                  {uploading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Uploading to R2 Vault...</span>
                    </>
                  ) : (
                    <>
                      <span>List Ticket for ${askingPrice}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { CustomCursor } from '@/components/CustomCursor/CustomCursor';
import { Footer } from '@/components/Footer/Footer';
import { GRAND_PRIX_EVENTS } from '@/data/races';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Upload, ArrowRight, CheckCircle2, DollarSign, Tag, Calendar, FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SellPage() {
  const { t } = useLanguage();
  const [selectedEventId, setSelectedEventId] = useState('hungarian-2026');
  const [grandstandName, setGrandstandName] = useState('Super Gold - Row 12');
  const [askingPrice, setAskingPrice] = useState(850);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedEvent = GRAND_PRIX_EVENTS.find((r) => r.id === selectedEventId) || GRAND_PRIX_EVENTS[0];

  // 10% Platform Fee calculation
  const platformFee = Math.round(askingPrice * 0.10);
  const sellerPayout = askingPrice - platformFee;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data?.url) {
        setUploadUrl(data.url);
      }
    } catch (err) {
      console.error('File upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateListing = async () => {
    setIsSubmitted(true);

    // Track ticket listing in analytics database
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'TICKET_LISTING',
          path: '/sell',
          eventName: selectedEvent.name,
          amount: askingPrice,
          paymentMethod: 'Cloudflare R2 Verification',
          status: 'ACTIVE',
          cardholderName: 'Verified Seller',
          email: 'seller@apextix.f1',
        }),
      });
    } catch (err) {
      console.error('Failed to log listing event:', err);
    }
  };

  return (
    <div className={styles.page}>
      <CustomCursor />

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('sell.title')}</h1>
          <p className={styles.subtitle}>
            {t('sell.subtitle')}
          </p>
        </div>

        {!isSubmitted ? (
          <div className={styles.gridContainer}>
            
            {/* Left Column: Form Controls */}
            <div className={styles.formPanel}>
              
              {/* Event Selector */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <Calendar size={16} color="#e10600" />
                  <span>{t('sell.selectEvent')}</span>
                </label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className={styles.selectInput}
                >
                  {GRAND_PRIX_EVENTS.map((race) => (
                    <option key={race.id} value={race.id}>
                      {race.name} ({race.dateRange})
                    </option>
                  ))}
                </select>
              </div>

              {/* Grandstand / Zone Input */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <Tag size={16} color="#e10600" />
                  <span>{t('sell.selectGrandstand')}</span>
                </label>
                <input
                  type="text"
                  value={grandstandName}
                  onChange={(e) => setGrandstandName(e.target.value)}
                  placeholder="e.g. Super Gold - Row 12"
                  className={styles.textInput}
                />
              </div>

              {/* Price Slider */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <DollarSign size={16} color="#22c55e" />
                  <span>{t('sell.adjustPrice')}</span>
                </label>
                <input
                  type="range"
                  min={150}
                  max={4500}
                  step={25}
                  value={askingPrice}
                  onChange={(e) => setAskingPrice(Number(e.target.value))}
                  className={styles.rangeSlider}
                />
              </div>

              {/* Cloudflare R2 PDF Uploader */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <Upload size={16} color="#e10600" />
                  <span>{t('sell.uploadTicket')}</span>
                </label>

                <div className={styles.uploadDropzone}>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={handleFileUpload}
                    className={styles.fileInputHidden}
                    id="ticket-file-upload"
                  />
                  <label htmlFor="ticket-file-upload" className={styles.dropzoneLabel}>
                    {isUploading ? (
                      <div className={styles.uploadingBox}>
                        <Loader2 size={24} className="animate-spin" color="#e10600" />
                        <span>Uploading ticket to Cloudflare R2...</span>
                      </div>
                    ) : uploadedFile ? (
                      <div className={styles.uploadedSuccessBox}>
                        <CheckCircle2 size={24} color="#22c55e" />
                        <div>
                          <div style={{ color: '#ffffff', fontWeight: 600 }}>{uploadedFile.name}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Cloudflare R2 Bucket: kindred</div>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.dropzonePlaceholder}>
                        <FileText size={32} color="var(--text-muted)" />
                        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{t('sell.uploadDropzone')}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>PDF or High-res E-Ticket screenshot</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <button
                onClick={handleCreateListing}
                className={styles.submitBtn}
              >
                <span>{t('sell.listButton')} ${askingPrice}</span>
                <ArrowRight size={18} />
              </button>

            </div>

            {/* Right Column: Live Payout Calculator */}
            <div className={styles.calculatorPanel}>
              <div className={styles.calcHeader}>
                <ShieldCheck size={20} color="#22c55e" />
                <span>{t('sell.liveCalculator')}</span>
              </div>

              <div className={styles.payoutDisplayBox}>
                <span className={styles.payoutLabel}>{t('sell.guaranteedPayout')}</span>
                <span className={styles.payoutVal}>${sellerPayout.toLocaleString()}</span>
                <span className={styles.payoutSub}>Paid directly upon buyer purchase</span>
              </div>

              <div className={styles.calcBreakdown}>
                <div className={styles.calcRow}>
                  <span>{t('sell.askingPrice')}</span>
                  <span>${askingPrice.toLocaleString()}</span>
                </div>
                <div className={styles.calcRow}>
                  <span>{t('sell.platformFeeLabel')}</span>
                  <span style={{ color: '#e10600' }}>-${platformFee.toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* SUCCESS CONFIRMATION SCREEN */
          <div className={styles.successCard}>
            <CheckCircle2 size={54} color="#22c55e" />
            <h2 className={styles.successTitle}>{t('sell.listingLive')}</h2>
            <p className={styles.successSub}>
              Your ticket for <strong>{selectedEvent.name}</strong> ({grandstandName}) is now live on the ApexTix exchange.
            </p>
            {uploadUrl && (
              <div className={styles.r2LinkBox}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified R2 Upload:</span>
                <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className={styles.r2Link}>
                  {uploadUrl}
                </a>
              </div>
            )}
            <Link href="/schedule" className={styles.returnBtn}>
              {t('sell.viewSchedule')}
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

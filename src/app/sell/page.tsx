'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { CustomCursor } from '@/components/CustomCursor/CustomCursor';
import { Footer } from '@/components/Footer/Footer';
import { GRAND_PRIX_EVENTS } from '@/data/races';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Upload, ArrowRight, CheckCircle2, DollarSign, Tag, Calendar, FileText, Loader2, Phone, Mail, User, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function SellPage() {
  const { t } = useLanguage();
  const [selectedEventId, setSelectedEventId] = useState('hungarian-2026');
  const [grandstandName, setGrandstandName] = useState('Super Gold - Row 12');
  const [askingPrice, setAskingPrice] = useState(850);
  
  // Seller Contact Info
  const [sellerName, setSellerName] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerPhone, setSellerPhone] = useState('+36 ');
  const [isHungarianResident, setIsHungarianResident] = useState(true);

  // Cloudflare R2 Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const selectedEvent = GRAND_PRIX_EVENTS.find((r) => r.id === selectedEventId) || GRAND_PRIX_EVENTS[0];

  // 10% Platform Fee calculation
  const platformFee = Math.round(askingPrice * 0.10);
  const sellerPayout = askingPrice - platformFee;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsUploading(true);
    setFormError(null);

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

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!isHungarianResident) {
      setFormError('Sellers must be a resident of Hungary to list tickets on ApexTix.');
      return;
    }

    if (!uploadedFile && !uploadUrl) {
      setFormError('Please upload your E-Ticket PDF file before submitting.');
      return;
    }

    if (!sellerName || !sellerEmail || !sellerPhone) {
      setFormError('Please enter your full contact details (Name, Email, and Hungarian Phone Number).');
      return;
    }

    setIsSubmitting(true);

    // Track ticket listing in database
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
          status: 'PENDING_VERIFICATION_CALL',
          cardholderName: sellerName,
          email: sellerEmail,
        }),
      });
    } catch (err) {
      console.error('Failed to log listing event:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className={styles.page}>
      <CustomCursor />

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('sell.title')}</h1>
          <p className={styles.subtitle}>
            List your F1 Grand Prix pass with instant Cloudflare R2 file verification.
          </p>
        </div>

        {/* Hungary Residency Notice Banner */}
        <div className={styles.residencyBanner}>
          <span className={styles.residencyFlag}>🇭🇺</span>
          <div>
            <div className={styles.residencyTitle}>Hungary Residency Required</div>
            <div className={styles.residencyDesc}>
              To protect buyers and ensure instant payout authorization, ticket sellers must be a resident of Hungary. Our verification team will contact you directly via phone.
            </div>
          </div>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleCreateListing} className={styles.gridContainer}>
            
            {/* Left Column: Form Controls */}
            <div className={styles.formPanel}>
              
              {/* 1. Grand Prix Event Selection */}
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

              {/* 2. Grandstand / Zone Input */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <Tag size={16} color="#e10600" />
                  <span>{t('sell.selectGrandstand')}</span>
                </label>
                <input
                  type="text"
                  required
                  value={grandstandName}
                  onChange={(e) => setGrandstandName(e.target.value)}
                  placeholder="e.g. Super Gold - Row 12"
                  className={styles.textInput}
                />
              </div>

              {/* 3. Price Slider */}
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

              {/* 4. Seller Contact Information */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className={styles.sectionHeading}>
                  <User size={16} />
                  <span>Seller Contact Information (Hungary)</span>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <User size={14} color="#e10600" />
                    <span>Full Legal Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="Kovács Péter"
                    className={styles.textInput}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Mail size={14} color="#e10600" />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={sellerEmail}
                      onChange={(e) => setSellerEmail(e.target.value)}
                      placeholder="peter@example.hu"
                      className={styles.textInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Phone size={14} color="#e10600" />
                      <span>Hungarian Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={sellerPhone}
                      onChange={(e) => setSellerPhone(e.target.value)}
                      placeholder="+36 30 123 4567"
                      className={styles.textInput}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <input
                    type="checkbox"
                    id="hungary-residency-check"
                    checked={isHungarianResident}
                    onChange={(e) => setIsHungarianResident(e.target.checked)}
                    style={{ accentColor: '#e10600', width: '1rem', height: '1rem', cursor: 'pointer' }}
                  />
                  <label htmlFor="hungary-residency-check" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    I confirm that I am a permanent resident of Hungary.
                  </label>
                </div>
              </div>

              {/* 5. Cloudflare R2 PDF Uploader */}
              <div className={styles.formGroup} style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
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

              {formError && (
                <div style={{ padding: '0.875rem 1rem', backgroundColor: 'rgba(225, 6, 0, 0.15)', border: '1px solid #e10600', color: '#ffffff', borderRadius: '2px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={16} color="#e10600" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className={styles.submitBtn}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting Listing...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Ticket Listing for ${askingPrice}</span>
                    <ArrowRight size={18} />
                  </>
                )}
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

          </form>
        ) : (
          /* SUCCESS CONFIRMATION SCREEN */
          <div className={styles.successCard}>
            <CheckCircle2 size={54} color="#22c55e" />
            <h2 className={styles.successTitle}>Listing Submitted!</h2>
            <p className={styles.successSub}>
              Thank you <strong>{sellerName}</strong>. Your ticket for <strong>{selectedEvent.name}</strong> ({grandstandName}) has been received and stored in Cloudflare R2.
            </p>

            <div className={styles.callNoticeBox}>
              <Phone size={24} color="#D4AF37" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Immediate Verification Call Required</strong>
                Our Hungarian verification agent will call you immediately at <strong>{sellerPhone}</strong> to verify your residence in Hungary and activate your ticket listing.
              </div>
            </div>

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

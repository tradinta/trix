'use client';

import React, { useState, useEffect } from 'react';
import styles from './TicketExchangeOverlay.module.css';
import { GrandPrixEvent, GrandstandOption } from '@/types/f1';
import { EventLeftPanel } from './EventLeftPanel';
import { ExchangeRightPanel } from './ExchangeRightPanel';
import { SellTicketModal } from './SellTicketModal';
import { X } from 'lucide-react';

interface TicketExchangeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  event: GrandPrixEvent | null;
  onBuyNow: (event: GrandPrixEvent, stand: GrandstandOption) => void;
  onAddToCart: (event: GrandPrixEvent, stand: GrandstandOption) => void;
}

export const TicketExchangeOverlay: React.FC<TicketExchangeOverlayProps> = ({
  isOpen,
  onClose,
  event,
  onBuyNow,
  onAddToCart,
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeEvent, setActiveEvent] = useState<GrandPrixEvent | null>(event);
  const [isAnimateTrack, setIsAnimateTrack] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedSellStand, setSelectedSellStand] = useState<GrandstandOption | null>(null);

  useEffect(() => {
    if (event) {
      setActiveEvent(event);
    }
  }, [event]);

  useEffect(() => {
    if (isOpen && activeEvent) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
      
      // Double frame requestAnimationFrame to ensure browser paints translateX(100%) before sliding to translateX(0)
      const frame1 = requestAnimationFrame(() => {
        const frame2 = requestAnimationFrame(() => {
          setVisible(true);
          setTimeout(() => setIsAnimateTrack(true), 400);
        });
        return () => cancelAnimationFrame(frame2);
      });

      return () => cancelAnimationFrame(frame1);
    } else {
      setVisible(false);
      setIsAnimateTrack(false);
      document.body.style.overflow = '';

      // Unmount after slide-out transition completes (800ms)
      const timer = setTimeout(() => {
        setMounted(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isOpen, activeEvent]);

  if (!mounted || !activeEvent) return null;

  const handleOpenSell = (stand?: GrandstandOption | null) => {
    setSelectedSellStand(stand || null);
    setIsSellModalOpen(true);
  };

  return (
    <>
      <div className={`${styles.overlay} ${visible ? styles.overlayOpen : ''}`}>
        
        {/* Mobile Close Trigger */}
        <button onClick={onClose} className={styles.mobileCloseBtn} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Left Panel */}
        <EventLeftPanel
          event={activeEvent}
          onClose={onClose}
          isAnimateTrack={isAnimateTrack}
        />

        {/* Right Panel */}
        <ExchangeRightPanel
          event={activeEvent}
          onBuyNow={(stand) => onBuyNow(activeEvent, stand)}
          onAddToCart={(stand) => onAddToCart(activeEvent, stand)}
          onOpenSellModal={handleOpenSell}
        />

      </div>

      {/* Sell Ticket Resale Modal */}
      <SellTicketModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        event={activeEvent}
        initialStand={selectedSellStand}
      />
    </>
  );
};

'use client';

import React from 'react';
import styles from './TicketListingRow.module.css';
import { GrandstandOption } from '@/types/f1';
import { ShoppingBag } from 'lucide-react';

interface TicketListingRowProps {
  stand: GrandstandOption;
  onBuyNow: (stand: GrandstandOption) => void;
  onAddToCart: (stand: GrandstandOption) => void;
  onOpenSellModal: (stand: GrandstandOption) => void;
}

export const TicketListingRow: React.FC<TicketListingRowProps> = ({
  stand,
  onBuyNow,
  onAddToCart,
  onOpenSellModal,
}) => {
  const isVip = stand.category === 'VIP';
  const isGrandstand = stand.category === 'Grandstand';

  return (
    <div className={isVip ? styles.rowVip : styles.rowStandard}>
      
      {/* Left Info */}
      <div className={styles.leftInfo}>
        <span className={isVip ? styles.tagVip : isGrandstand ? styles.tagRed : styles.tagGray}>
          {isVip ? 'VIP Hospitality' : isGrandstand ? 'Premium Grandstand' : 'Standard Access'}
        </span>
        <h4 className={styles.title}>{stand.name}</h4>
        <p className={styles.subText}>{stand.description}</p>
      </div>

      {/* Right Actions */}
      <div className={styles.rightActions}>
        <div className={styles.priceBlock}>
          <span className={styles.priceVal}>${stand.priceWeekend}</span>
          <span className={styles.availVal}>{stand.availableSeats} passes available</span>
        </div>

        <div className={styles.btnGroup}>
          <button
            onClick={() => onOpenSellModal(stand)}
            className={styles.sellBtn}
          >
            Sell
          </button>

          <button
            onClick={() => onAddToCart(stand)}
            className={styles.bagBtn}
            title="Add to Bag"
          >
            <ShoppingBag size={16} />
          </button>

          <button
            onClick={() => onBuyNow(stand)}
            className={isVip ? styles.buyNowBtnVip : styles.buyNowBtnRed}
          >
            Buy Now
          </button>
        </div>
      </div>

    </div>
  );
};

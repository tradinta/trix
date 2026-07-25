'use client';

import React from 'react';
import styles from './CartDrawer.module.css';
import { CartItem } from '@/types/f1';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <ShoppingBag size={20} color="#e10600" />
            <h3 className={styles.title}>Your Ticket Bag</h3>
          </div>

          <button onClick={onClose} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <ShoppingBag size={48} opacity={0.3} />
              <p>Your bag is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemHeader}>
                  <div>
                    <span className={styles.eventName}>{item.eventName}</span>
                    <h4 className={styles.standName}>{item.grandstandName}</h4>
                    <p className={styles.passType}>{item.passType}</p>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className={styles.removeBtn}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className={styles.itemFooter}>
                  <div className={styles.qtyControls}>
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className={styles.qtyBtn}
                    >
                      -
                    </button>
                    <span className={styles.qtyVal}>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>

                  <span className={styles.price}>${item.totalPrice}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Digital E-Pass</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>FREE</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated Tax (8%)</span>
              <span>${tax}</span>
            </div>

            <div className={styles.totalRow}>
              <span>Total</span>
              <span style={{ color: '#e10600', fontFamily: 'monospace' }}>${total}</span>
            </div>

            <button onClick={onProceedToCheckout} className={styles.checkoutBtn}>
              <span>Proceed To Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

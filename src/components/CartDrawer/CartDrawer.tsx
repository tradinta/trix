'use client';

import React from 'react';
import styles from './CartDrawer.module.css';
import { CartItem } from '@/types/f1';
import { useLanguage } from '@/context/LanguageContext';
import { X, Trash2, Plus, Minus, Lock, ShoppingBag } from 'lucide-react';

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
  const { t } = useLanguage();
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, i) => acc + i.totalPrice, 0);

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.drawer}>
        
        {/* Drawer Header */}
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <ShoppingBag size={20} color="#e10600" />
            <h2 className={styles.title}>{t('cart.title')}</h2>
            <span className={styles.itemCount}>({items.length})</span>
          </div>

          <button onClick={onClose} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <ShoppingBag size={48} color="var(--text-muted)" />
              <h3 className={styles.emptyTitle}>{t('cart.emptyTitle')}</h3>
              <p className={styles.emptySub}>{t('cart.emptySub')}</p>
            </div>
          ) : (
            <div className={styles.itemList}>
              {items.map((item) => (
                <div key={item.id} className={styles.cartCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h4 className={styles.eventName}>{item.eventName}</h4>
                      <div className={styles.tierName}>{item.grandstandName}</div>
                      <div className={styles.passType}>{item.passType}</div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className={styles.removeBtn}
                      title={t('cart.removeBtn')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.qtyBox}>
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className={styles.qtyBtn}
                      >
                        <Minus size={14} />
                      </button>
                      <span className={styles.qtyVal}>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className={styles.qtyBtn}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className={styles.priceVal}>
                      ${item.totalPrice.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span>{t('checkout.subtotal')}</span>
              <span className={styles.subtotalVal}>${subtotal.toLocaleString()}</span>
            </div>

            <button onClick={onProceedToCheckout} className={styles.checkoutBtn}>
              <Lock size={16} />
              <span>{t('cart.checkoutBtn')}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

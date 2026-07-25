'use client';

import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar/Navbar';
import { CartDrawer } from '@/components/CartDrawer/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal/CheckoutModal';
import { PassLocker } from '@/components/PassLocker/PassLocker';

const GlobalOverlays: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeItem,
    setIsCheckoutOpen,
    isCheckoutOpen,
    addDigitalPasses,
    isPassLockerOpen,
    setIsPassLockerOpen,
    digitalPasses,
  } = useApp();

  return (
    <>
      <Navbar />
      
      {/* Page Content */}
      <div style={{ paddingTop: '5rem' }}>
        {children}
      </div>

      {/* Global Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Global Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderComplete={(newPasses) => {
          addDigitalPasses(newPasses);
          setIsCheckoutOpen(false);
          setIsPassLockerOpen(true);
        }}
      />

      {/* Global Digital Ticket Pass Locker */}
      <PassLocker
        isOpen={isPassLockerOpen}
        onClose={() => setIsPassLockerOpen(false)}
        passes={digitalPasses}
      />
    </>
  );
};

export const GlobalShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <GlobalOverlays>{children}</GlobalOverlays>
    </AppProvider>
  );
};

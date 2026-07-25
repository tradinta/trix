'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { GrandPrixEvent, GrandstandOption, CartItem, DigitalTicketPass } from '@/types/f1';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  cartItems: CartItem[];
  addToCart: (
    event: GrandPrixEvent,
    grandstand: GrandstandOption,
    passType?: 'Weekend (3-Day)' | 'Sunday Race Day' | 'Friday-Saturday Pass',
    quantity?: number
  ) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isPassLockerOpen: boolean;
  setIsPassLockerOpen: (open: boolean) => void;
  digitalPasses: DigitalTicketPass[];
  addDigitalPasses: (passes: DigitalTicketPass[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPassLockerOpen, setIsPassLockerOpen] = useState(false);

  const [digitalPasses, setDigitalPasses] = useState<DigitalTicketPass[]>([
    {
      passId: 'PASS-884920',
      orderNumber: 'APEX-2026-9041',
      eventName: 'Hungarian Grand Prix',
      circuitName: 'Hungaroring',
      location: 'Budapest, Hungary',
      raceDate: 'Jul 26, 2026',
      grandstandName: 'Super Gold - Row 12',
      passType: 'Weekend (3-Day)',
      quantity: 2,
      gateEntry: 'Gate A • Main Portal',
      sector: 'Block 102 • Row 12',
      qrCodeData: 'https://apextix.f1/pass/hungary-sample',
      purchaseDate: 'Jul 24, 2026',
      holderName: 'Alex Vance',
    },
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addToCart = (
    event: GrandPrixEvent,
    grandstand: GrandstandOption,
    passType: 'Weekend (3-Day)' | 'Sunday Race Day' | 'Friday-Saturday Pass' = 'Weekend (3-Day)',
    quantity: number = 1
  ) => {
    const unitPrice =
      passType === 'Weekend (3-Day)'
        ? grandstand.priceWeekend
        : passType === 'Sunday Race Day'
        ? grandstand.pricePerDay
        : Math.round(grandstand.pricePerDay * 0.7);

    const newItem: CartItem = {
      id: `${event.id}-${grandstand.id}-${passType}-${Date.now()}`,
      eventId: event.id,
      eventName: event.name,
      eventLocation: event.location,
      raceDate: event.dateRange,
      grandstandId: grandstand.id,
      grandstandName: grandstand.name,
      passType,
      quantity,
      unitPrice,
      totalPrice: unitPrice * quantity,
    };

    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const addDigitalPasses = (newPasses: DigitalTicketPass[]) => {
    setDigitalPasses((prev) => [...newPasses, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isPassLockerOpen,
        setIsPassLockerOpen,
        digitalPasses,
        addDigitalPasses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

'use client';

import React from 'react';
import { CartItem } from '@/types/f1';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';

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
  const tax = Math.round(subtotal * 0.08); // 8% estimated tax
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-zinc-950 border-l border-white/10 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-5 h-5 text-[#E10600]" />
            <h3 className="text-lg font-bold text-white uppercase italic">Your Ticket Bag</h3>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {items.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 text-zinc-500">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10">
                <Ticket className="w-8 h-8 text-zinc-600" />
              </div>
              <div>
                <p className="text-base font-bold text-zinc-300">Your bag is empty</p>
                <p className="text-xs text-zinc-500 mt-1 font-mono">Select a Grand Prix race to reserve passes</p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-3 relative group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#E10600] uppercase block">
                      {item.eventName}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{item.grandstandName}</h4>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">{item.passType}</p>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Controls & Price */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center border border-white/10 rounded-md bg-black/40 overflow-hidden text-xs">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-2.5 py-1 text-zinc-400 hover:bg-zinc-800 font-mono"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-bold font-mono text-white">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-2.5 py-1 text-zinc-400 hover:bg-zinc-800 font-mono"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-base font-bold font-mono text-white">
                    ${item.totalPrice}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-6 bg-zinc-900 border-t border-white/10 space-y-4">
            
            <div className="space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Digital E-Pass Fee</span>
                <span className="text-emerald-400 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="text-white">${tax}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>Total Amount</span>
                <span className="text-[#E10600] font-mono">${total}</span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 rounded-xl bg-[#E10600] hover:bg-[#FF1801] text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg shadow-red-950/50 transition-all hover:scale-[1.02]"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] font-mono text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official F1 Circuit Guaranteed Entry</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

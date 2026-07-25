'use client';

import React, { useState } from 'react';
import { CartItem, DigitalTicketPass } from '@/types/f1';
import { X, CreditCard, ShieldCheck, CheckCircle2, Loader2, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (newPasses: DigitalTicketPass[]) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'details' | 'processing' | 'confirmed'>('details');
  const [name, setName] = useState('Alex Vance');
  const [email, setEmail] = useState('alex.vance@example.com');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      // Create digital passes
      const generatedPasses: DigitalTicketPass[] = items.map((item, idx) => ({
        passId: `PASS-${Math.floor(100000 + Math.random() * 900000)}`,
        orderNumber: `PED-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        eventName: item.eventName,
        circuitName: item.eventLocation,
        location: item.eventLocation,
        raceDate: item.raceDate,
        grandstandName: item.grandstandName,
        passType: item.passType,
        quantity: item.quantity,
        gateEntry: `Gate ${['A', 'B', 'C', 'V'][idx % 4]} • Turn 1 Main Portal`,
        sector: `Block ${['101', '204', '305'][idx % 3]} • Row ${Math.floor(1 + Math.random() * 20)}`,
        qrCodeData: `https://pedestal.f1/pass/${item.id}-${Date.now()}`,
        purchaseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        holderName: name || 'Valued Spectator',
      }));

      setStep('confirmed');
      onOrderComplete(generatedPasses);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E10600', '#FFFFFF', '#3F3F46'],
        });
      } catch (err) {
        console.log('Confetti triggered');
      }
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-[#E10600]" />
            <h3 className="text-base font-bold text-white uppercase italic">Secure Checkout Desk</h3>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step: Details & Payment */}
        {step === 'details' && (
          <form onSubmit={handlePay} className="p-6 space-y-5">
            
            {/* Contact Details */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-zinc-400 block">1. Guest Details</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 block mb-1">Full Name</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-[#E10600]"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 block mb-1">Email Address</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-[#E10600]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-zinc-400 block">2. Payment Simulation</label>
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-[#E10600]" />
                    <span>Card Payment</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    256-Bit SSL Encrypted
                  </span>
                </div>
                
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 block mb-1">Card Number</span>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 font-mono focus:outline-none focus:border-[#E10600]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 block mb-1">Expiry Date</span>
                    <input
                      type="text"
                      defaultValue="08 / 28"
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 block mb-1">CVC</span>
                    <input
                      type="text"
                      defaultValue="888"
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Total breakdown */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Total Due</span>
                <span className="text-xl font-bold font-mono text-white">${total}</span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#E10600] hover:bg-[#FF1801] text-white font-bold text-sm tracking-wider uppercase flex items-center space-x-2 shadow-lg shadow-red-950/50 transition-all hover:scale-105"
              >
                <span>Confirm & Pay</span>
              </button>
            </div>

          </form>
        )}

        {/* Step: Processing */}
        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center space-y-4 text-center">
            <Loader2 className="w-10 h-10 text-[#E10600] animate-spin" />
            <h4 className="text-lg font-bold text-white uppercase italic">Processing Official Order...</h4>
            <p className="text-xs font-mono text-zinc-400">Communicating with Circuit Ticket Vault</p>
          </div>
        )}

        {/* Step: Confirmed */}
        {step === 'confirmed' && (
          <div className="p-8 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-extrabold text-white uppercase italic">
                Reservation Confirmed!
              </h4>
              <p className="text-sm text-zinc-300 font-light max-w-md">
                Your official Grand Prix tickets have been issued and saved to your Digital Pass Locker.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-xl bg-[#E10600] hover:bg-[#FF1801] text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-red-950/50 transition-all"
            >
              View My Passes
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

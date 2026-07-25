'use client';

import React, { useState } from 'react';
import { GrandPrixEvent, GrandstandOption, CircuitZoneId } from '@/types/f1';
import { CircuitMap } from './CircuitMap';
import { X, Check, ShieldCheck, Ticket, Users, Sparkles, ChevronRight } from 'lucide-react';

interface TicketModalProps {
  event: GrandPrixEvent | null;
  onClose: () => void;
  onAddToCart: (
    event: GrandPrixEvent,
    grandstand: GrandstandOption,
    passType: 'Weekend (3-Day)' | 'Sunday Race Day' | 'Friday-Saturday Pass',
    quantity: number
  ) => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  event,
  onClose,
  onAddToCart,
}) => {
  const [selectedZone, setSelectedZone] = useState<CircuitZoneId | 'all'>('all');
  const [selectedGrandstand, setSelectedGrandstand] = useState<GrandstandOption | null>(
    event?.grandstands[0] || null
  );
  const [passType, setPassType] = useState<
    'Weekend (3-Day)' | 'Sunday Race Day' | 'Friday-Saturday Pass'
  >('Weekend (3-Day)');
  const [quantity, setQuantity] = useState<number>(2);

  if (!event) return null;

  // Filter grandstands by selected zone
  const filteredGrandstands = selectedZone === 'all'
    ? event.grandstands
    : event.grandstands.filter((g) => g.zoneId === selectedZone);

  const activeGrandstand = selectedGrandstand || filteredGrandstands[0] || event.grandstands[0];

  // Price calculation
  const unitPrice = passType === 'Weekend (3-Day)'
    ? activeGrandstand.priceWeekend
    : passType === 'Sunday Race Day'
    ? activeGrandstand.pricePerDay
    : Math.round(activeGrandstand.pricePerDay * 0.7);

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    if (!activeGrandstand) return;
    onAddToCart(event, activeGrandstand, passType, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#E10600] flex items-center justify-center font-bold text-white">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white uppercase italic">
                {event.name} Ticket Desk
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                {event.dateRange} • {event.location}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Interactive Track Map Component */}
          <CircuitMap
            event={event}
            selectedZone={selectedZone}
            onSelectZone={(zone) => {
              setSelectedZone(zone);
              const matching = event.grandstands.find(
                (g) => zone === 'all' || g.zoneId === zone
              );
              if (matching) setSelectedGrandstand(matching);
            }}
          />

          {/* Pass Type Selector Tabs */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
              1. Select Pass Duration
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(
                [
                  { type: 'Weekend (3-Day)', desc: 'Fri FP1 + Sat Quali + Sun Race Day' },
                  { type: 'Sunday Race Day', desc: 'Main Grand Prix Race Day Pass' },
                  { type: 'Friday-Saturday Pass', desc: 'Practice & Qualifying Pass' },
                ] as const
              ).map((item) => (
                <button
                  key={item.type}
                  onClick={() => setPassType(item.type)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    passType === item.type
                      ? 'bg-red-950/40 border-[#E10600] text-white shadow-lg shadow-red-950/30'
                      : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white font-mono">{item.type}</span>
                    {passType === item.type && (
                      <span className="w-2 h-2 rounded-full bg-[#E10600]" />
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 font-sans">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Grandstand / Seating Area Selection */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
              2. Select Grandstand or VIP Lounge
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGrandstands.map((stand) => {
                const isSelected = activeGrandstand.id === stand.id;
                const price = passType === 'Weekend (3-Day)' ? stand.priceWeekend : stand.pricePerDay;

                return (
                  <div
                    key={stand.id}
                    onClick={() => setSelectedGrandstand(stand)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all space-y-3 ${
                      isSelected
                        ? 'bg-zinc-900 border-[#E10600] ring-1 ring-[#E10600]'
                        : 'bg-zinc-900/50 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span
                          className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            stand.category === 'VIP'
                              ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                              : stand.category === 'Grandstand'
                              ? 'bg-red-950 text-red-400 border border-red-500/30'
                              : 'bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          {stand.category}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1.5">{stand.name}</h4>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-bold font-mono text-white">${price}</span>
                        <span className="text-[10px] text-zinc-500 block">/ pass</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      {stand.description}
                    </p>

                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {stand.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-black/40 text-[10px] font-mono text-zinc-300 border border-white/5 flex items-center space-x-1"
                        >
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ticket Quantity & Summary Footer */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Quantity selector */}
            <div className="flex items-center space-x-4">
              <label className="text-xs font-mono uppercase text-zinc-400 flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#E10600]" />
                <span>Passes:</span>
              </label>
              
              <div className="flex items-center border border-white/15 rounded-lg bg-black/50 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-zinc-300 hover:bg-zinc-800 font-bold font-mono text-sm"
                >
                  -
                </button>
                <span className="px-4 py-1.5 font-bold font-mono text-white text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(8, quantity + 1))}
                  className="px-3 py-1.5 text-zinc-300 hover:bg-zinc-800 font-bold font-mono text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price & Add Button */}
            <div className="flex items-center space-x-6 justify-between sm:justify-end">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase">Total Amount</span>
                <span className="text-2xl font-extrabold font-mono text-white">${totalPrice}</span>
              </div>

              <button
                onClick={handleAdd}
                className="px-6 py-3 rounded-xl bg-[#E10600] hover:bg-[#FF1801] text-white font-bold text-sm tracking-wider uppercase flex items-center space-x-2 shadow-lg shadow-red-950/50 transition-all hover:scale-105"
              >
                <span>Add To Bag</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

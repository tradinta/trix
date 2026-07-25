'use client';

import React, { useState } from 'react';
import { DigitalTicketPass } from '@/types/f1';
import { Ticket, QrCode, X, Calendar, MapPin, ShieldCheck, Download, Share2, Sparkles } from 'lucide-react';

interface DigitalPassLockerProps {
  isOpen: boolean;
  onClose: () => void;
  passes: DigitalTicketPass[];
}

export const DigitalPassLocker: React.FC<DigitalPassLockerProps> = ({
  isOpen,
  onClose,
  passes,
}) => {
  const [selectedPass, setSelectedPass] = useState<DigitalTicketPass | null>(passes[0] || null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white uppercase italic">
                Digital Pass Locker
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                {passes.length} Verified Circuit Pass{passes.length === 1 ? '' : 'es'}
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {passes.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 text-zinc-500">
              <Ticket className="w-12 h-12 text-zinc-600" />
              <div>
                <p className="text-base font-bold text-zinc-300">No Passes Issued Yet</p>
                <p className="text-xs text-zinc-500 mt-1 font-mono">
                  Reserve tickets from the Grand Prix calendar to view your mobile passes here.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Pass List Sidebar */}
              <div className="md:col-span-5 space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                  Select Issued Pass
                </label>
                
                <div className="space-y-3">
                  {passes.map((pass) => {
                    const isSelected = selectedPass?.passId === pass.passId;
                    return (
                      <div
                        key={pass.passId}
                        onClick={() => setSelectedPass(pass)}
                        className={`cursor-pointer p-4 rounded-xl border transition-all space-y-2 ${
                          isSelected
                            ? 'bg-zinc-900 border-[#E10600] ring-1 ring-[#E10600]'
                            : 'bg-zinc-900/40 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#E10600] uppercase font-bold">
                            {pass.eventName}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {pass.passId}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{pass.grandstandName}</h4>
                        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono pt-1 border-t border-white/5">
                          <span>{pass.passType}</span>
                          <span className="text-white font-bold">Qty: {pass.quantity}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Metallic Holographic Ticket Pass Card */}
              {selectedPass && (
                <div className="md:col-span-7 space-y-4">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                    Mobile Turnstile QR Pass
                  </label>

                  <div className="holographic-pass p-6 rounded-2xl border border-white/15 shadow-2xl space-y-6">
                    
                    {/* Top Branding & Pass ID */}
                    <div className="flex items-start justify-between border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                          OFFICIAL F1 ADMISSION PASS
                        </span>
                        <h3 className="text-xl font-extrabold text-white uppercase italic mt-0.5">
                          {selectedPass.eventName}
                        </h3>
                        <p className="text-xs text-zinc-400 font-mono mt-0.5">{selectedPass.circuitName}</p>
                      </div>

                      <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">
                        VERIFIED
                      </span>
                    </div>

                    {/* Mid Details */}
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-zinc-500 block text-[10px]">TICKET HOLDER</span>
                        <span className="text-white font-bold">{selectedPass.holderName}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px]">GRANDSTAND / SECTOR</span>
                        <span className="text-white font-bold">{selectedPass.grandstandName}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px]">GATE ENTRY</span>
                        <span className="text-zinc-200">{selectedPass.gateEntry}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px]">SEATING SECTOR</span>
                        <span className="text-zinc-200">{selectedPass.sector}</span>
                      </div>
                    </div>

                    {/* QR Code turnstile preview */}
                    <div className="p-4 rounded-xl bg-white flex flex-col items-center justify-center space-y-2">
                      {/* SVG QR Code Simulation */}
                      <svg viewBox="0 0 100 100" className="w-36 h-36">
                        <rect x="0" y="0" width="100" height="100" fill="white" />
                        {/* Corners */}
                        <rect x="10" y="10" width="25" height="25" fill="black" />
                        <rect x="15" y="15" width="15" height="15" fill="white" />
                        <rect x="18" y="18" width="9" height="9" fill="black" />

                        <rect x="65" y="10" width="25" height="25" fill="black" />
                        <rect x="70" y="15" width="15" height="15" fill="white" />
                        <rect x="73" y="18" width="9" height="9" fill="black" />

                        <rect x="10" y="65" width="25" height="25" fill="black" />
                        <rect x="15" y="70" width="15" height="15" fill="white" />
                        <rect x="18" y="73" width="9" height="9" fill="black" />

                        {/* Random barcode matrix */}
                        <rect x="42" y="12" width="6" height="18" fill="black" />
                        <rect x="52" y="20" width="8" height="8" fill="black" />
                        <rect x="40" y="40" width="20" height="20" fill="black" />
                        <rect x="45" y="45" width="10" height="10" fill="white" />
                        <rect x="65" y="55" width="12" height="12" fill="black" />
                        <rect x="80" y="70" width="10" height="20" fill="black" />
                        <rect x="45" y="75" width="18" height="12" fill="black" />
                      </svg>
                      
                      <span className="text-[10px] font-mono text-zinc-800 tracking-widest font-bold">
                        {selectedPass.passId} • {selectedPass.orderNumber}
                      </span>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/10">
                      <button className="flex items-center space-x-1.5 text-zinc-300 hover:text-white transition-colors">
                        <Download className="w-4 h-4 text-[#E10600]" />
                        <span>Save to Apple Wallet</span>
                      </button>
                      <button className="flex items-center space-x-1.5 text-zinc-300 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4 text-[#E10600]" />
                        <span>Export PDF</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

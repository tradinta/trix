'use client';

import React from 'react';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 text-zinc-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#E10600] flex items-center justify-center font-bold text-white">
                <span className="text-lg italic font-black">P</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight uppercase italic">
                PEDESTAL<span className="text-[#E10600]">.F1</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Minimalist Formula One ticket booking platform. Verified grandstand seating and VIP paddock club hospitality.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-2 text-xs font-mono">
            <span className="text-white font-bold uppercase tracking-wider block mb-3">Races 2026</span>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Monaco Grand Prix</a></li>
              <li><a href="#" className="hover:text-white transition-colors">British Grand Prix</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Italian Grand Prix</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Japanese Grand Prix</a></li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="space-y-2 text-xs font-mono">
            <span className="text-white font-bold uppercase tracking-wider block mb-3">Guarantees</span>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Circuit Verified Passes</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instant Digital QR Delivery</span>
              </div>
            </div>
          </div>

          {/* Ticket Drop Alerts */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
              Ticket Drop Alerts
            </span>
            <p className="text-xs text-zinc-400 font-light">
              Get notified immediately when new grandstand seating opens for sold-out races.
            </p>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-[#E10600]"
              />
              <button className="px-3 py-2 rounded-lg bg-[#E10600] text-white hover:bg-[#FF1801] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <p>© 2026 PEDESTAL F1. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-300">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-300">Circuit Entry Rules</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

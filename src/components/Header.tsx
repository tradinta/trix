'use client';

import React from 'react';
import { Ticket, ShoppingBag, Flag, Search, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenPasses: () => void;
  activePassesCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenPasses,
  activePassesCount,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Season Tag */}
        <div className="flex items-center space-x-4">
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#E10600] flex items-center justify-center font-bold text-white shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform">
              <span className="text-xl tracking-tighter font-extrabold italic">P</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white uppercase italic">
                PEDESTAL<span className="text-[#E10600] font-normal">.F1</span>
              </span>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                Official Pass Desk
              </p>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>2026 Season Active</span>
          </div>
        </div>

        {/* Search input */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Grand Prix or Circuit..."
              className="w-full bg-black/40 border border-white/15 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#E10600] transition-colors"
            />
          </div>
        </div>

        {/* Navigation & Action Buttons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Digital Passes Locker Trigger */}
          <button
            onClick={onOpenPasses}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs sm:text-sm font-medium text-zinc-200 transition-all hover:border-zinc-600"
          >
            <Ticket className="w-4 h-4 text-[#E10600]" />
            <span className="hidden sm:inline">My Passes</span>
            {activePassesCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                {activePassesCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#E10600] hover:bg-[#FF1801] text-white text-xs sm:text-sm font-semibold shadow-md shadow-red-950/40 transition-all hover:scale-105"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            {cartItemCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-white text-[#E10600] font-bold text-xs flex items-center justify-center font-mono">
                {cartItemCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};

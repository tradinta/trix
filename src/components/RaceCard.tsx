'use client';

import React from 'react';
import { GrandPrixEvent } from '@/types/f1';
import { Calendar, MapPin, Ticket, ArrowRight, ShieldCheck } from 'lucide-react';

interface RaceCardProps {
  event: GrandPrixEvent;
  onSelect: (event: GrandPrixEvent) => void;
}

export const RaceCard: React.FC<RaceCardProps> = ({ event, onSelect }) => {
  const minPrice = Math.min(...event.grandstands.map((g) => g.pricePerDay));

  return (
    <div className="group relative rounded-2xl bg-zinc-900/70 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/50">
      
      {/* Top Banner & Status */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-60"
          style={{ backgroundImage: `url(${event.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-zinc-300">
            ROUND {event.round}
          </span>
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold uppercase tracking-wider ${
              event.status === 'Selling Fast'
                ? 'bg-red-950/90 text-red-400 border border-red-500/30'
                : event.status === 'Limited VIP'
                ? 'bg-amber-950/90 text-amber-400 border border-amber-500/30'
                : 'bg-zinc-800/90 text-zinc-300 border border-zinc-700'
            }`}
          >
            {event.status}
          </span>
        </div>

        {/* Flag & Circuit Name */}
        <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-[#E10600]" />
            <span>{event.location}</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight uppercase italic group-hover:text-red-400 transition-colors">
            {event.name}
          </h3>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs text-zinc-400 font-mono">
            <Calendar className="w-4 h-4 text-zinc-500" />
            <span>{event.dateRange}</span>
          </div>

          {/* Circuit stats chips */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-white/5">
            <div className="bg-black/30 p-2 rounded border border-white/5">
              <span className="text-zinc-500 block text-[10px]">DISTANCE</span>
              <span className="text-zinc-200 font-bold">{event.raceDistanceKm} km</span>
            </div>
            <div className="bg-black/30 p-2 rounded border border-white/5">
              <span className="text-zinc-500 block text-[10px]">LAP RECORD</span>
              <span className="text-zinc-200 font-bold">{event.lapRecord.time}</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 block uppercase">Passes From</span>
            <span className="text-lg font-extrabold font-mono text-white">
              ${minPrice} <span className="text-xs font-normal text-zinc-400">/ day</span>
            </span>
          </div>

          <button
            onClick={() => onSelect(event)}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-[#E10600] text-zinc-200 hover:text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center space-x-1.5 transition-all group-hover:bg-[#E10600] group-hover:text-white"
          >
            <span>Book Seats</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};

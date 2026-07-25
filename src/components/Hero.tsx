'use client';

import React, { useState, useEffect } from 'react';
import { GrandPrixEvent } from '@/types/f1';
import { Calendar, MapPin, Gauge, Clock, ChevronRight, Sparkles } from 'lucide-react';

interface HeroProps {
  featuredEvent: GrandPrixEvent;
  onSelectEvent: (event: GrandPrixEvent) => void;
}

export const Hero: React.FC<HeroProps> = ({ featuredEvent, onSelectEvent }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 38,
    seconds: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: (prev.minutes - 1 + 60) % 60 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-white/10 py-12 lg:py-20 bg-telemetry-grid">
      {/* Dark gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${featuredEvent.heroImage})` }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-xs font-mono text-red-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next Grand Prix • Round {featuredEvent.round}</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white italic uppercase">
                {featuredEvent.name}
              </h1>
              <p className="text-lg text-zinc-400 font-light flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#E10600]" />
                <span>{featuredEvent.officialName}</span>
              </p>
            </div>

            {/* Circuit Telemetry Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-zinc-900/80 border border-white/10 backdrop-blur-md">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Circuit Length</span>
                <p className="text-base sm:text-lg font-bold text-white font-mono">{featuredEvent.circuitLengthKm} km</p>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-3 sm:pl-4">
                <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Laps</span>
                <p className="text-base sm:text-lg font-bold text-white font-mono">{featuredEvent.laps}</p>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-3 sm:pl-4">
                <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Lap Record</span>
                <p className="text-xs sm:text-sm font-bold text-red-400 font-mono">{featuredEvent.lapRecord.time}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onSelectEvent(featuredEvent)}
                className="px-6 py-3.5 rounded-xl bg-[#E10600] hover:bg-[#FF1801] text-white font-bold text-sm tracking-wider uppercase flex items-center space-x-2 shadow-lg shadow-red-950/50 transition-all hover:scale-105"
              >
                <span>Reserve Tickets</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <span>{featuredEvent.dateRange}</span>
              </div>
            </div>

          </div>

          {/* Countdown Clock Column */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#E10600]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">Race Day Countdown</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                  LIVE
                </span>
              </div>

              {/* Countdown Digits */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="p-3 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">{timeLeft.days}</span>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase mt-1">Days</p>
                </div>
                <div className="p-3 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">{timeLeft.hours}</span>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase mt-1">Hours</p>
                </div>
                <div className="p-3 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">{timeLeft.minutes}</span>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase mt-1">Mins</p>
                </div>
                <div className="p-3 rounded-lg bg-black/60 border border-white/10 border-red-500/30">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#E10600]">{timeLeft.seconds}</span>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase mt-1">Secs</p>
                </div>
              </div>

              <div className="text-xs text-zinc-400 font-mono flex items-center justify-between pt-2">
                <span>Fastest Lap Holder:</span>
                <span className="text-zinc-200 font-semibold">{featuredEvent.lapRecord.driver} ({featuredEvent.lapRecord.year})</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

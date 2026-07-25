'use client';

import React from 'react';
import { GrandPrixEvent, CircuitZoneId } from '@/types/f1';
import { MapPin, Info, Sparkles } from 'lucide-react';

interface CircuitMapProps {
  event: GrandPrixEvent;
  selectedZone: CircuitZoneId | 'all';
  onSelectZone: (zone: CircuitZoneId | 'all') => void;
}

export const CircuitMap: React.FC<CircuitMapProps> = ({
  event,
  selectedZone,
  onSelectZone,
}) => {
  return (
    <div className="rounded-2xl bg-zinc-950 border border-white/10 p-6 space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E10600]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE CIRCUIT EXPLORER</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight uppercase italic mt-1">
            {event.circuitName} Sector Zones
          </h3>
        </div>

        {/* Filter Zone Badges */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectZone('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedZone === 'all'
                ? 'bg-[#E10600] text-white font-bold'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            Show All Stands ({event.grandstands.length})
          </button>
          
          {event.circuitZones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => onSelectZone(zone.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedZone === zone.id
                  ? 'bg-zinc-100 text-black font-bold shadow-md'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {zone.name.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Circuit Layout */}
      <div className="relative w-full h-72 sm:h-80 bg-zinc-900/60 rounded-xl border border-white/5 flex items-center justify-center p-4 overflow-hidden">
        
        {/* SVG Track */}
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full max-h-72 drop-shadow-[0_0_15px_rgba(225,6,0,0.3)]"
        >
          {/* Outer glow path */}
          <path
            d={event.trackSvgPath}
            fill="none"
            stroke="#E10600"
            strokeWidth="10"
            strokeOpacity="0.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Main asphalt track */}
          <path
            d={event.trackSvgPath}
            fill="none"
            stroke="#3F3F46"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Racing line highlight */}
          <path
            d={event.trackSvgPath}
            fill="none"
            stroke="#E10600"
            strokeWidth="2"
            strokeDasharray="6 4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          />

          {/* Interactive Zone Hotspots */}
          {event.circuitZones.map((zone) => {
            const isSelected = selectedZone === zone.id;
            return (
              <g
                key={zone.id}
                onClick={() => onSelectZone(zone.id)}
                className="cursor-pointer group"
              >
                <circle
                  cx={`${zone.x}%`}
                  cy={`${zone.y}%`}
                  r={isSelected ? 10 : 7}
                  className={`transition-all duration-300 ${
                    isSelected
                      ? 'fill-[#E10600] stroke-white stroke-2'
                      : 'fill-zinc-800 stroke-red-500 hover:fill-red-500'
                  }`}
                />
                <circle
                  cx={`${zone.x}%`}
                  cy={`${zone.y}%`}
                  r={isSelected ? 18 : 12}
                  className={`transition-all ${
                    isSelected ? 'stroke-[#E10600] stroke-1 fill-none animate-ping opacity-75' : 'fill-none'
                  }`}
                />
                <text
                  x={`${zone.x}%`}
                  y={`${zone.y - 6}%`}
                  textAnchor="middle"
                  className={`text-[9px] font-mono font-bold transition-all ${
                    isSelected ? 'fill-white font-extrabold' : 'fill-zinc-400 group-hover:fill-white'
                  }`}
                >
                  {zone.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-zinc-400 flex items-center space-x-2">
          <Info className="w-3.5 h-3.5 text-zinc-400" />
          <span>Click any zone hotspot on the track to filter seating areas</span>
        </div>

      </div>

    </div>
  );
};

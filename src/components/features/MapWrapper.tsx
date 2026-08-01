'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Clock } from 'lucide-react';

// Dynamically import the actual map component to avoid SSR issues with Leaflet
const SafetyMap = dynamic(() => import('./SafetyMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-neutral-100 animate-pulse flex items-center justify-center rounded-2xl border border-neutral-200">
      <span className="text-neutral-400 font-medium">Loading Map...</span>
    </div>
  )
});

export default function MapPageContent() {
  const [timeFilter, setTimeFilter] = useState('All Day');
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFilter(e.target.value);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Interactive Safety Map</h2>
          <p className="text-neutral-500 text-sm mt-1">
            View real-time and historical risk zones across the city.
          </p>
        </div>
        
        {/* Time Filter UI */}
        <div className="flex items-center space-x-3 bg-white border border-neutral-200 shadow-sm p-2 rounded-xl">
          <Clock className="w-5 h-5 text-sistech-pink ml-2" />
          <select 
            value={timeFilter}
            onChange={handleTimeChange}
            className="bg-transparent border-none text-sm font-semibold text-neutral-700 focus:ring-0 cursor-pointer outline-none mr-2"
          >
            <option value="All Day">All Day</option>
            <option value="Morning (06:00 - 12:00)">Morning (06:00 - 12:00)</option>
            <option value="Afternoon (12:00 - 18:00)">Afternoon (12:00 - 18:00)</option>
            <option value="Night (18:00 - 06:00)">Night (18:00 - 06:00)</option>
          </select>
        </div>
      </div>

      <div className="flex-1 w-full relative rounded-2xl overflow-hidden shadow-lg border border-neutral-200 min-h-[500px]">
        {/* The map component needs the timeFilter to show different heatmaps */}
        <SafetyMap timeFilter={timeFilter} />
      </div>

      <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-neutral-500">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
          <span>High Risk (Isolated / Poor Lighting)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <span>Safe Zone</span>
        </div>
      </div>
    </div>
  );
}

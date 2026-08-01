'use client';

import React from 'react';
import { Heart, MapPin, Phone, Lock } from 'lucide-react';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Top Badge */}
      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-sistech-pink/20 bg-sistech-pink/5 mb-8">
        <Heart className="w-3.5 h-3.5 text-sistech-pink fill-sistech-pink" />
        <span className="text-sm font-semibold text-sistech-pink tracking-wide">
          Integrated Women Safety
        </span>
      </div>

      {/* Hero Headers */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 tracking-tight leading-tight">
        A Safe Space for <br />
        <span className="text-sistech-pink">Your Every Step</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-neutral-500 max-w-xl text-sm md:text-base leading-relaxed">
        SafeHer provides rapid emergency access, real-time location monitoring, and a trusted support network.
      </p>

      {/* Feature Cards */}
      <div className="mt-16 w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        
        {/* Card 1 */}
        <Link href="/route" className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 hover:-translate-y-1 transition-transform cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-sistech-pink/10 flex items-center justify-center mb-6">
            <MapPin className="w-6 h-6 text-sistech-pink" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 mb-2">Safe Map Routing</h3>
          <p className="text-xs text-neutral-500 leading-relaxed px-2">
            Track safe routes and avoid high-risk areas.
          </p>
        </Link>

        {/* Card 2 (Links to Heatmap for demo) */}
        <Link href="/map" className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 hover:-translate-y-1 transition-transform cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-sistech-purple/10 flex items-center justify-center mb-6">
            <Phone className="w-6 h-6 text-sistech-purple" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 mb-2">Safety Heatmap</h3>
          <p className="text-xs text-neutral-500 leading-relaxed px-2">
            Interactive map with time-based risk insights.
          </p>
        </Link>

        {/* Card 3 */}
        <Link href="/report" className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 hover:-translate-y-1 transition-transform cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-sistech-pink/10 flex items-center justify-center mb-6">
            <Lock className="w-6 h-6 text-sistech-pink" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 mb-2">Anonymous Report</h3>
          <p className="text-xs text-neutral-500 leading-relaxed px-2">
            Report incidents safely without revealing identity.
          </p>
        </Link>

      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { Search, MapPin, AlertTriangle, Clock } from 'lucide-react';
import SafeRouteCard from '@/components/features/SafeRouteCard';

export default function RoutePage() {
  const [startLoc, setStartLoc] = useState('');
  const [endLoc, setEndLoc] = useState('');
  const [timeWindow, setTimeWindow] = useState('Now');
  const [isLoading, setIsLoading] = useState(false);
  const [routeData, setRouteData] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startLoc || !endLoc) return;

    setIsLoading(true);
    setRouteData(null);

    try {
      // Mock API call testing
      const res = await fetch(`/api/risk-prediction?start=${encodeURIComponent(startLoc)}&end=${encodeURIComponent(endLoc)}`);
      const data = await res.json();
      setRouteData(data);
    } catch (error) {
      console.error("Failed to fetch route data", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Safe Commute Insights
        </h2>
        <p className="text-neutral-500 mt-2">
          Plan your journey securely. Enter your details below for real-time safety analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <form onSubmit={handleSearch} className="space-y-5">
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Starting Point</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-sistech-pink shadow-[0_0_8px_rgba(255,0,138,0.5)]"></div>
                  </div>
                  <input 
                    type="text"
                    placeholder="e.g., UI Depok"
                    value={startLoc}
                    onChange={(e) => setStartLoc(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 focus:border-sistech-pink/50 transition-all placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Destination</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="w-4 h-4 text-sistech-purple" />
                  </div>
                  <input 
                    type="text"
                    placeholder="e.g., Sudirman"
                    value={endLoc}
                    onChange={(e) => setEndLoc(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-sistech-purple/50 focus:border-sistech-purple/50 transition-all placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Time Window</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="w-4 h-4 text-neutral-400" />
                  </div>
                  <select 
                    value={timeWindow}
                    onChange={(e) => setTimeWindow(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-300 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Now">Departing Now</option>
                    <option value="Tonight">Tonight (After 18:00)</option>
                    <option value="Tomorrow Morning">Tomorrow Morning</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading || !startLoc || !endLoc}
                className="w-full py-3.5 mt-2 bg-sistech-pink hover:bg-[#d60074] text-white font-bold rounded-xl shadow-lg shadow-sistech-pink/30 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Analyze Route</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Results & Insights */}
        <div className="lg:col-span-7">
          <div className="bg-neutral-50/50 rounded-3xl p-6 h-full border border-neutral-100 flex flex-col">
            
            {/* Initial State */}
            {!isLoading && !routeData && (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 py-12">
                <MapPin className="w-12 h-12 text-neutral-400 mb-4" />
                <p className="text-neutral-500 text-sm max-w-xs">
                  Fill in your starting point and destination to see risk predictions and simple safety analysis.
                </p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-4 w-full h-full">
                <div className="h-4 bg-neutral-200 rounded animate-pulse w-1/3 mb-6"></div>
                <div className="w-full h-48 bg-neutral-200 rounded-2xl animate-pulse"></div>
                <div className="h-20 bg-neutral-200 rounded-xl animate-pulse mt-4"></div>
              </div>
            )}

            {/* Results State */}
            {!isLoading && routeData && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">Safety Analysis Results</h3>
                  <p className="text-xs text-neutral-500">Generated by MLOps Risk Prediction API (Mock)</p>
                </div>
                
                {/* Reusing our previous SafeRouteCard but tweaked for light mode container */}
                <SafeRouteCard data={routeData} />

                {/* Extra Risk Insight Panel */}
                <div className="bg-white border border-neutral-200 p-4 rounded-xl shadow-sm">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${routeData.riskAssessment.level === 'High' ? 'text-red-500' : 'text-amber-500'}`} />
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">Insight & Recommendations</h4>
                      <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                        {routeData.riskAssessment.level === 'High' 
                          ? "This route has isolated segments and poor lighting during this time window. We strongly suggest finding an alternate route or using the SOS feature if commuting alone."
                          : "This route is generally safe based on historical crowdsourced inputs. Keep your trusted contacts informed."}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { MapPin, Navigation, Clock, AlertTriangle, ShieldCheck, AlertCircle } from 'lucide-react';

interface RouteData {
  route: {
    from: string;
    to: string;
    distance: string;
    estimatedTime: string;
  };
  riskAssessment: {
    score: number;
    level: string;
    color: string;
    message: string;
    factors: Array<{ name: string; status: string | number }>;
  };
}

interface SafeRouteCardProps {
  data: RouteData;
  isLoading?: boolean;
}

export default function SafeRouteCard({ data, isLoading }: SafeRouteCardProps) {
  if (isLoading) {
    return (
      <div className="w-full bg-neutral-900/50 backdrop-blur-md rounded-2xl p-6 border border-neutral-800 animate-pulse">
        <div className="h-6 bg-neutral-800 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-neutral-800 rounded w-1/2 mb-6"></div>
        <div className="space-y-3">
          <div className="h-20 bg-neutral-800 rounded-xl"></div>
          <div className="h-10 bg-neutral-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  const { route, riskAssessment } = data;

  const getRiskIcon = () => {
    switch (riskAssessment.level) {
      case 'High': return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case 'Medium': return <AlertCircle className="w-6 h-6 text-amber-500" />;
      default: return <ShieldCheck className="w-6 h-6 text-emerald-500" />;
    }
  };

  const getGradientByRisk = () => {
    switch (riskAssessment.level) {
      case 'High': return 'from-red-500/20 to-red-600/5 border-red-500/30';
      case 'Medium': return 'from-amber-500/20 to-amber-600/5 border-amber-500/30';
      default: return 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30';
    }
  };

  const getGlowByRisk = () => {
    switch (riskAssessment.level) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      default: return 'bg-emerald-500';
    }
  };

  const getBadgeBorderByRisk = () => {
    switch (riskAssessment.level) {
      case 'High': return 'border-red-500/20';
      case 'Medium': return 'border-amber-500/20';
      default: return 'border-emerald-500/20';
    }
  };

  const getTextColorByRisk = () => {
    switch (riskAssessment.level) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-amber-400';
      default: return 'text-emerald-400';
    }
  };

  return (
    <div className={`relative overflow-hidden w-full bg-neutral-900/80 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${getGradientByRisk()}`}>
      {/* Background glow effect based on risk */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${getGlowByRisk()}`} />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>Route Assessment</span>
          </h3>
          <p className="text-sm text-neutral-400 mt-1">{riskAssessment.message}</p>
        </div>
        <div className={`flex flex-col items-center justify-center bg-neutral-950/50 p-2 rounded-xl border ${getBadgeBorderByRisk()}`}>
          {getRiskIcon()}
          <span className={`text-xs font-bold mt-1 ${getTextColorByRisk()}`}>
            {riskAssessment.score}/100
          </span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {/* Route Path Visualization */}
        <div className="flex items-center space-x-4 bg-neutral-950/40 p-4 rounded-xl border border-neutral-800/50">
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="w-3 h-3 rounded-full bg-teal-400 border-[3px] border-teal-400/30"></div>
            <div className="w-0.5 h-6 bg-neutral-700 border-l border-dashed border-neutral-600"></div>
            <div className="w-3 h-3 rounded-full bg-indigo-400 border-[3px] border-indigo-400/30"></div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="text-sm font-medium text-neutral-200 truncate">{route.from}</div>
            <div className="text-sm font-medium text-neutral-200 truncate">{route.to}</div>
          </div>
          <div className="text-right space-y-3 text-xs text-neutral-400 font-medium">
            <div className="flex items-center justify-end space-x-1">
              <Navigation className="w-3 h-3" /> <span>{route.distance}</span>
            </div>
            <div className="flex items-center justify-end space-x-1">
              <Clock className="w-3 h-3" /> <span>{route.estimatedTime}</span>
            </div>
          </div>
        </div>

        {/* Factors */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {riskAssessment.factors.map((factor, idx) => (
            <div key={idx} className="bg-neutral-950/40 p-3 rounded-lg border border-neutral-800/50">
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{factor.name}</div>
              <div className="text-sm font-medium text-neutral-300 mt-1">{factor.status}</div>
            </div>
          ))}
        </div>
      </div>
      
      <button className={`w-full mt-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
        riskAssessment.level === 'High' 
          ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20' 
          : 'bg-teal-500 text-neutral-950 hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/20'
      }`}>
        {riskAssessment.level === 'High' ? 'Find Alternate Route' : 'Start Navigation'}
      </button>
    </div>
  );
}

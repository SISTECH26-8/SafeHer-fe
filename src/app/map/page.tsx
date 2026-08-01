import React from 'react';
import MapWrapper from '@/components/features/MapWrapper';

export const metadata = {
  title: 'Interactive Safety Map - SafeHer',
  description: 'View real-time safety heatmap and risk zones.',
};

export default function MapPage() {
  return (
    <div className="w-full h-full flex flex-col bg-neutral-50/50 min-h-[calc(100vh-4rem)]">
      <MapWrapper />
    </div>
  );
}

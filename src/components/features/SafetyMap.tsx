'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import L from 'leaflet';

// Make sure L is attached to window for leaflet.heat
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.L = L;
  require('leaflet.heat');
}

interface SafetyMapProps {
  timeFilter: string;
}

// Heatmap layer component
function HeatmapLayer({ timeFilter }: { timeFilter: string }) {
  const map = useMap();

  useEffect(() => {
    let points: [number, number, number][] = [];
    const baseLat = -6.200000;
    const baseLng = 106.816666;

    const intensityMultiplier = timeFilter.includes('Night') ? 1.0 : (timeFilter.includes('Morning') ? 0.3 : 0.6);

    for (let i = 0; i < 200; i++) {
      const lat = baseLat + (Math.random() - 0.5) * 0.1;
      const lng = baseLng + (Math.random() - 0.5) * 0.1;
      const intensity = Math.random() * intensityMultiplier;
      points.push([lat, lng, intensity]);
    }

    // @ts-ignore
    const heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 13,
      gradient: {
        0.4: 'blue',
        0.6: 'lime',
        0.8: 'yellow',
        1.0: 'red'
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, timeFilter]);

  return null;
}

export default function SafetyMap({ timeFilter }: SafetyMapProps) {
  const position: [number, number] = [-6.200000, 106.816666];

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      scrollWheelZoom={true} 
      style={{ height: '500px', width: '100%' }}
      className="z-0 rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <HeatmapLayer timeFilter={timeFilter} />
    </MapContainer>
  );
}


'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { CornerUpRight } from 'lucide-react';
import L from 'leaflet';

function SetBounds({ startCoords, destCoords }: { startCoords: [number, number], destCoords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (startCoords && destCoords) {
      const bounds = L.latLngBounds([startCoords, destCoords]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, startCoords, destCoords]);
  return null;
}

export default function TrackingMap({ startCoords, destCoords }: { startCoords: [number, number], destCoords: [number, number] }) {
  const polyline: [number, number][] = [startCoords, destCoords];

  return (
    <div className="w-full h-screen fixed inset-0 z-50 flex flex-col bg-neutral-900 font-sans">
      
      {/* Map Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 bg-gradient-to-b from-black/50 to-transparent pt-10">
        <div className="bg-[#6A5AE0] text-white rounded-2xl p-4 flex items-center shadow-lg border border-white/20 backdrop-blur-md max-w-sm mx-auto">
          <div className="bg-white text-[#6A5AE0] p-2 rounded-xl mr-4">
            <CornerUpRight className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg leading-tight">Dalam 30 Meter</h3>
            <p className="text-sm text-white/80">Belok Kanan ke Jalan Palakali 3</p>
          </div>
        </div>
      </div>

      <MapContainer 
        center={startCoords} 
        zoom={16} 
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={startCoords}>
          <Popup>Lokasi Kamu</Popup>
        </Marker>
        <Marker position={destCoords}>
          <Popup>Safe Point</Popup>
        </Marker>
        <Polyline positions={polyline} color="#00C4FF" weight={8} opacity={0.8} />
        <SetBounds startCoords={startCoords} destCoords={destCoords} />
      </MapContainer>

      {/* Bottom Summary Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-[1000] p-4 flex justify-center pb-8">
        <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-6 shadow-2xl w-full max-w-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-[#7A0000] leading-none">2</span>
              <span className="text-lg font-bold text-[#7A0000] mb-0.5">Menit</span>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full ml-1 border border-green-200">0.1 KM</span>
            </div>
            <div className="flex items-center text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-100">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-1.5 animate-pulse"></div>
              Live Tracking Aktif
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 font-bold mb-5 border-b border-neutral-100 pb-3">Estimasi tiba : 21.51 WIB</p>
          <div className="flex gap-3">
            <button 
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-sistech-pink text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:bg-pink-600 transition-colors text-sm"
            >
              SELESAI
            </button>
            <button className="bg-red-600 text-white font-black px-6 py-3.5 rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 transition-colors flex items-center justify-center text-lg">
              SOS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

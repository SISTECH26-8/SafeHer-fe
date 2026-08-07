'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Car, Bike, Bus, Footprints, Camera, ZapOff, ArrowLeft } from 'lucide-react';
import L from 'leaflet';
import TrackingMap from './TrackingMap';

type TransportMode = 'driving' | 'motorcycle' | 'transit' | 'foot';

interface RouteOption {
  id: string;
  name: string;
  via: string;
  distanceKm: string;
  durationMin: number;
  riskLevel: 'Rendah' | 'Sedang' | 'Tinggi';
  riskPercentage: number;
  badge?: string;
  badgeType?: 'cctv' | 'lighting' | 'dark';
  geometry: [number, number][];
}

interface RouteSelectionProps {
  startCoords: [number, number];
  destCoords: [number, number];
  startName?: string;
  destName?: string;
  onBack?: () => void;
}

const ensureLatLng = (coords: [number, number]): [number, number] => {
  if (!coords) return [0, 0];
  if (Math.abs(coords[0]) > 90) return [coords[1], coords[0]];
  return coords;
};

function SetBounds({ geometry }: { geometry: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (geometry && geometry.length > 0) {
      const bounds = L.latLngBounds(geometry);
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [map, geometry]);
  return null;
}

export default function RouteSelectionMap({
  startCoords,
  destCoords,
  startName = 'Lokasi Saya',
  destName = 'Tujuan',
  onBack
}: RouteSelectionProps) {
  const [transportMode, setTransportMode] = useState<TransportMode>('driving');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('r1');
  const [isNavigating, setIsNavigating] = useState(false);
  const [routes, setRoutes] = useState<RouteOption[]>([]);

  const startLatLng = ensureLatLng(startCoords);
  const destLatLng = ensureLatLng(destCoords);

  // Fetch Rute dari OSRM berdasarkan Transport Mode & Koordinat
  useEffect(() => {
    if (!startCoords || !destCoords) return;

    const [startLon, startLat] = Math.abs(startCoords[0]) > 90 ? [startCoords[0], startCoords[1]] : [startCoords[1], startCoords[0]];
    const [destLon, destLat] = Math.abs(destCoords[0]) > 90 ? [destCoords[0], destCoords[1]] : [destCoords[1], destCoords[0]];

    const profile = transportMode === 'foot' ? 'foot' : 'driving';

    fetch(`https://router.project-osrm.org/route/v1/${profile}/${startLon},${startLat};${destLon},${destLat}?overview=full&geometries=geojson&alternatives=true`)
      .then((res) => res.json())
      .then((data) => {
        if (data.routes && data.routes.length > 0) {
          const generatedRoutes: RouteOption[] = data.routes.map((r: any, idx: number) => {
            const coords = r.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]] as [number, number]);
            const distKm = (r.distance / 1000).toFixed(1);
            const durMin = Math.max(1, Math.round(r.duration / 60));
            const viaStreet = r.legs?.[0]?.summary || `Jalan Utama ${idx + 1}`;

            if (idx === 0) {
              return {
                id: 'r1',
                name: `Rute Utama (${viaStreet})`,
                via: `Lewat ${viaStreet}`,
                distanceKm: distKm,
                durationMin: durMin,
                riskLevel: 'Rendah',
                riskPercentage: 20,
                badge: 'Penerangan baik dan terdapat CCTV',
                badgeType: 'cctv',
                geometry: coords
              };
            } else {
              return {
                id: `r${idx + 1}`,
                name: `Rute Alternatif (${viaStreet})`,
                via: `Lewat ${viaStreet}`,
                distanceKm: distKm,
                durationMin: durMin,
                riskLevel: 'Tinggi',
                riskPercentage: 70,
                badge: 'Minim Lampu Jalan',
                badgeType: 'dark',
                geometry: coords
              };
            }
          });

          setRoutes(generatedRoutes);
          setSelectedRouteId(generatedRoutes[0].id);
        }
      })
      .catch(() => {
        const fallbackRoutes: RouteOption[] = [
          {
            id: 'r1',
            name: 'Rute Utama (Jalan Utama 1)',
            via: 'Lewat Jalan Utama 1',
            distanceKm: '3.2',
            durationMin: 10,
            riskLevel: 'Rendah',
            riskPercentage: 20,
            badge: 'Penerangan baik dan terdapat CCTV',
            badgeType: 'cctv',
            geometry: [startLatLng, destLatLng]
          }
        ];
        setRoutes(fallbackRoutes);
      });
  }, [startCoords, destCoords, transportMode]);

  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  // 🚀 MODE NAVIGASI FULL SCREEN (Tampil setelah klik MULAI NAVIGASI)
  if (isNavigating && activeRoute) {
    return (
      <TrackingMap
        startCoords={startCoords}
        destCoords={destCoords}
        routeGeometry={activeRoute.geometry}
        routeDetail={{
          startName,
          destName,
          instruction: activeRoute.via,
          distanceKm: activeRoute.distanceKm,
          durationMin: activeRoute.durationMin
        }}
        onFinish={() => setIsNavigating(false)}
      />
    );
  }

  // 📋 MODE PREVIEW REKOMENDASI (Sebelum Navigasi)
  return (
    <div className="w-full h-screen fixed inset-0 z-50 flex flex-col bg-neutral-100 font-sans overflow-hidden">
      
      {/* 1. Header Transport Mode Tabs */}
      <div className="absolute top-4 inset-x-4 max-w-xl mx-auto z-[1000] bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-neutral-200 flex items-center justify-around">
        {onBack && (
          <button onClick={onBack} className="p-2 hover:bg-neutral-100 rounded-xl transition-colors mr-1">
            <ArrowLeft className="w-5 h-5 text-neutral-700" />
          </button>
        )}
        
        <button
          onClick={() => setTransportMode('driving')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            transportMode === 'driving' ? 'bg-[#FF3B81] text-white shadow-md' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Mobil</span>
        </button>

        <button
          onClick={() => setTransportMode('motorcycle')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            transportMode === 'motorcycle' ? 'bg-[#FF3B81] text-white shadow-md' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Bike className="w-4 h-4" />
          <span>Motor</span>
        </button>

        <button
          onClick={() => setTransportMode('transit')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            transportMode === 'transit' ? 'bg-[#FF3B81] text-white shadow-md' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Bus className="w-4 h-4" />
          <span>Transit</span>
        </button>

        <button
          onClick={() => setTransportMode('foot')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            transportMode === 'foot' ? 'bg-[#FF3B81] text-white shadow-md' : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Footprints className="w-4 h-4" />
          <span>Jalan</span>
        </button>
      </div>

      {/* 2. Map Preview Container */}
      <div className="w-full h-[50vh] relative z-10 pt-16">
        <MapContainer center={startLatLng} zoom={15} className="w-full h-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={startLatLng}>
            <Popup>{startName}</Popup>
          </Marker>
          <Marker position={destLatLng}>
            <Popup>{destName}</Popup>
          </Marker>

          {routes.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <Polyline
                key={route.id}
                positions={route.geometry}
                color={isSelected ? '#6A5AE0' : '#94A3B8'}
                weight={isSelected ? 7 : 4}
                opacity={isSelected ? 0.9 : 0.5}
                eventHandlers={{
                  click: () => setSelectedRouteId(route.id)
                }}
              />
            );
          })}

          {activeRoute && <SetBounds geometry={activeRoute.geometry} />}
        </MapContainer>
      </div>

      {/* 3. Panel Bawah Rekomendasi Rute */}
      <div className="flex-1 bg-neutral-100/95 backdrop-blur-md p-6 overflow-y-auto z-[1000] flex flex-col justify-between max-w-xl mx-auto w-full border-t border-neutral-200">
        <div className="space-y-3">
          {routes.map((route, idx) => {
            const isSelected = route.id === selectedRouteId;
            const isRecommended = idx === 0;

            return (
              <div
                key={route.id}
                onClick={() => setSelectedRouteId(route.id)}
                className={`relative rounded-2xl p-5 transition-all cursor-pointer border-2 ${
                  isSelected
                    ? 'border-neutral-800 bg-white shadow-lg scale-[1.01]'
                    : 'border-transparent bg-white/70 hover:bg-white'
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-4 bg-[#6A5AE0] text-white text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                    REKOMENDASI
                  </div>
                )}

                <div className="flex items-start justify-between mt-1">
                  <div>
                    <h4 className="font-extrabold text-neutral-900 text-base">{route.name}</h4>
                    <p className="text-xs text-neutral-500 font-medium mt-0.5">{route.via}</p>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${
                      route.riskLevel === 'Rendah'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                    }`}
                  >
                    Risk Level : {route.riskPercentage}% ({route.riskLevel})
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-neutral-700">
                    {route.badgeType === 'cctv' ? (
                      <Camera className="w-4 h-4 text-blue-600" />
                    ) : (
                      <ZapOff className="w-4 h-4 text-amber-600" />
                    )}
                    <span>{route.badge}</span>
                  </div>

                  <span className="text-2xl font-black text-neutral-900">{route.distanceKm} KM</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tombol MULAI NAVIGASI */}
        <button
          onClick={() => setIsNavigating(true)}
          className="w-full bg-[#FF3B81] hover:bg-pink-600 text-white font-extrabold py-4 rounded-2xl text-base uppercase tracking-wider shadow-lg shadow-pink-200 mt-6 transition-all active:scale-95"
        >
          MULAI NAVIGASI
        </button>
      </div>

    </div>
  );
}

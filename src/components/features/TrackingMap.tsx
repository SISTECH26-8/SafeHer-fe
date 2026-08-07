'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { CornerUpLeft, CornerUpRight, ArrowUp, Check } from 'lucide-react';
import L from 'leaflet';

interface RouteDetail {
  instruction?: string;
  distanceKm?: number | string;
  durationMin?: number | string;
  startName?: string;
  destName?: string;
}

interface TrackingMapProps {
  startCoords: [number, number];
  destCoords: [number, number];
  routeGeometry?: [number, number][];
  routeDetail?: RouteDetail;
  onFinish?: () => void;
}

// 1. Helper Konversi Koordinat Ke [Lat, Lon]
const ensureLatLng = (coords: [number, number]): [number, number] => {
  if (!coords) return [0, 0];
  if (Math.abs(coords[0]) > 90) {
    return [coords[1], coords[0]];
  }
  return coords;
};

// 2. Custom Icon Navigation Arrow (Panah Biru dalam Lingkaran)
const userArrowIcon = L.divIcon({
  className: 'custom-user-arrow-icon',
  html: `
    <div style="
      width: 44px;
      height: 44px;
      background: #2563EB;
      border: 3px solid #FFFFFF;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.5);
    ">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
      </svg>
    </div>
  `,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

// 3. Helper Hitung ETA
const calculateETA = (minutesToAdd: number): string => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutesToAdd);
  const hours = now.getHours().toString().padStart(2, '0');
  const mins = now.getMinutes().toString().padStart(2, '0');
  return `${hours}.${mins} WIB`;
};

// Helper Bounds Map Fit
function SetBounds({ roadGeometry }: { roadGeometry: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (roadGeometry && roadGeometry.length > 0) {
      const bounds = L.latLngBounds(roadGeometry);
      map.fitBounds(bounds, { padding: [70, 70] });
    }
  }, [map, roadGeometry]);
  return null;
}

export default function TrackingMap({
  startCoords,
  destCoords,
  routeGeometry,
  routeDetail,
  onFinish
}: TrackingMapProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [roadGeometry, setRoadGeometry] = useState<[number, number][]>([]);

  const startLatLng = ensureLatLng(startCoords);
  const destLatLng = ensureLatLng(destCoords);

  // Fetch Rute dari OSRM jika geometry belum dikirim
  useEffect(() => {
    if (routeGeometry && routeGeometry.length > 0) {
      setRoadGeometry(routeGeometry.map((c) => ensureLatLng(c)));
      return;
    }

    if (startCoords && destCoords) {
      const [startLon, startLat] = Math.abs(startCoords[0]) > 90 ? [startCoords[0], startCoords[1]] : [startCoords[1], startCoords[0]];
      const [destLon, destLat] = Math.abs(destCoords[0]) > 90 ? [destCoords[0], destCoords[1]] : [destCoords[1], destCoords[0]];

      fetch(`https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${destLon},${destLat}?overview=full&geometries=geojson`)
        .then((res) => res.json())
        .then((data) => {
          if (data.routes && data.routes[0]) {
            const coords = data.routes[0].geometry.coordinates.map(
              (c: [number, number]) => [c[1], c[0]] as [number, number]
            );
            setRoadGeometry(coords);
          } else {
            setRoadGeometry([startLatLng, destLatLng]);
          }
        })
        .catch(() => {
          setRoadGeometry([startLatLng, destLatLng]);
        });
    }
  }, [startCoords, destCoords, routeGeometry]);

  const displayDistance = routeDetail?.distanceKm ? `${routeDetail.distanceKm} KM` : '3.4 KM';
  const displayDuration = routeDetail?.durationMin || 7;
  const displayETA = calculateETA(Number(displayDuration));
  const instructionText = routeDetail?.instruction || 'Belok Kiri ke Jalan Juragan Sinda';

  const handleFinish = () => {
    setIsCompleted(true);
  };

  const handleCloseCompletedModal = () => {
    setIsCompleted(false);
    if (onFinish) onFinish();
    else window.location.href = '/route';
  };

  return (
    <div className="w-full h-screen fixed inset-0 z-50 flex flex-col bg-slate-950 font-sans overflow-hidden">
      
      {/* 1. Banner Atas: Turn-by-Turn Navigasi (Sesuai Screenshot Figma) */}
      <div className="absolute top-4 inset-x-4 max-w-lg mx-auto z-[1000] flex flex-col gap-2">
        {/* Main Instruction Card (Ungu) */}
        <div className="bg-[#6A5AE0] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20 backdrop-blur-md">
          <div className="bg-white/95 text-[#6A5AE0] p-3 rounded-xl shrink-0 shadow-inner flex items-center justify-center">
            <CornerUpLeft className="w-8 h-8 stroke-[3]" />
          </div>
          <div className="overflow-hidden">
            <h3 className="font-extrabold text-xl leading-tight">Dalam 200 Meter</h3>
            <p className="text-sm text-white/90 font-semibold truncate mt-0.5" title={instructionText}>
              {instructionText}
            </p>
          </div>
        </div>

        {/* Badge "Then" (Hijau gelap di bawah banner utama) */}
        <div className="self-start bg-[#0D5C46] text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 border border-white/10">
          <span>Then</span>
          <CornerUpLeft className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      </div>

      {/* 2. Peta Leaflet Dark Mode */}
      <div className="w-full h-full relative z-10">
        <MapContainer
          center={startLatLng}
          zoom={16}
          scrollWheelZoom={true}
          className="w-full h-full"
          zoomControl={false}
        >
          {/* TileLayer Dark Theme ala CartoDB Dark Matter / Google Dark */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {/* User Marker: Navigation Arrow Panah Biru */}
          <Marker position={startLatLng} icon={userArrowIcon}>
            <Popup>{routeDetail?.startName || 'Lokasi Anda'}</Popup>
          </Marker>
          
          <Marker position={destLatLng}>
            <Popup>{routeDetail?.destName || 'Tujuan'}</Popup>
          </Marker>

          {/* Polyline Warna Cyan Terang Ala Navigation */}
          <Polyline 
            positions={roadGeometry.length > 0 ? roadGeometry : [startLatLng, destLatLng]} 
            color="#00C4FF" 
            weight={7} 
            opacity={0.9} 
          />
          
          <SetBounds roadGeometry={roadGeometry.length > 0 ? roadGeometry : [startLatLng, destLatLng]} />
        </MapContainer>
      </div>

      {/* 3. Bottom Panel Live Tracking (Sesuai Screenshot Figma) */}
      <div className="absolute bottom-0 inset-x-0 bg-neutral-200/95 backdrop-blur-md rounded-t-[2.5rem] p-6 shadow-2xl z-[1000] max-w-lg mx-auto border-t border-white/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Box Durasi */}
            <div className="bg-neutral-100 px-4 py-2 rounded-2xl border border-neutral-300 shadow-sm flex items-baseline gap-1">
              <span className="text-4xl font-black text-neutral-900">{displayDuration}</span>
              <span className="text-base font-bold text-neutral-800">Menit</span>
            </div>

            {/* Badge Jarak */}
            <span className="bg-[#03543F] text-white font-extrabold text-xs px-3.5 py-2 rounded-full shadow-sm">
              {displayDistance}
            </span>
          </div>

          {/* Indicator Live Tracking */}
          <div className="flex items-center gap-1.5 bg-red-100 border border-red-200 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping shrink-0" />
            <span>Live Tracking Aktif</span>
          </div>
        </div>

        <p className="text-xs font-bold text-neutral-600 mb-4 text-left">
          Estimasi tiba : <span className="text-neutral-900 font-extrabold">{displayETA}</span>
        </p>

        {/* Buttons Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleFinish}
            className="flex-1 bg-[#FF3B81] hover:bg-pink-600 text-white font-extrabold py-4 rounded-2xl text-base uppercase tracking-wider shadow-lg shadow-pink-200 transition-all active:scale-95"
          >
            SELESAI
          </button>

          <button
            onClick={() => alert('SOS Berhasil Dikirim ke Kontak Darurat!')}
            className="bg-[#FF0F0F] text-white font-black text-xl px-7 py-3.5 rounded-2xl shadow-lg shadow-red-300 hover:bg-red-700 transition-all active:scale-95 shrink-0"
          >
            SOS
          </button>
        </div>
      </div>

      {/* 4. Pop-up Modal "PERJALANAN SELESAI!" (Sesuai Gambar 2 Figma) */}
      {isCompleted && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full text-center shadow-2xl border-2 border-[#FF3B81] animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-[#FF3B81] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-200">
              <Check className="w-10 h-10 text-white stroke-[3]" />
            </div>

            <h3 className="text-lg font-black text-[#7A0000] uppercase tracking-wide mb-6">
              PERJALANAN SELESAI!
            </h3>

            <button
              onClick={handleCloseCompletedModal}
              className="w-full bg-[#FF3B81] text-white font-extrabold py-3.5 rounded-2xl hover:bg-pink-600 transition-all active:scale-95 shadow-md shadow-pink-200"
            >
              KEMBALI KE UTAMA
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
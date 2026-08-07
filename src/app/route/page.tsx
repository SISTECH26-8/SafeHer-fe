'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { MapPin, Search, ArrowLeft, Loader2, X } from 'lucide-react';
import api from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const RouteSelectionMap = dynamic(() => import('@/components/features/RouteSelectionMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen fixed inset-0 flex flex-col items-center justify-center bg-neutral-900 z-[9999]">
      <Loader2 className="w-10 h-10 animate-spin text-sistech-pink mb-4" />
      <p className="text-white font-bold">Memuat Peta Rute Aman...</p>
    </div>
  )
});

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number]; // [lon, lat]
}

function RoutePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const queryDestLat = searchParams.get('destLat');
  const queryDestLon = searchParams.get('destLon');
  
  const [startLoc, setStartLoc] = useState('Mendeteksi lokasi...');
  const [startCoords, setStartCoords] = useState<[number, number] | null>(null); // [lon, lat]
  const [isLocating, setIsLocating] = useState(true);
  
  const [endLoc, setEndLoc] = useState<Location | null>(null);
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [isSearchingApi, setIsSearchingApi] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [, setRecentDestinations] = useState<Location[]>([]);

  // State untuk mengaktifkan tampilan Pilihan Rute & Navigasi
  const [isTrackingActive, setIsTrackingActive] = useState(false);

  // 1. Cek parameter URL dari SOS Safe Point
  useEffect(() => {
    if (queryDestLat && queryDestLon) {
      const lat = parseFloat(queryDestLat);
      const lon = parseFloat(queryDestLon);

      if (!isNaN(lat) && !isNaN(lon)) {
        setEndLoc({
          id: 'safe-point-target',
          name: 'Safe Point Terpilih',
          address: 'Rute menuju tempat aman terdekat',
          coordinates: [lon, lat]
        });
      }
    }
  }, [queryDestLat, queryDestLon]);

  // 2. Get Geolocation GPS
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          setStartCoords([longitude, latitude]);
          
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
              headers: { 'User-Agent': 'SafeHerApp/1.0' }
            });
            const data = await res.json();
            if (data && data.display_name) {
              const shortName = data.name || data.display_name.split(',')[0];
              setStartLoc(shortName);
            } else {
              setStartLoc(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            }
          } catch (error) {
            console.error('OSM Geocoding error:', error);
            setStartLoc(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setStartLoc('Gagal mendeteksi lokasi');
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setStartLoc('Geolocation tidak didukung browser');
      setIsLocating(false);
    }
  }, []);

  // 3. Autocomplete Search Nominatim
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      setIsSearchingApi(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&countrycodes=id&limit=5`, {
          headers: { 'User-Agent': 'SafeHerApp/1.0' }
        });
        const data = await res.json();
        
        if (data && data.length > 0) {
          const results: Location[] = data.map((feature: any) => ({
            id: feature.place_id.toString(),
            name: feature.name || feature.display_name.split(',')[0],
            address: feature.display_name,
            coordinates: [parseFloat(feature.lon), parseFloat(feature.lat)] as [number, number],
          }));
          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearchingApi(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelectLocation = (loc: Location) => {
    setEndLoc(loc);
    setIsSearching(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleClearDestination = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEndLoc(null);
  };

  // 4. PENGIRIMAN API & AKTIFKAN PEMILIHAN RUTE (ROUTE SELECTION MAP)
  const handleSearchRoute = async () => {
    if (!startCoords || !endLoc) {
      alert('Pilih lokasi asal dan tujuan terlebih dahulu.');
      return;
    }

    setIsRouting(true);

    try {
      const originLon = Number(startCoords[0]);
      const originLat = Number(startCoords[1]);
      const destLon = Number(endLoc.coordinates[0]);
      const destLat = Number(endLoc.coordinates[1]);

      const isoDatetime = new Date().toISOString().split('.')[0] + 'Z';

      const payload = {
        origin_lon: originLon,
        origin_lat: originLat,
        destination_lon: destLon,
        destination_lat: destLat,
        datetime: isoDatetime
      };

      console.log('Payload Rute Terkirim:', payload);

      // Request rekomendasi rute ke Backend
      try {
        const response = await api.post('/api/v1/trips/routes/recommend', payload);
        console.log('Route Recommendation Success:', response.data);
      } catch (err) {
        console.warn('Backend API skip / fallback local:', err);
      }

      // Simpan ke Recent
      setRecentDestinations((prev) => {
        const isExists = prev.some((item) => item.id === endLoc.id);
        if (!isExists) return [endLoc, ...prev.slice(0, 4)];
        return prev;
      });

      // Buka Layar Route Selection Map
      setIsTrackingActive(true);

    } finally {
      setIsRouting(false);
    }
  };

  const isRouteReady = startCoords && endLoc && !isLocating;

  // CONDITIONAL RENDER 1: Menggunakan RouteSelectionMap (Pilihan Mobil/Motor + Kartu Risk Level Figma)
  if (isTrackingActive && startCoords && endLoc) {
    return (
      <RouteSelectionMap
        startCoords={startCoords}
        destCoords={endLoc.coordinates}
        startName={startLoc}
        destName={endLoc.name}
        onBack={() => setIsTrackingActive(false)}
      />
    );
  }

  // CONDITIONAL RENDER 2: Jika URL dikirim langsung dari fitur SOS Safe Point
  if (queryDestLat && queryDestLon && startCoords) {
    const destCoords: [number, number] = [parseFloat(queryDestLon), parseFloat(queryDestLat)];
    return (
      <RouteSelectionMap
        startCoords={startCoords}
        destCoords={destCoords}
        startName={startLoc}
        destName="Safe Point Terpilih"
        onBack={() => router.push('/route')}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-16 bg-white min-h-[calc(100vh-200px)] flex flex-col font-sans mb-10 relative">
      
      {/* Search Overlay */}
      {isSearching && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col p-4 animate-in fade-in zoom-in-95 duration-200 min-h-screen">
          <div className="flex items-center space-x-3 mb-6 w-full max-w-2xl mx-auto mt-4 md:mt-10">
            <button onClick={() => setIsSearching(false)} className="p-3 hover:bg-neutral-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-neutral-800" />
            </button>
            <div className="flex-1 bg-white border border-neutral-200 rounded-2xl px-5 py-4 flex items-center shadow-lg shadow-pink-100/50">
              <Search className="w-6 h-6 text-sistech-pink mr-3" />
              <input 
                type="text" 
                autoFocus
                placeholder="Mau pergi ke mana hari ini?" 
                className="w-full bg-transparent border-none p-0 text-base md:text-lg focus:outline-none focus:ring-0 text-neutral-900 placeholder:text-neutral-400 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearchingApi && <Loader2 className="w-5 h-5 text-sistech-pink animate-spin ml-2" />}
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-2xl mx-auto overflow-y-auto space-y-4 pb-20">
            {searchResults.length > 0 ? (
              searchResults.map((res) => (
                <div key={res.id} onClick={() => handleSelectLocation(res)} className="w-full bg-white rounded-2xl p-4 md:p-5 flex items-center shadow-sm relative border border-neutral-100 hover:border-pink-200 hover:bg-pink-50 cursor-pointer transition-all hover:shadow-md">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0 mr-4 md:mr-5">
                    <MapPin className="w-6 h-6 text-sistech-pink" />
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <h4 className="text-base md:text-lg font-bold text-neutral-900 truncate">{res.name}</h4>
                    <span className="text-xs md:text-sm text-neutral-500 truncate mt-1">{res.address}</span>
                  </div>
                </div>
              ))
            ) : searchQuery.length > 0 && !isSearchingApi ? (
              <div className="text-center mt-20 flex flex-col items-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-neutral-400" />
                </div>
                <p className="text-base text-neutral-500 font-medium">Yah, lokasi tidak ditemukan.</p>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Main UI Form Input Rute */}
      <div className={`flex flex-col lg:flex-row gap-8 md:gap-16 items-start w-full ${isSearching ? 'hidden' : ''}`}>
        
        {/* Left Side Header */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-24 flex flex-col">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4 md:mb-6 leading-[1.15] tracking-tight">
            Temukan rute <span className="text-sistech-pink relative">teraman</span> untuk perjalananmu
          </h1>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-8 md:mb-10">
            Sistem kami menganalisis data rute secara real-time untuk memberikan rekomendasi jalur terbaik yang menghindari area rawan.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-7/12 max-w-xl mx-auto lg:mx-0 flex flex-col gap-8">
          <div className="w-full bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative z-10 border border-neutral-100">
            <h3 className="text-sm font-extrabold text-neutral-900 uppercase mb-6 tracking-wider">
              Pilih Tujuan Perjalanan
            </h3>
            
            {/* Start Location */}
            <div className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-4 flex items-center shadow-sm">
               <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                 {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
               </div>
               <div className="ml-4 flex-1 overflow-hidden">
                 <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide mb-0.5">Lokasi Kamu (GPS)</p>
                 <p className="text-sm md:text-base font-bold text-neutral-900 truncate" title={startLoc}>{startLoc}</p>
               </div>
            </div>

            <div className="h-12 border-l-2 border-dashed border-neutral-300 ml-9 my-1 opacity-70"></div>

            {/* Destination */}
            <div 
              onClick={() => setIsSearching(true)}
              className={`w-full ${endLoc ? 'bg-neutral-50 border-neutral-100' : 'bg-white border-dashed border-neutral-300'} border-2 rounded-2xl p-4 flex items-center shadow-sm cursor-pointer group`}
            >
               <div className={`w-10 h-10 rounded-xl ${endLoc ? 'bg-sistech-pink text-white' : 'bg-neutral-100 text-neutral-400'} flex items-center justify-center flex-shrink-0`}>
                 <MapPin className="w-5 h-5" />
               </div>
               
               {endLoc ? (
                 <>
                   <div className="ml-4 flex-1 overflow-hidden">
                     <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide mb-0.5">Tujuan</p>
                     <p className="text-sm md:text-base font-bold text-neutral-900 truncate">{endLoc.name}</p>
                   </div>
                   <button onClick={handleClearDestination} className="text-neutral-400 ml-2 p-2 hover:bg-neutral-200 rounded-full">
                     <X className="w-5 h-5" />
                   </button>
                 </>
               ) : (
                 <div className="ml-4 flex-1 overflow-hidden">
                   <p className="text-sm md:text-base font-bold text-neutral-900 mb-0.5">Tujuan Perjalanan</p>
                   <p className="text-xs md:text-sm text-neutral-500 truncate">Klik untuk mencari tujuan perjalananmu!</p>
                 </div>
               )}
            </div>

            {/* Submit Button */}
            <button 
              disabled={!isRouteReady || isRouting}
              onClick={handleSearchRoute}
              className={`w-full mt-8 flex items-center justify-center font-extrabold py-4 rounded-full text-sm tracking-wide shadow-lg transition-all ${
                isRouteReady 
                  ? 'bg-sistech-pink text-white hover:bg-pink-600 shadow-pink-200' 
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              {isRouting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  MENCARI RUTE AMAN...
                </>
              ) : (
                'CARI RUTE AMAN'
              )}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function RoutePage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-sistech-pink" /></div>}>
      <RoutePageContent />
    </Suspense>
  );
}
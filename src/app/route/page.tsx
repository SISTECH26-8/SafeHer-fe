'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { MapPin, Search, GraduationCap, Coffee, ShoppingBag, X, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const TrackingMap = dynamic(() => import('@/components/features/TrackingMap'), {
  ssr: false,
  loading: () => <div className="w-full h-screen fixed inset-0 flex flex-col items-center justify-center bg-neutral-900 z-[9999]"><Loader2 className="w-10 h-10 animate-spin text-sistech-pink mb-4" /><p className="text-white font-bold">Memuat Peta Tracking...</p></div>
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
  const [startCoords, setStartCoords] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(true);
  
  const [endLoc, setEndLoc] = useState<Location | null>(null);
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [isSearchingApi, setIsSearchingApi] = useState(false);
  const [isRouting, setIsRouting] = useState(false);

  // Get current location on mount (Nominatim API)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setStartCoords([latitude, longitude]);
          
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
              headers: { 'User-Agent': 'SafeHerApp/1.0' }
            });
            const data = await res.json();
            if (data && data.display_name) {
              // Extract a shorter name if possible
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

  // Nominatim Autocomplete Search
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
          const results = data.map((feature: any) => ({
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
    }, 600); // 600ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const [recentDestinations, setRecentDestinations] = useState<any[]>([]);

  // TODO: Fetch recent destinations from backend when available
  // For now, it's empty. When the user successfully routes, we could add to it.

  const handleSelectLocation = (loc: Location) => {
    setEndLoc(loc);
    setIsSearching(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSelectRecent = (recent: any) => {
    handleSelectLocation({
      id: recent.id,
      name: recent.name,
      address: recent.address,
      coordinates: recent.coordinates
    });
  };

  const handleClearDestination = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEndLoc(null);
  };

  const handleSearchRoute = async () => {
    if (!startCoords || !endLoc) return;
    setIsRouting(true);
    
    try {
      const payload = {
        origin_lon: startCoords[0],
        origin_lat: startCoords[1],
        destination_lon: endLoc.coordinates[0],
        destination_lat: endLoc.coordinates[1],
        datetime: new Date().toISOString()
      };
      
      const response = await api.post('/api/v1/trips/routes/recommend', payload);
      console.log('Route Recommendation:', response.data);
      
      // Jika berhasil memanggil API, bisa diarahkan ke halaman detail rute (jika ada)
      // router.push('/route/result'); 
      alert('Rute berhasil ditemukan melalui server!');
      
    } catch (error) {
      console.error('Failed to get route recommendation:', error);
      alert('Gagal mengambil data rute dari server.');
    } finally {
      setIsRouting(false);
    }
  };

  const isRouteReady = startCoords && endLoc && !isLocating;

  // Jika URL memiliki destLat dan destLon, serta koordinat awal sudah ditemukan,
  // maka kita tampilkan peta Tracking. Jika belum ditemukan koordinat, bisa tampilkan loader atau map default.
  if (queryDestLat && queryDestLon) {
    // Kita asumsikan startCoords sudah didapat dari geolocation
    // Jika belum didapatkan tapi ada lokasi awal fallback (atau lokasi kasar), kita tampilkan map
    const destCoords: [number, number] = [parseFloat(queryDestLat), parseFloat(queryDestLon)];
    
    // Fallback jika belum dapat lokasi GPS
    const defaultStartCoords: [number, number] = startCoords || [destCoords[0] - 0.003, destCoords[1] - 0.003];
    
    return <TrackingMap startCoords={defaultStartCoords} destCoords={destCoords} />;
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
                <p className="text-sm text-neutral-400 mt-1">Coba masukkan kata kunci yang lebih spesifik.</p>
              </div>
            ) : null}

            {/* If no search query, show recent or popular */}
            {!searchQuery && recentDestinations.length > 0 && (
              <>
                <p className="text-sm font-bold text-neutral-900 mb-3 mt-6 ml-2 uppercase tracking-wide">Rekomendasi / Tujuan Terakhir</p>
                {recentDestinations.map((dest) => (
                  <div key={dest.id} onClick={() => handleSelectRecent(dest)} className="w-full bg-white rounded-2xl p-4 md:p-5 flex items-center shadow-sm relative border border-neutral-100 hover:border-pink-200 hover:bg-pink-50 cursor-pointer transition-all hover:shadow-md">
                    <div className={`w-12 h-12 ${dest.bgIcon} rounded-xl flex items-center justify-center flex-shrink-0 mr-4 md:mr-5`}>
                      {dest.icon}
                    </div>
                    <div className="flex flex-col overflow-hidden flex-1">
                      <h4 className="text-base font-bold text-neutral-900 truncate">{dest.name}</h4>
                      <div className="flex items-center text-xs text-neutral-500 mt-1">
                        <span className="truncate">{dest.address}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      <div className={`flex flex-col lg:flex-row gap-8 md:gap-16 items-start w-full ${isSearching ? 'hidden' : ''}`}>
        
        {/* Left Side: Header & Info (Sticky on Desktop) */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-24 flex flex-col">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4 md:mb-6 leading-[1.15] tracking-tight">
            Temukan rute <span className="text-sistech-pink relative">teraman<svg className="absolute -bottom-2 left-0 w-full h-3 text-pink-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg></span> untuk perjalananmu
          </h1>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-8 md:mb-10">
            Sistem kami menganalisis data rute secara *real-time* untuk memberikan rekomendasi jalur terbaik yang menghindari area rawan, agar kamu bisa sampai di tujuan dengan tenang.
          </p>
          
          {/* Top Banner SOS as a styled card */}
          <div className="w-full border border-neutral-100 rounded-3xl p-6 bg-gradient-to-br from-white to-red-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row lg:flex-col items-center md:items-start lg:items-start gap-4">
            <div className="relative flex-shrink-0">
               <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
               </div>
               <div className="absolute -bottom-2 -right-2 text-[10px] font-extrabold text-white bg-red-500 px-1.5 py-0.5 shadow-sm rounded border border-white tracking-widest">SOS</div>
            </div>
            <div className="flex flex-col text-center md:text-left lg:text-left">
               <h2 className="text-lg md:text-xl font-bold text-neutral-900 mb-1.5">Selalu Ada Bantuan!</h2>
               <p className="text-sm text-neutral-600 leading-relaxed">
                 Fitur SOS kamu sudah aktif ke layanan darurat resmi. Tambahkan kontak terdekatmu agar ada yang langsung tahu saat kamu butuh bantuan!
               </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="w-full lg:w-7/12 max-w-xl mx-auto lg:mx-0 flex flex-col gap-8">
          
          <div className="w-full bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative z-10 border border-neutral-100">
            <h3 className="text-sm font-extrabold text-neutral-900 uppercase mb-6 tracking-wider hidden md:block">
              Pilih Tujuan Perjalanan
            </h3>
            
            {/* Start Location */}
            <div className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-4 flex items-center shadow-sm relative z-10 transition-all">
               <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-inner">
                 {isLocating ? (
                   <Loader2 className="w-5 h-5 animate-spin" />
                 ) : (
                   <MapPin className="w-5 h-5" />
                 )}
               </div>
               <div className="ml-4 flex-1 overflow-hidden">
                 <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide mb-0.5">Lokasi Kamu (GPS)</p>
                 <p className="text-sm md:text-base font-bold text-neutral-900 truncate" title={startLoc}>{startLoc}</p>
               </div>
               <div className="text-blue-500 ml-2 p-2">
                 <div className="w-5 h-5 border-[3px] border-blue-500 rounded-full flex items-center justify-center">
                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                 </div>
               </div>
            </div>

            {/* Dotted Line */}
            <div className="h-12 border-l-2 border-dashed border-neutral-300 ml-9 my-1 opacity-70"></div>

            {/* Destination */}
            <div 
              onClick={() => setIsSearching(true)}
              className={`w-full ${endLoc ? 'bg-neutral-50 border-neutral-100' : 'bg-white border-dashed border-neutral-300 hover:bg-neutral-50 hover:border-solid hover:border-pink-200'} border-2 rounded-2xl p-4 flex items-center shadow-sm relative z-10 transition-all cursor-pointer group`}
            >
               <div className={`w-10 h-10 rounded-xl ${endLoc ? 'bg-sistech-pink text-white shadow-md shadow-pink-200' : 'bg-neutral-100 text-neutral-400 group-hover:bg-pink-100 group-hover:text-sistech-pink'} flex items-center justify-center flex-shrink-0 transition-colors`}>
                 <MapPin className="w-5 h-5" />
               </div>
               
               {endLoc ? (
                 <>
                   <div className="ml-4 flex-1 overflow-hidden">
                     <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide mb-0.5">Tujuan</p>
                     <p className="text-sm md:text-base font-bold text-neutral-900 truncate">{endLoc.name}</p>
                   </div>
                   <button 
                     onClick={handleClearDestination}
                     className="text-neutral-400 ml-2 p-2 hover:bg-neutral-200 hover:text-neutral-800 rounded-full transition-colors"
                   >
                     <X className="w-5 h-5 font-bold" />
                   </button>
                 </>
               ) : (
                 <div className="ml-4 flex-1 overflow-hidden">
                   <p className="text-sm md:text-base font-bold text-neutral-900 mb-0.5 group-hover:text-sistech-pink transition-colors">Tujuan Perjalanan</p>
                   <p className="text-xs md:text-sm text-neutral-500 truncate">Klik untuk mencari tujuan perjalananmu!</p>
                 </div>
               )}
            </div>

            {/* Button */}
            <button 
              disabled={!isRouteReady || isRouting}
              onClick={handleSearchRoute}
              className={`w-full mt-8 flex items-center justify-center font-extrabold py-4 rounded-full text-sm tracking-wide shadow-lg transition-all ${
                isRouteReady 
                  ? 'bg-sistech-pink text-white hover:bg-pink-600 shadow-pink-200 hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-0.5 active:scale-[0.98]' 
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
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

          {/* Recent Destinations (Right Side below form) */}
          {recentDestinations.length > 0 && (
            <div className="w-full flex flex-col mt-2">
              <h3 className="text-xs md:text-sm font-extrabold text-neutral-900 uppercase mb-4 tracking-wider pl-2">
                Tujuan Terakhir yang Dikunjungi
              </h3>
              <div className="space-y-3">
                {recentDestinations.map((dest) => (
                  <div key={dest.id} onClick={() => handleSelectRecent(dest)} className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm relative border border-neutral-100 hover:border-pink-200 hover:bg-pink-50 transition-all cursor-pointer group hover:shadow-md">
                    <div className="flex items-center space-x-4 overflow-hidden flex-1">
                      <div className={`w-12 h-12 ${dest.bgIcon} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                        {dest.icon}
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <h4 className="text-sm md:text-base font-bold text-neutral-900 truncate group-hover:text-sistech-pink transition-colors">{dest.name}</h4>
                        <div className="flex items-center text-[11px] md:text-xs text-neutral-500 mt-1">
                          <span className="truncate max-w-[120px] md:max-w-[200px]">{dest.address}</span>
                          <span className="mx-2 font-bold text-neutral-300">&bull;</span>
                          <span className="font-bold text-neutral-700">{dest.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                       <div className={`px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold ${dest.badgeColor} shadow-sm uppercase tracking-wide`}>
                         {dest.status}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Info Banner */}
      <div className={`w-full max-w-2xl mx-auto bg-gradient-to-r from-[#EAE8FF] to-pink-50 border border-[#7A6AE6]/20 rounded-2xl p-5 text-center mt-12 shadow-sm ${isSearching ? 'hidden' : ''}`}>
        <p className="text-[#3E2E95] text-sm md:text-base font-bold leading-snug">
          Merasa terancam? Tekan tombol <span className="text-red-500 font-extrabold">SOS</span> melayang di kanan bawah kapan saja!
        </p>
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

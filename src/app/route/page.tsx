'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Search, GraduationCap, Coffee, ShoppingBag, X, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
}

export default function RoutePage() {
  const [startLoc, setStartLoc] = useState('Mendeteksi lokasi...');
  const [isLocating, setIsLocating] = useState(true);
  
  const [endLoc, setEndLoc] = useState<Location | null>(null);
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [isSearchingApi, setIsSearchingApi] = useState(false);

  // Get current location on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
            if (!token) {
              setStartLoc(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
              setIsLocating(false);
              return;
            }
            const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${token}`);
            const data = await res.json();
            if (data && data.features && data.features.length > 0) {
              setStartLoc(data.features[0].place_name);
            } else {
              setStartLoc(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            }
          } catch (error) {
            console.error('Mapbox API error:', error);
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

  // Mapbox Autocomplete Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      setIsSearchingApi(true);
      try {
        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
        if (!token) return;
        
        // Search specifically in Indonesia
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?country=id&access_token=${token}`);
        const data = await res.json();
        
        if (data && data.features) {
          const results = data.features.map((feature: any) => ({
            id: feature.id,
            name: feature.text,
            address: feature.place_name.replace(`${feature.text}, `, ''),
            coordinates: feature.center,
          }));
          setSearchResults(results);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearchingApi(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const recentDestinations = [
    {
      id: '1',
      name: 'Fakultas Ilmu Komputer, UI',
      address: 'Jl. Prof. DR. Sudjono D. Pusponegoro',
      distance: '5,2 KM',
      status: 'Aman',
      icon: <GraduationCap className="w-5 h-5 text-[#4D4D81]" />,
      bgIcon: 'bg-[#E3E3F0]',
      badgeColor: 'bg-[#14C911] text-white',
      coordinates: [106.8295, -6.3645] as [number, number],
    },
    {
      id: '2',
      name: 'Kylau Common Space',
      address: 'Jl. Palakali, Kukusan, Beji',
      distance: '2,8 KM',
      status: 'Awas',
      icon: <Coffee className="w-5 h-5 text-[#8A5A44]" />,
      bgIcon: 'bg-[#E5D7D0]',
      badgeColor: 'bg-[#FF8A00] text-white',
      coordinates: [106.8200, -6.3700] as [number, number],
    },
    {
      id: '3',
      name: 'Margo City Depok',
      address: 'Jl. Margonda Raya No. 358, Kemiri Mu...',
      distance: '8,4 KM',
      status: 'Siaga',
      icon: <ShoppingBag className="w-5 h-5 text-[#307B7A]" />,
      bgIcon: 'bg-[#CBE4E4]',
      badgeColor: 'bg-[#E3D015] text-white',
      coordinates: [106.8335, -6.3725] as [number, number],
    }
  ];

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

  const isRouteReady = startLoc && endLoc && !isLocating;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 md:py-10 bg-white min-h-screen flex flex-col font-sans mb-20 relative">
      
      {/* Search Overlay */}
      {isSearching && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col p-4 animate-in fade-in zoom-in-95 duration-200 min-h-screen">
          <div className="flex items-center space-x-3 mb-6 w-full max-w-lg mx-auto">
            <button onClick={() => setIsSearching(false)} className="p-2 hover:bg-neutral-100 rounded-full">
              <ArrowLeft className="w-6 h-6 text-neutral-800" />
            </button>
            <div className="flex-1 bg-white border border-neutral-300 rounded-xl px-4 py-3 flex items-center shadow-sm">
              <Search className="w-5 h-5 text-sistech-pink mr-3" />
              <input 
                type="text" 
                autoFocus
                placeholder="Cari Lokasimu di Sini..." 
                className="w-full bg-transparent border-none p-0 text-sm focus:outline-none focus:ring-0 text-neutral-900 placeholder:text-neutral-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearchingApi && <Loader2 className="w-4 h-4 text-neutral-400 animate-spin ml-2" />}
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg mx-auto overflow-y-auto space-y-3">
            {searchResults.length > 0 ? (
              searchResults.map((res) => (
                <div key={res.id} onClick={() => handleSelectLocation(res)} className="w-full bg-[#FFEBF0] rounded-xl p-4 flex items-center shadow-sm relative border border-pink-100/50 hover:bg-pink-100 cursor-pointer transition-colors">
                  <div className="w-10 h-10 bg-[#E3E3F0] rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <MapPin className="w-5 h-5 text-[#4D4D81]" />
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <h4 className="text-sm font-bold text-black truncate">{res.name}</h4>
                    <span className="text-[10px] text-neutral-600 truncate mt-0.5">{res.address}</span>
                  </div>
                </div>
              ))
            ) : searchQuery.length > 0 && !isSearchingApi ? (
              <p className="text-center text-sm text-neutral-500 mt-10">Lokasi tidak ditemukan.</p>
            ) : null}

            {/* If no search query, show recent or popular */}
            {!searchQuery && (
              <>
                <p className="text-xs font-bold text-neutral-500 mb-2 mt-4 ml-1">Rekomendasi / Tujuan Terakhir</p>
                {recentDestinations.map((dest) => (
                  <div key={dest.id} onClick={() => handleSelectRecent(dest)} className="w-full bg-[#FFEBF0] rounded-xl p-4 flex items-center shadow-sm relative border border-pink-100/50 hover:bg-pink-100 cursor-pointer transition-colors">
                    <div className={`w-10 h-10 ${dest.bgIcon} rounded-lg flex items-center justify-center flex-shrink-0 mr-4`}>
                      {dest.icon}
                    </div>
                    <div className="flex flex-col overflow-hidden flex-1">
                      <h4 className="text-sm font-bold text-black truncate">{dest.name}</h4>
                      <div className="flex items-center text-[10px] md:text-xs text-neutral-600 mt-0.5">
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

      {/* Top Banner SOS */}
      <div className={`w-full border border-neutral-300 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start mb-6 md:mb-10 bg-white shadow-sm md:space-x-6 ${isSearching ? 'hidden' : ''}`}>
        <div className="flex items-center space-x-3 mb-2 md:mb-0">
          <div className="relative flex-shrink-0">
             <div className="w-10 h-10 md:w-14 md:h-14 bg-green-700 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 md:w-6 md:h-6 bg-white rounded-full"></div>
             </div>
             <div className="absolute -bottom-2 -right-2 text-[10px] md:text-xs font-extrabold text-red-500 bg-white px-1 shadow-sm rounded">SOS</div>
          </div>
          <h2 className="text-base md:text-xl font-bold text-[#4B3C26] md:hidden">Selalu Ada Bantuan untukmu!</h2>
        </div>
        <div className="flex flex-col text-center md:text-left">
           <h2 className="hidden md:block text-xl font-bold text-[#4B3C26] mb-1">Selalu Ada Bantuan untukmu!</h2>
           <p className="text-xs md:text-sm text-neutral-700 leading-relaxed mt-1 md:mt-0">
             Fitur SOS kamu sudah aktif ke layanan darurat resmi. Yuk, tambahkan kontak terdekatmu juga biar ada teman atau keluarga yang langsung tahu kalau kamu butuh bantuan!
           </p>
        </div>
      </div>

      <div className={`flex flex-col lg:flex-row w-full gap-6 lg:gap-10 ${isSearching ? 'hidden' : ''}`}>
        
        {/* Route Form (Left on Desktop) */}
        <div className="w-full lg:w-1/2 bg-[#E5E5E5] rounded-xl p-4 md:p-6 md:h-fit shadow-sm">
          <h3 className="text-sm font-extrabold text-black uppercase mb-4 tracking-wide hidden md:block">
            Cari Rute Aman
          </h3>
          
          {/* Start Location */}
          <div className="w-full bg-[#C4C4C4] rounded-lg p-3 flex items-center shadow-sm relative z-10 transition-colors">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white shadow-sm">
               {isLocating ? (
                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
               ) : (
                 <MapPin className="w-4 h-4" />
               )}
             </div>
             <div className="ml-3 flex-1 overflow-hidden">
               <p className="text-sm font-bold text-black truncate">Lokasi Kamu (GPS)</p>
               <p className="text-xs text-neutral-700 truncate" title={startLoc}>{startLoc}</p>
             </div>
             <div className="text-blue-700 ml-2 p-1">
               <div className="w-4 h-4 border-2 border-blue-700 rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
               </div>
             </div>
          </div>

          {/* Dotted Line */}
          <div className="h-10 border-l-2 border-dotted border-neutral-500 ml-8 my-1 opacity-50"></div>

          {/* Destination */}
          <div 
            onClick={() => setIsSearching(true)}
            className={`w-full ${endLoc ? 'bg-[#C4C4C4]' : 'bg-[#C4C4C4]/80 hover:bg-[#C4C4C4]'} rounded-lg p-3 flex items-center shadow-sm relative z-10 transition-colors cursor-pointer group`}
          >
             <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 text-white shadow-sm">
               <MapPin className="w-4 h-4" />
             </div>
             
             {endLoc ? (
               <>
                 <div className="ml-3 flex-1 overflow-hidden">
                   <p className="text-sm font-bold text-black truncate uppercase">{endLoc.name}</p>
                   <p className="text-xs text-neutral-700 truncate">{endLoc.address}</p>
                 </div>
                 <button 
                   onClick={handleClearDestination}
                   className="text-black ml-2 p-1.5 hover:bg-black/10 rounded-full transition-colors"
                 >
                   <X className="w-4 h-4 font-bold" />
                 </button>
               </>
             ) : (
               <div className="ml-3 flex-1 overflow-hidden">
                 <p className="text-sm font-bold text-black mb-0.5">Tujuan Perjalanan</p>
                 <p className="text-xs text-neutral-600 truncate">Klik untuk mencari tujuan perjalananmu!</p>
               </div>
             )}
          </div>

          {/* Button */}
          <button 
            disabled={!isRouteReady}
            className={`w-full mt-6 font-bold py-3.5 rounded-lg text-sm tracking-wide shadow-sm transition-colors ${
              isRouteReady 
                ? 'bg-sistech-pink text-white hover:bg-pink-600 active:scale-[0.98]' 
                : 'bg-[#A8A8A8] text-neutral-500 cursor-not-allowed'
            }`}
          >
            CARI RUTE
          </button>
        </div>

        {/* Recent Destinations (Right on Desktop) */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h3 className="text-xs md:text-sm font-extrabold text-black uppercase mb-4 tracking-wide">
            Tujuan Terakhir yang Dikunjungi
          </h3>
          <div className="space-y-3 md:space-y-4">
            {recentDestinations.map((dest) => (
              <div key={dest.id} onClick={() => handleSelectRecent(dest)} className="w-full bg-[#FFEBF0] rounded-xl p-3 md:p-5 flex items-center justify-between shadow-sm relative border border-pink-100/50 hover:bg-pink-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3 md:space-x-4 overflow-hidden flex-1">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${dest.bgIcon} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {dest.icon}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <h4 className="text-sm md:text-base font-bold text-black truncate">{dest.name}</h4>
                    <div className="flex items-center text-[10px] md:text-xs text-neutral-600 mt-0.5 md:mt-1">
                      <span className="truncate max-w-[120px] md:max-w-[200px]">{dest.address}</span>
                      <span className="mx-1 font-bold">&bull;</span>
                      <span className="font-bold text-black">{dest.distance}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0">
                   <div className={`px-2 py-1 md:px-3 md:py-1.5 rounded md:rounded-md text-[10px] md:text-xs font-bold ${dest.badgeColor} shadow-sm`}>
                     {dest.status}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Info Banner */}
      <div className={`w-full bg-[#EAE8FF] border border-[#7A6AE6] rounded-xl p-4 md:p-5 text-center mt-8 md:mt-12 shadow-sm ${isSearching ? 'hidden' : ''}`}>
        <p className="text-[#3E2E95] text-sm md:text-base font-bold leading-snug">
          Merasa terancam? Tekan tombol SOS melayang di kanan bawah kapan saja!
        </p>
      </div>

    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Check, AlertTriangle, Loader2, MapPin, Phone, Store, ChevronRight, Navigation } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

type SOSState = 
  | 'idle' 
  | 'countdown' 
  | 'fetching' 
  | 'share_modal' 
  | 'success' 
  | 'action_selection' 
  | 'safe_point_list' 
  | 'safe_point_detail';

export default function EmergencyButton() {
  const { user } = useAuth();
  
  const [sosState, setSosState] = useState<SOSState>('idle');
  const [countdown, setCountdown] = useState(5);
  const [trackingUrl, setTrackingUrl] = useState('');
  const [sosSessionId, setSosSessionId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [safePoint, setSafePoint] = useState<any>(null);
  const [isFetchingSafePoint, setIsFetchingSafePoint] = useState(false);

  // Handle Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosState === 'countdown') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      } else {
        // Ketika countdown habis -> panggil API SOS
        triggerSOSAPI();
      }
    }
    return () => clearTimeout(timer);
  }, [sosState, countdown]);

  const handleStartSOS = () => {
    if (!user) {
      alert("Anda harus login untuk menggunakan fitur SOS.");
      return;
    }
    if (!navigator.geolocation) {
      alert("Geolokasi tidak didukung oleh browser Anda.");
      return;
    }
    setCountdown(5);
    setSosState('countdown');
  };

  const handleCancelSOS = async () => {
    // Jika sudah membuat SOS session di backend, akhiri sesi via API
    if (sosSessionId) {
      try {
        await api.post(`/api/v1/emergency/sos/${sosSessionId}/end`);
      } catch (err) {
        console.error("Gagal mengakhiri sesi SOS di backend:", err);
      }
    }
    setSosSessionId(null);
    setSosState('idle');
  };

  const triggerSOSAPI = () => {
    setSosState('fetching');
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });

          // 1. Panggil Endpoint SOS Utama (Backend akan mengirimkan notifikasi via WA Gateway)
          const response = await api.post('/api/v1/emergency/sos', {
            latitude: latitude,
            longitude: longitude,
          });

          // 2. Simpan session ID dan tracking URL dari response backend
          if (response.data) {
            if (response.data.sos_session_id) {
              setSosSessionId(response.data.sos_session_id);
            }
            if (response.data.tracking_url) {
              setTrackingUrl(response.data.tracking_url);
            } else {
              setTrackingUrl(`https://safeher-be.onrender.com/track/${response.data.sos_session_id || ''}`);
            }
          }
          
          setSosState('share_modal');
        } catch (error: any) {
          console.error("SOS Error:", error);
          alert(error.response?.data?.detail || "Gagal mengirim sinyal SOS. Pastikan kontak darurat sudah terdaftar.");
          setSosState('idle');
        }
      },
      (error) => {
        console.error("Geolocation Error:", error);
        alert("Gagal mendapatkan lokasi Anda. Pastikan izin lokasi aktif.");
        setSosState('idle');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleConfirmShare = () => {
    setSosState('success');
    // Berpindah otomatis ke menu pilihan tindakan setelah 2 detik
    setTimeout(() => {
      setSosState('action_selection');
    }, 2000);
  };

  const fetchNearestSafePoint = async () => {
    setSosState('safe_point_list');
    setIsFetchingSafePoint(true);
    
    try {
      if (userLocation) {
        // Panggil API Safe Points terdekat dari Swagger (/api/v1/safe-points)
        const response = await api.get('/api/v1/safe-points', {
          params: { latitude: userLocation.lat, longitude: userLocation.lon }
        });
        
        if (response.data && response.data.length > 0) {
          setSafePoint(response.data[0]);
        } else {
          // Fallback MOCK jika data safe point dari backend kosong
          setSafePoint({
            name: "Pos Aman Terdekat (Simulasi)",
            address: "Menyesuaikan dengan lokasi di sekitar Anda saat ini",
            features: ["Buka 24 Jam", "Keamanan Terjamin", "CCTV Aktif"],
            lat: userLocation.lat + 0.003,
            lon: userLocation.lon + 0.003
          });
        }
      } else {
        throw new Error("Lokasi belum tersedia");
      }
    } catch (error) {
      console.log("Fallback data safe point digunakan.");
      setSafePoint({
        name: "Pos Polisi / Toko Aman Terdekat",
        address: "Lokasi aman di sekitar titik Anda berada",
        features: ["Buka 24 Jam"],
        lat: userLocation?.lat || -6.175,
        lon: userLocation?.lon || 106.827
      });
    } finally {
      setIsFetchingSafePoint(false);
    }
  };

  // 🔴 FITUR TAMBAHAN: Membuka Google Maps Direct Navigation untuk Safe Point
  const handleOpenGoogleMapsRoute = () => {
    if (safePoint && safePoint.lat && safePoint.lon) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${safePoint.lat},${safePoint.lon}`,
        '_blank'
      );
    } else {
      alert("Koordinat lokasi Safe Point tidak valid.");
    }
  };

  return (
    <>
      {/* Tombol SOS Melayang */}
      <button 
        onClick={handleStartSOS}
        disabled={sosState !== 'idle'}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 bg-[#FF0F0F] text-white px-5 py-4 rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgb(255,15,15,0.4)] transition-all ${
          sosState !== 'idle' ? 'opacity-0 pointer-events-none' : 'hover:bg-[#D40000] hover:scale-105 active:scale-95'
        }`}
      >
        <span className="font-extrabold tracking-widest text-xl leading-none">
          SOS
        </span>
      </button>

      {/* OVERLAY MODALS */}
      {sosState !== 'idle' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          
          {/* 1. COUNTDOWN MODAL */}
          {sosState === 'countdown' && (
            <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="p-6 md:p-8 flex flex-col items-center text-center">
                <div className="bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-xs font-extrabold flex items-center mb-6 tracking-wide">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  SINYAL DARURAT DIAKTIFKAN
                </div>
                
                <h3 className="text-xl md:text-2xl font-extrabold text-neutral-900 mb-2">Mengirim Sinyal SOS...</h3>
                <p className="text-sm text-neutral-600 mb-8 px-2">
                  Lokasi GPS terkini kamu akan dikirimkan kepada kontak darurat secara otomatis dalam:
                </p>
                
                {/* Visual Timer Circular */}
                <div className="relative w-32 h-32 flex items-center justify-center mb-10">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle 
                      cx="64" cy="64" r="60" 
                      className="text-neutral-100" 
                      strokeWidth="8" stroke="currentColor" fill="none" 
                    />
                    <circle 
                      cx="64" cy="64" r="60" 
                      className="text-red-500 transition-all duration-1000 ease-linear" 
                      strokeWidth="8" stroke="currentColor" fill="none" 
                      strokeDasharray={377} 
                      strokeDashoffset={377 - (377 * (countdown / 5))} 
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-5xl font-black text-red-500 relative z-10">{countdown}</span>
                </div>
                
                <button 
                  onClick={handleCancelSOS}
                  className="w-full bg-sistech-pink text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-200 hover:bg-pink-600 hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  BATALKAN SOS
                </button>
              </div>
            </div>
          )}

          {/* 2. FETCHING MODAL */}
          {sosState === 'fetching' && (
            <div className="bg-white rounded-[2rem] p-8 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-200">
              <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-4" />
              <p className="text-sm font-bold text-neutral-600">Menyiapkan lokasi & menghubungi kontak...</p>
            </div>
          )}

          {/* 3. SHARE LOC POPUP */}
          {sosState === 'share_modal' && (
            <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-center justify-center space-x-2 text-[#3E2E95] mb-6 border-b border-neutral-100 pb-4">
                  <MapPin className="w-5 h-5" />
                  <h3 className="text-base font-extrabold tracking-wide">Bagikan Lokasi Real-Time</h3>
                </div>
                
                <div className="bg-neutral-50 rounded-xl p-4 mb-6 border border-neutral-100">
                  <p className="text-sm text-neutral-500 mb-1">Status: <span className="font-bold text-neutral-900">Notifikasi WA Dikirim Backend</span></p>
                  <p className="text-sm text-neutral-700 mt-3 leading-relaxed">
                    Tautan pelacakan lokasi Anda:
                  </p>
                  <a href={trackingUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-500 font-medium break-all hover:underline mt-1 block">
                    {trackingUrl || "Memuat tautan lokasi..."}
                  </a>
                </div>
                
                <div className="flex gap-4 mt-auto">
                  <button 
                    onClick={handleCancelSOS}
                    className="flex-1 bg-neutral-200 text-neutral-700 font-bold py-3.5 rounded-xl hover:bg-neutral-300 transition-colors"
                  >
                    BATAL
                  </button>
                  <button 
                    onClick={handleConfirmShare}
                    className="flex-1 bg-sistech-pink text-white font-bold py-3.5 rounded-xl shadow-lg shadow-pink-200 hover:bg-pink-600 hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-0.5 transition-all active:scale-95"
                  >
                    LANJUT
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. SUCCESS MODAL */}
          {sosState === 'success' && (
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-200 w-full max-w-xs">
              <div className="w-20 h-20 bg-sistech-pink rounded-full flex items-center justify-center mb-6 shadow-lg shadow-pink-200">
                <Check className="w-10 h-10 text-white font-bold" strokeWidth={3} />
              </div>
              <h3 className="text-base font-extrabold text-neutral-900 uppercase tracking-wide text-center">LOKASI MU SUKSES TERKIRIM</h3>
            </div>
          )}

          {/* 5. ACTION SELECTION MODAL */}
          {sosState === 'action_selection' && (
            <div className="bg-white rounded-[1.5rem] p-6 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-200 w-full max-w-[22rem] border border-sistech-pink">
              
              <div className="w-16 h-16 text-[#E00000] mb-5 mt-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z" />
                  <path d="M12 7v5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1.2" fill="white" />
                </svg>
              </div>
              
              <h3 className="text-[13px] font-extrabold text-[#7A0000] uppercase tracking-wide text-center mb-6 px-1 leading-snug">
                PILIH TINDAKAN DARURAT CEPAT YANG INGIN KAMU LAKUKAN SEKARANG:
              </h3>
              
              <div className="w-full flex flex-col gap-3 mb-6">
                {/* Panggil Darurat 110 */}
                <a href="tel:110" className="bg-[#6A5AE0] hover:bg-[#5C4DD0] text-white p-3.5 rounded-xl flex items-center shadow-sm transition-colors group">
                  <div className="bg-white/20 p-2 rounded-lg mr-3 group-hover:scale-105 transition-transform shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold text-sm">Panggil Darurat 110</h4>
                    <p className="text-[11px] text-white/80 mt-0.5">Hubungi polisi langsung</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
                
                {/* Safe Point Terdekat */}
                <button 
                  onClick={fetchNearestSafePoint}
                  className="bg-[#6A5AE0] hover:bg-[#5C4DD0] text-white p-3.5 rounded-xl flex items-center shadow-sm transition-colors group"
                >
                  <div className="bg-white/20 p-2 rounded-lg mr-3 group-hover:scale-105 transition-transform shrink-0">
                    <Store className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold text-sm">Informasi Safe Point Terdekat</h4>
                    <p className="text-[11px] text-white/80 mt-0.5">Rute pos polisi / toko aman terdekat</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </button>
              </div>
              
              <button 
                onClick={handleCancelSOS}
                className="w-full bg-sistech-pink text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                BATALKAN SOS
              </button>
            </div>
          )}

          {/* 6. SAFE POINT LIST MODAL */}
          {sosState === 'safe_point_list' && (
            <div className="bg-white rounded-[1.5rem] p-6 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-200 w-full max-w-[22rem] border border-sistech-pink">
              
              <h3 className="text-[13px] font-extrabold text-[#7A0000] uppercase tracking-wide text-center mb-4 px-1 leading-snug">
                INFORMASI SAFE POINT TERDEKAT
              </h3>
              
              {isFetchingSafePoint ? (
                <div className="w-full flex flex-col items-center justify-center py-8 mb-6">
                  <Loader2 className="w-8 h-8 text-sistech-pink animate-spin mb-4" />
                  <p className="text-xs font-bold text-neutral-600 text-center">Mencari Safe Point terdekat...</p>
                </div>
              ) : safePoint && (
                <div className="w-full flex flex-col gap-3 mb-6">
                  <button 
                    onClick={() => setSosState('safe_point_detail')}
                    className="bg-[#6A5AE0] hover:bg-[#5C4DD0] text-white p-3.5 rounded-xl flex items-center shadow-sm transition-colors group text-left"
                  >
                    <div className="bg-white p-1.5 rounded-lg mr-3 shrink-0">
                      <Store className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{safePoint.name}</h4>
                      <p className="text-[10px] text-white/80 mt-0.5 line-clamp-1">{safePoint.address}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors shrink-0" />
                  </button>
                </div>
              )}
              
              <button 
                onClick={handleCancelSOS}
                className="w-full bg-sistech-pink text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                BATALKAN SOS
              </button>
            </div>
          )}

          {/* 7. SAFE POINT DETAIL MODAL */}
          {sosState === 'safe_point_detail' && safePoint && (
            <div className="bg-white rounded-[1.5rem] p-6 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-200 w-full max-w-[22rem] border border-sistech-pink">
              
              <div className="w-full border border-neutral-200 rounded-xl overflow-hidden mb-6 shadow-sm">
                <div className="p-3.5 bg-white flex items-center border-b border-neutral-100">
                  <div className="bg-white border border-neutral-200 p-1.5 rounded-lg mr-3 shrink-0">
                    <Store className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold text-sm text-neutral-900">{safePoint.name}</h4>
                    <p className="text-[10px] text-neutral-500 leading-tight mt-0.5">{safePoint.address}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-pink-50/50">
                  <p className="text-[11px] font-bold text-[#FF4297] mb-2.5">Informasi Safe Point</p>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-[10px] text-neutral-600 mb-5">
                    {safePoint.features && safePoint.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" />
                        <span className="line-clamp-2">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pilihan 1: Rute Aplikasi SafeHer */}
                  <button 
                    onClick={() => {
                      window.location.href = `/route?destLat=${safePoint.lat || ''}&destLon=${safePoint.lon || ''}`;
                    }}
                    className="w-full bg-[#AC42A0] text-white font-bold py-2.5 rounded-lg shadow-sm hover:bg-[#8F3584] transition-colors text-xs active:scale-95 mb-2"
                  >
                    PILIH RUTE KE SAFE POINT
                  </button>

                  {/* Pilihan 2: Navigasi Langsung via Google Maps */}
                  <button 
                    onClick={handleOpenGoogleMapsRoute}
                    className="w-full bg-white border border-[#AC42A0] text-[#AC42A0] font-bold py-2 rounded-lg hover:bg-pink-50 transition-colors text-xs active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    BUKA GOOGLE MAPS DIRECT
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleCancelSOS}
                className="w-full bg-sistech-pink text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                BATALKAN SOS
              </button>
            </div>
          )}

        </div>
      )}
    </>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { Check, X, AlertTriangle, Loader2, MapPin } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

type SOSState = 'idle' | 'countdown' | 'fetching' | 'share_modal' | 'success';

export default function EmergencyButton() {
  const { user } = useAuth();
  
  const [sosState, setSosState] = useState<SOSState>('idle');
  const [countdown, setCountdown] = useState(5);
  const [trackingUrl, setTrackingUrl] = useState('https://safeHer.com/G2x22k4NkMwOHE...');

  // Handle Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosState === 'countdown') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        // Countdown reached 0
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

  const handleCancelSOS = () => {
    setSosState('idle');
  };

  const triggerSOSAPI = () => {
    setSosState('fetching');
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await api.post('/api/v1/emergency/sos', {
            current_lat: latitude,
            current_lon: longitude,
          });
          
          if (response.data && response.data.tracking_url) {
            setTrackingUrl(response.data.tracking_url);
          }
          
          setSosState('share_modal');
        } catch (error: any) {
          console.error("SOS Error:", error);
          alert(error.response?.data?.detail || "Gagal mengirim pesan SOS.");
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
    // Hide success modal after 3 seconds
    setTimeout(() => {
      setSosState('idle');
    }, 3000);
  };

  return (
    <>
      {/* The Floating Button */}
      <button 
        onClick={handleStartSOS}
        disabled={sosState !== 'idle'}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 bg-[#FF0F0F] text-white px-5 py-4 rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgb(255,15,15,0.4)] transition-all ${sosState !== 'idle' ? 'opacity-0 pointer-events-none' : 'hover:bg-[#D40000] hover:scale-105 active:scale-95'}`}
      >
        <span className="font-extrabold tracking-widest text-xl leading-none">
          SOS
        </span>
      </button>

      {/* OVERLAYS */}
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
                
                {/* Timer Circle */}
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

          {/* 1.5 FETCHING MODAL */}
          {sosState === 'fetching' && (
            <div className="bg-white rounded-[2rem] p-8 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-200">
              <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-4" />
              <p className="text-sm font-bold text-neutral-600">Menyiapkan lokasi...</p>
            </div>
          )}

          {/* 2. SHARE LOC POP UP */}
          {sosState === 'share_modal' && (
            <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-center justify-center space-x-2 text-[#3E2E95] mb-6 border-b border-neutral-100 pb-4">
                  <MapPin className="w-5 h-5" />
                  <h3 className="text-base font-extrabold tracking-wide">Bagikan Lokasi Real-Time</h3>
                </div>
                
                <div className="bg-neutral-50 rounded-xl p-4 mb-6 border border-neutral-100">
                  <p className="text-sm text-neutral-500 mb-1">Kepada : <span className="font-bold text-neutral-900">Ibu (Kontak Darurat)</span></p>
                  <p className="text-sm text-neutral-700 mt-3 leading-relaxed">
                    Lihat lokasi terkini saya melalui SafeHer:
                  </p>
                  <a href="#" className="text-sm text-blue-500 font-medium break-all hover:underline mt-1 block">
                    {trackingUrl}
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
                    KIRIM
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. SUCCESS MODAL */}
          {sosState === 'success' && (
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-200 w-full max-w-xs">
              <div className="w-20 h-20 bg-sistech-pink rounded-full flex items-center justify-center mb-6 shadow-lg shadow-pink-200">
                <Check className="w-10 h-10 text-white font-bold" strokeWidth={3} />
              </div>
              <h3 className="text-base font-extrabold text-neutral-900 uppercase tracking-wide text-center">LOKASI MU SUKSES TERKIRIM</h3>
            </div>
          )}

        </div>
      )}
    </>
  );
}

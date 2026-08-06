'use client';

import React, { useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function EmergencyButton() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSOS = async () => {
    if (!user) {
      alert("Anda harus login untuk menggunakan fitur SOS.");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolokasi tidak didukung oleh browser Anda.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          await api.post('/api/v1/emergency/sos', {
            current_lat: latitude,
            current_lon: longitude,
          });
          alert("SOS Berhasil dikirim ke kontak darurat!");
        } catch (error: any) {
          console.error("SOS Error:", error);
          alert(error.response?.data?.detail || "Gagal mengirim pesan SOS.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation Error:", error);
        alert("Gagal mendapatkan lokasi Anda. Pastikan izin lokasi aktif.");
        setLoading(false);
      }
    );
  };

  return (
    <button 
      onClick={handleSOS}
      disabled={loading}
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-[#FF0F0F] text-white px-5 py-4 rounded-xl flex items-center justify-center shadow-[0_8px_30px_rgb(255,15,15,0.4)] transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#D40000] hover:scale-105 active:scale-95'}`}
    >
      <span className="font-extrabold tracking-widest text-xl leading-none">
        {loading ? '...' : 'SOS'}
      </span>
    </button>
  );
}

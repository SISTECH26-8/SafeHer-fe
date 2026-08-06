'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Check } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function ReportPage() {
  const { user } = useAuth();
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [time, setTime] = useState('');
  const [locationName, setLocationName] = useState('');
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [description, setDescription] = useState('');
  
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get current location on mount
  useEffect(() => {
    setIsLocating(true);
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates([latitude, longitude]);
          
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
              headers: { 'User-Agent': 'SafeHerApp/1.0' }
            });
            const data = await res.json();
            if (data && data.display_name) {
              const shortName = data.name || data.display_name.split(',')[0];
              setLocationName(shortName);
            } else {
              setLocationName(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            }
          } catch (error) {
            console.error('OSM Geocoding error:', error);
            setLocationName(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationName('');
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setIsLocating(false);
    }
    
    // Set default time to now
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setTime(`${hours}:${minutes}`);
    
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !description || !coordinates) {
      alert('Kategori, Lokasi, dan Detail kejadian harus diisi.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const fullDescription = `[Waktu: ${time}] ${description}`;
      
      const payload = {
        category: category,
        description: fullDescription,
        lat: coordinates[0],
        lon: coordinates[1]
      };
      
      await api.post('/api/v1/reports', payload);
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        setName('');
        setCategory('');
        setDescription('');
      }, 3000);
      
    } catch (error) {
      console.error('Failed to submit report:', error);
      alert('Gagal mengirimkan laporan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 bg-white min-h-screen flex flex-col font-sans mb-20 relative">
      
      {/* Header */}
      <div className="w-full max-w-xl mx-auto mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-4 leading-snug">
          Laporkan kejadian tidak menyenangkan tanpa merasa takut atau malu
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          <span className="font-bold text-sistech-pink">SafeHer</span> memberikan ruang aman bagi para wanita yang hendak melaporkan kejadian tidak menyenangkan yang dialami tanpa harus takut privasinya akan terbongkar atau cerita tersebar tanpa izin dari pengguna melalui fitur Lapor Anonim.
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-xl mx-auto bg-[#F4F4F4] rounded-3xl p-6 md:p-8 shadow-sm relative z-10 border border-neutral-100">
        
        {/* Success Modal Overlay (if active) */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 rounded-3xl flex items-center justify-center p-4">
            <div className="bg-white border-2 border-sistech-pink rounded-2xl p-6 md:p-8 shadow-xl flex flex-col items-center animate-in zoom-in-95 duration-300 w-full max-w-xs">
              <div className="w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-white font-bold" strokeWidth={3} />
              </div>
              <h3 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wide text-center">LAPORAN MU SUKSES TERKIRIM</h3>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Nama */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-neutral-900">Nama</label>
            <input 
              type="text" 
              placeholder="Dapat dikosongkan" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => { if (!name) setName('Anonymous') }}
              className="w-full bg-[#E5E5E5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 transition-all placeholder:text-neutral-400 text-neutral-800 font-medium"
            />
          </div>

          {/* Kategori Kejadian */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-neutral-900">
              Kategori Kejadian <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select 
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#E5E5E5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 transition-all text-neutral-800 font-medium appearance-none cursor-pointer"
              >
                <option value="" disabled>Pilih Kejadian</option>
                <option value="PELECEHAN_SEKSUAL">Kekerasan / Pelecehan Seksual</option>
                <option value="TINDAK_KRIMINAL">Tindak Kriminal / Kejahatan</option>
                <option value="ORANG_MENCURIGAKAN">Orang Mencurigakan</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          {/* Waktu */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-neutral-900">
              Waktu <span className="text-red-500">*</span>
            </label>
            <input 
              type="time" 
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-[#E5E5E5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 transition-all text-neutral-800 font-medium"
            />
          </div>

          {/* Lokasi */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-neutral-900">
              Lokasi <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                required
                placeholder="Lokasi kejadian" 
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full bg-[#E5E5E5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 transition-all placeholder:text-neutral-400 text-neutral-800 font-medium"
              />
              {isLocating && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-4 h-4 text-neutral-500 animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Detail Kejadian */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-neutral-900">Detail kejadian</label>
            <textarea 
              rows={4}
              required
              placeholder="Jelaskan kejadian yang kamu alami" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#E5E5E5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 transition-all placeholder:text-neutral-400 text-neutral-800 font-medium resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-32 mx-auto block bg-sistech-pink text-white font-bold py-2.5 rounded-xl text-sm shadow-sm hover:bg-pink-600 transition-all active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : 'Kirim'}
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Info Banner */}
      <div className="w-full max-w-xl mx-auto bg-[#EAE8FF] border border-[#7A6AE6] rounded-xl p-4 text-center mt-8 shadow-sm">
        <p className="text-[#3E2E95] text-xs md:text-sm font-bold leading-snug">
          Merasa terancam? Tekan tombol SOS melayang di kanan bawah kapan saja!
        </p>
      </div>

    </div>
  );
}

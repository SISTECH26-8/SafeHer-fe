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
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-16 bg-white min-h-[calc(100vh-200px)] flex flex-col font-sans mb-10 relative">
      
      <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-start w-full">
        
        {/* Left Side: Header & Info (Sticky on Desktop) */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-24">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4 md:mb-6 leading-[1.1] tracking-tight">
            Laporkan kejadian tidak menyenangkan tanpa merasa <span className="text-sistech-pink relative">takut<svg className="absolute -bottom-2 left-0 w-full h-3 text-pink-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg></span> atau <span className="text-sistech-pink relative">malu<svg className="absolute -bottom-2 left-0 w-full h-3 text-pink-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg></span>
          </h1>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-8 md:mb-10">
            <strong className="text-sistech-pink font-extrabold">SafeHer</strong> memberikan ruang aman bagi para wanita yang hendak melaporkan kejadian tidak menyenangkan yang dialami tanpa harus takut privasinya akan terbongkar atau cerita tersebar tanpa izin dari pengguna melalui fitur Lapor Anonim.
          </p>
          
          <div className="hidden lg:flex flex-col gap-4 border-l-4 border-pink-200 pl-6 py-2">
            <div className="flex flex-col">
               <span className="text-sm font-bold text-neutral-800">100% Anonim</span>
               <span className="text-xs text-neutral-500">Identitasmu terlindungi dan tidak akan dipublikasikan.</span>
            </div>
            <div className="flex flex-col">
               <span className="text-sm font-bold text-neutral-800">Tindakan Cepat</span>
               <span className="text-xs text-neutral-500">Laporan akan diteruskan ke pihak berwenang di wilayah terkait.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="w-full lg:w-7/12 max-w-xl mx-auto lg:mx-0 bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative z-10 border border-neutral-100">
          
          {/* Success Modal Overlay (if active) */}
          {showSuccess && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 rounded-[2rem] flex items-center justify-center p-4">
              <div className="bg-white border border-pink-100 rounded-3xl p-8 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-300 w-full max-w-xs">
                <div className="w-20 h-20 bg-sistech-pink rounded-full flex items-center justify-center mb-6 shadow-lg shadow-pink-200">
                  <Check className="w-10 h-10 text-white font-bold" strokeWidth={3} />
                </div>
                <h3 className="text-base font-extrabold text-neutral-900 uppercase tracking-wide text-center">LAPORAN MU SUKSES TERKIRIM</h3>
                <p className="text-xs text-neutral-500 mt-2 text-center">Terima kasih telah berani melapor.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Nama */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-900 ml-1">Nama</label>
              <input 
                type="text" 
                placeholder="Dapat dikosongkan (Otomatis Anonim)" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => { if (!name) setName('Anonymous') }}
                className="w-full bg-neutral-50 hover:bg-neutral-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/30 focus:bg-white transition-all placeholder:text-neutral-400 text-neutral-800 font-medium border border-neutral-100"
              />
            </div>

            {/* Kategori Kejadian */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-900 ml-1">
                Kategori Kejadian <span className="text-sistech-pink">*</span>
              </label>
              <div className="relative group">
                <select 
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-neutral-50 hover:bg-neutral-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/30 focus:bg-white transition-all text-neutral-800 font-medium appearance-none cursor-pointer border border-neutral-100"
                >
                  <option value="" disabled>Pilih Kejadian</option>
                  <option value="PELECEHAN_SEKSUAL">Kekerasan / Pelecehan Seksual</option>
                  <option value="TINDAK_KRIMINAL">Tindak Kriminal / Kejahatan</option>
                  <option value="ORANG_MENCURIGAKAN">Orang Mencurigakan</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-neutral-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Waktu */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-900 ml-1">
                  Waktu <span className="text-sistech-pink">*</span>
                </label>
                <input 
                  type="time" 
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-neutral-50 hover:bg-neutral-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/30 focus:bg-white transition-all text-neutral-800 font-medium border border-neutral-100"
                />
              </div>

              {/* Lokasi */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-900 ml-1">
                  Lokasi <span className="text-sistech-pink">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    placeholder="Lokasi kejadian" 
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full bg-neutral-50 hover:bg-neutral-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/30 focus:bg-white transition-all placeholder:text-neutral-400 text-neutral-800 font-medium border border-neutral-100"
                  />
                  {isLocating && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Loader2 className="w-5 h-5 text-sistech-pink animate-spin" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detail Kejadian */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-900 ml-1">Detail kejadian</label>
              <textarea 
                rows={4}
                required
                placeholder="Jelaskan kejadian yang kamu alami sedetail mungkin..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-neutral-50 hover:bg-neutral-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/30 focus:bg-white transition-all placeholder:text-neutral-400 text-neutral-800 font-medium resize-none border border-neutral-100"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto md:min-w-[160px] mx-auto block bg-sistech-pink text-white font-extrabold py-3.5 px-8 rounded-full text-sm tracking-wide shadow-lg shadow-pink-200 hover:bg-pink-600 hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-0.5 transition-all active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : 'KIRIM LAPORAN'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Info Banner */}
      <div className="w-full max-w-2xl mx-auto bg-gradient-to-r from-[#EAE8FF] to-pink-50 border border-[#7A6AE6]/20 rounded-2xl p-5 text-center mt-12 shadow-sm">
        <p className="text-[#3E2E95] text-sm md:text-base font-bold leading-snug">
          Merasa terancam? Tekan tombol <span className="text-red-500 font-extrabold">SOS</span> melayang di kanan bawah kapan saja!
        </p>
      </div>

    </div>
  );
}

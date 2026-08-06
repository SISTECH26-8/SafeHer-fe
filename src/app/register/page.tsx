'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react';
import api from '@/lib/api';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await api.post('/api/v1/auth/register', formData);
      // Pindah ke halaman login jika sukses
      router.push('/login');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || 'Gagal mendaftar, silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10 font-sans">
      <div className="w-full max-w-sm flex flex-col items-center">
        
        {/* Logo PNG */}
        <div className="relative w-48 h-48 mb-4">
          <Image
            src="/SafeHer.png" 
            alt="SafeHer Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-sistech-pink text-center mb-8">
          Kamu ngga sendiri, kami<br />ada disini
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          
          {errorMsg && (
            <div className="w-full bg-red-100 text-red-600 p-3 rounded-xl text-sm font-semibold mb-2 text-center">
              {errorMsg}
            </div>
          )}

          {/* Full Name Input */}
          <div className="relative flex items-center">
            <User className="absolute left-4 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full bg-neutral-100 text-neutral-800 placeholder-neutral-400 pl-12 pr-4 py-3.5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-sistech-pink/30 transition-all"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative flex items-center">
            <Mail className="absolute left-4 w-5 h-5 text-neutral-400" />
            <input
              type="email"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-neutral-100 text-neutral-800 placeholder-neutral-400 pl-12 pr-4 py-3.5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-sistech-pink/30 transition-all"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div className="relative flex items-center">
            <Phone className="absolute left-4 w-5 h-5 text-neutral-400" />
            <input
              type="tel"
              placeholder="Masukkan nomor HP"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              className="w-full bg-neutral-100 text-neutral-800 placeholder-neutral-400 pl-12 pr-4 py-3.5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-sistech-pink/30 transition-all"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center">
            <Lock className="absolute left-4 w-5 h-5 text-neutral-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-neutral-100 text-neutral-800 placeholder-neutral-400 pl-12 pr-12 py-3.5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-sistech-pink/30 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-sistech-pink hover:opacity-80 transition-opacity"
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Link ke Login */}
          <div className="flex justify-end pt-1">
            <p className="text-xs font-semibold text-neutral-700">
              Punya akun?{' '}
              <Link href="/login" className="text-sistech-pink font-bold hover:underline">
                Masuk
              </Link>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sistech-pink text-white font-bold py-3.5 rounded-full shadow-md shadow-sistech-pink/20 hover:opacity-90 active:scale-[0.98] transition-all text-base mt-2 disabled:opacity-50"
          >
            {loading ? 'Daftar...' : 'Daftar'}
          </button>
        </form>

      </div>
    </div>
  );
}
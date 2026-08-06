'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
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
          Selamat datang<br />kembali!
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          
          {/* Username Input */}
          <div className="relative flex items-center">
            <User className="absolute left-4 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Masukkan username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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

          {/* Lupa Password Link */}
          <div className="flex justify-end pt-1">
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-sistech-pink hover:underline"
            >
              Lupa Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sistech-pink text-white font-bold py-3.5 rounded-full shadow-md shadow-sistech-pink/20 hover:opacity-90 active:scale-[0.98] transition-all text-base mt-2"
          >
            Masuk
          </button>
        </form>

        {/* Link ke Register */}
        <p className="text-sm font-semibold text-neutral-700 mt-4">
          Belum punya akun?{' '}
          <Link href="/register" className="text-sistech-pink font-bold hover:underline">
            Daftar
          </Link>
        </p>

        {/* Divider Social Login */}
        <div className="relative w-full flex items-center justify-center my-6">
          <div className="border-t border-neutral-200 w-full"></div>
          <span className="bg-white px-3 text-xs font-semibold text-sistech-pink absolute">
            Masuk melalui
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center space-x-6">
          {/* Google */}
          <button className="p-2 hover:scale-110 transition-transform">
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
              />
            </svg>
          </button>

          {/* Facebook */}
          <button className="p-2 hover:scale-110 transition-transform">
            <svg className="w-7 h-7 fill-[#1877F2]" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>

          {/* Apple */}
          <button className="p-2 hover:scale-110 transition-transform">
            <svg className="w-7 h-7 fill-black" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.05-.96.04-2.12.64-2.8 1.44-.6.7-.1.3 1.83-.98 3.01 1.08-.04 2.24-.68 2.79-1.4z" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
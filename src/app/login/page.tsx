'use client';

import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLogo from '@/components/ui/AuthLogo';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      // For now, redirect to map/home
      router.push('/map');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center py-12 px-6 sm:px-8 relative">
      <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <AuthLogo />
        
        <h2 className="mt-2 text-center text-[1.35rem] leading-snug font-bold tracking-tight text-sistech-pink max-w-[220px] mb-10">
          Selamat datang kembali!
        </h2>

        {errorMsg && (
          <div className="mb-4 w-full p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input
            icon={<User className="h-5 w-5" />}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Masukkan username"
          />

          <Input
            icon={<Lock className="h-5 w-5" />}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Masukkan password"
          />

          <div className="text-right w-full mt-2 mb-8">
            <Link href="/forgot-password" className="text-sm text-sistech-pink font-semibold hover:underline">
              Lupa Password?
            </Link>
          </div>

          <div className="px-6 mb-6">
            <Button type="submit" isLoading={isLoading}>
              Masuk
            </Button>
          </div>
        </form>

        <div className="w-full flex items-center justify-center mb-6">
          <div className="h-px bg-gray-200 w-1/4"></div>
          <span className="text-xs text-gray-400 px-4 font-medium">Masuk melalui</span>
          <div className="h-px bg-gray-200 w-1/4"></div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {/* Google Icon Placeholder */}
          <button type="button" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>

          {/* Facebook Icon Placeholder */}
          <button type="button" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" fill="#1877F2"/>
            </svg>
          </button>

          {/* Apple Icon Placeholder */}
          <button type="button" className="w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-sm hover:bg-neutral-800 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.24 11.51c.02 2.72 2.37 3.62 2.39 3.63-.02.05-.36 1.25-1.19 2.47-1.12 1.63-2.28 3.25-4.08 3.28-1.76.03-2.33-1.04-4.35-1.04-2.02 0-2.65 1.01-4.32 1.07-1.76.06-3.08-1.73-4.21-3.37-2.3-3.32-4.06-9.4-1.7-13.5 1.15-1.99 3.19-3.25 5.4-3.28 1.7-.03 3.32 1.14 4.35 1.14 1.02 0 2.94-1.39 5.01-1.18 1.03.04 3.48.42 5.12 2.82-.13.08-3.06 1.79-3.04 5.34l-.02-.01zM14.99 4.36c.92-1.12 1.54-2.68 1.37-4.24-1.35.05-2.98.9-3.92 2.01-.84.97-1.58 2.56-1.38 4.09 1.5.12 3.01-.73 3.93-1.86z"/>
            </svg>
          </button>
        </div>

        <div className="text-center w-full">
          <span className="text-sm text-neutral-400">Belum punya akun? </span>
          <Link href="/register" className="text-sm text-sistech-pink font-semibold hover:underline">
            Daftar
          </Link>
        </div>

      </div>
    </div>
  );
}

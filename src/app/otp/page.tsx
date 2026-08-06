'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import OtpInput from '@/components/ui/OtpInput';
import Button from '@/components/ui/Button';

export default function OtpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length < 4) return;
    
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to login or home
      router.push('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center py-12 px-6 sm:px-8 relative">
      <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <h2 className="text-center text-2xl font-bold tracking-tight text-sistech-pink mb-4">
          Verifikasi Kode
        </h2>
        
        <p className="text-center text-sm text-neutral-500 mb-8 px-4">
          Tolong masukkan kode OTP yang telah kami kirim ke <span className="text-sistech-pink">username@gmail.com</span>
        </p>

        <form onSubmit={handleVerify} className="w-full">
          <OtpInput length={4} onComplete={(val) => setOtpValue(val)} />

          <div className="text-center w-full mt-4 mb-8">
            <span className="text-xs font-semibold text-neutral-700">Tidak mendapatkan kode? </span>
            <button type="button" className="text-xs text-sistech-pink font-semibold hover:underline focus:outline-none">
              Kirim Ulang
            </button>
          </div>

          <div className="px-6">
            <Button type="submit" isLoading={isLoading} disabled={otpValue.length < 4}>
              Konfirmasi
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import OtpInput from '@/components/ui/OtpInput';
import Button from '@/components/ui/Button';

export default function ForgotPasswordOtpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isResent, setIsResent] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length < 4) return;
    
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to reset password page
      router.push('/reset-password');
    }, 1500);
  };

  const handleResend = () => {
    // Simulating resend action
    setIsResent(true);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center py-12 px-6 sm:px-8 relative">
      <div className="w-full max-w-sm flex flex-col items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <h2 className="text-2xl font-bold tracking-tight text-sistech-pink mb-4">
          {isResent ? 'Kode telah dikirim kembali' : 'Lupa Password'}
        </h2>
        
        <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
          {isResent 
            ? 'Kode OTP telah dikirim kembali, silakan masukkan kembali kode yang telah dikirim ke email Anda.'
            : 'Masukkan kode yang telah dikirim ke email yang telah kamu masukkan.'}
        </p>

        <form onSubmit={handleVerify} className="w-full">
          <OtpInput length={4} onComplete={(val) => setOtpValue(val)} />

          <div className="text-center w-full mt-4 mb-8">
            <span className="text-xs font-semibold text-neutral-700">Tidak mendapatkan kode? </span>
            <button 
              type="button" 
              onClick={handleResend}
              className="text-xs text-sistech-pink font-semibold hover:underline focus:outline-none"
            >
              Kirim ulang
            </button>
          </div>

          <div className="px-6">
            <Button type="submit" isLoading={isLoading} disabled={otpValue.length < 4}>
              Kirim
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to OTP page for forgot password
      router.push('/forgot-password/otp');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center py-12 px-6 sm:px-8 relative">
      <div className="w-full max-w-sm flex flex-col items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <h2 className="text-2xl font-bold tracking-tight text-sistech-pink mb-4">
          Lupa Password
        </h2>
        
        <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
          Masukkan email di bawah ini. Kami akan mengirimkan SMS dengan kode untuk mengonfirmasi identitasmu.
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          
          <label className="block text-sm font-bold text-neutral-900 mb-2">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Masukkan email"
            className="mb-10"
          />

          <div className="px-6">
            <Button type="submit" isLoading={isLoading} disabled={!email}>
              Kirim Pesan
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}

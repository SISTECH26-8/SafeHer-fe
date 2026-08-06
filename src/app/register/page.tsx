'use client';

import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLogo from '@/components/ui/AuthLogo';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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

    try {
      const response = await fetch('https://safeher-be.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.username, // mapped for API backward compatibility
          email: formData.email,
          password: formData.password,
          phone_number: '00000000000' // dummy value for required field
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorDetail = data.detail 
          ? (Array.isArray(data.detail) ? data.detail[0].msg : data.detail) 
          : (data.message || 'Registration failed. Please check your inputs.');
        throw new Error(errorDetail);
      }

      // Route to OTP (assuming the flow requires OTP after registration based on design)
      // Otherwise could route to login. For this demo, let's go to OTP as it's the next screen in the visual flow
      router.push('/otp'); 

    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center py-12 px-6 sm:px-8 relative">
      <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <AuthLogo />
        
        <h2 className="mt-2 text-center text-[1.35rem] leading-snug font-bold tracking-tight text-sistech-pink max-w-[220px] mb-10">
          Kamu ngga sendiri, kami ada disini
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
            icon={<Mail className="h-5 w-5" />}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Masukkan email"
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
            <span className="text-sm text-neutral-400">Punya akun? </span>
            <Link href="/login" className="text-sm text-sistech-pink font-semibold hover:underline">
              Masuk
            </Link>
          </div>

          <div className="px-6">
            <Button type="submit" isLoading={isLoading}>
              Daftar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

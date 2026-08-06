'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmPassword) return;
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Password tidak cocok');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to success page
      router.push('/reset-password/success');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center py-12 px-6 sm:px-8 relative">
      <div className="w-full max-w-sm flex flex-col items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <h2 className="text-2xl font-bold tracking-tight text-sistech-pink mb-4">
          Ubah Password
        </h2>
        
        <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
          Masukkan password dengan password baru yang telah disediakan.
        </p>

        {errorMsg && (
          <div className="mb-4 w-full p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password baru"
            className="mb-4"
          />

          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Konfirmasi password"
            className="mb-10"
          />

          <div className="px-6">
            <Button type="submit" isLoading={isLoading} disabled={!formData.password || !formData.confirmPassword}>
              Simpan
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}

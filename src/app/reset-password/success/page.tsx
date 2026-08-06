'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function ResetPasswordSuccessPage() {
  const router = useRouter();

  const handleReturn = () => {
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center py-12 px-6 sm:px-8 relative">
      <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <h2 className="text-2xl font-bold tracking-tight text-sistech-pink mb-12 text-center mt-24">
          Password berhasil dirubah!
        </h2>
        
        <div className="w-full px-6 mt-12">
          <Button onClick={handleReturn}>
            Kembali
          </Button>
        </div>

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Menu, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import EmergencyButton from '../features/EmergencyButton';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/register' || pathname === '/login';

  // State untuk menyimpan data user yang login (sementara null jika belum login)
  const [user, setUser] = useState<{ name: string } | null>(null);

  if (isAuthPage) {
    return <div className="min-h-screen w-full bg-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col relative w-full overflow-x-hidden">
      
      {/* Top Navbar */}
      <header className="h-12 md:h-16 flex items-center justify-between px-2 md:px-8 bg-white border-b border-neutral-100 z-10 w-full max-w-[1400px] mx-auto">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-1 md:space-x-2">
          <img src="/SafeHer.png" alt="SafeHer Logo" className="h-6 md:h-10 w-auto object-contain" />
        </Link>

        {/* Center: Navigation Links */}
        <nav className="flex items-center space-x-2 md:space-x-8 text-[8px] md:text-sm font-semibold ml-2">
          <Link href="/" className={`transition-colors ${pathname === '/' ? 'text-sistech-pink' : 'text-neutral-800 hover:text-sistech-pink'}`}>Beranda</Link>
          <Link href="/route" className={`transition-colors ${pathname === '/route' ? 'text-sistech-pink' : 'text-neutral-800 hover:text-sistech-pink'}`}>Rute Aman</Link>
          <Link href="/report" className={`transition-colors ${pathname === '/report' ? 'text-sistech-pink' : 'text-neutral-800 hover:text-sistech-pink'}`}>Lapor Anonim</Link>
        </nav>

        {/* Right: Auth Buttons */}
        <div className="flex items-center space-x-1 md:space-x-2 ml-auto">
          {user ? (
            <Link href="/profile" className="px-3 py-1.5 md:px-6 md:py-2 rounded-xl md:rounded-full bg-sistech-pink text-white text-[10px] md:text-sm font-bold shadow-sm shadow-sistech-pink/20 hover:opacity-90 transition-all hover:scale-105">
              {user.name}
            </Link>
          ) : (
            <>
              <Link href="/login" className="px-2 py-1 md:px-5 md:py-2 rounded-full bg-sistech-pink text-white text-[8px] md:text-sm font-bold shadow-sm shadow-sistech-pink/20 hover:opacity-90 transition-all hover:scale-105">
                Login
              </Link>
              <Link href="/register" className="px-2 py-1 md:px-5 md:py-2 rounded-full bg-sistech-pink text-white text-[8px] md:text-sm font-bold shadow-sm shadow-sistech-pink/20 hover:opacity-90 transition-all hover:scale-105">
                Signup
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-sistech-pink text-white pt-6 md:pt-12 pb-4 md:pb-6 px-2 md:px-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-row justify-between gap-2 md:gap-4 mb-4 md:mb-8">
          
          {/* Brand & Description */}
          <div className="w-1/3 max-w-xs">
            <div className="flex items-center space-x-1 md:space-x-2 mb-2 md:mb-4">
              <img src="/SafeHer.png" alt="SafeHer Logo" className="h-6 md:h-8 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-[6px] md:text-sm text-white/90 leading-relaxed mb-2 md:mb-6">
              Jalan-jalan terasa aman selama ada SafeHer yang dapat memberikan layanan yang dapat diakses dengan lancar.
            </p>
            <div className="flex space-x-1 md:space-x-3">
              <a href="#" className="w-4 h-4 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sistech-pink w-2 h-2 md:w-4 md:h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-4 h-4 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sistech-pink w-2 h-2 md:w-4 md:h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="w-4 h-4 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sistech-pink w-2 h-2 md:w-4 md:h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          <div className="flex gap-4 md:gap-24">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-1 md:space-y-3">
              <h3 className="font-bold text-[8px] md:text-lg mb-0.5 md:mb-1">Navigasi</h3>
              <Link href="/" className="text-[6px] md:text-sm text-white/90 hover:text-white transition-colors">Beranda</Link>
              <Link href="/route" className="text-[6px] md:text-sm text-white/90 hover:text-white transition-colors">Rute Aman</Link>
              <Link href="/report" className="text-[6px] md:text-sm text-white/90 hover:text-white transition-colors">Lapor Anonim</Link>
              <Link href="#" className="text-[6px] md:text-sm text-white/90 hover:text-white transition-colors">Tentang Kami</Link>
            </div>

            {/* Help Links */}
            <div className="flex flex-col space-y-1 md:space-y-3">
              <h3 className="font-bold text-[8px] md:text-lg mb-0.5 md:mb-1">Bantuan</h3>
              <a href="#" className="text-[6px] md:text-sm text-white/90 hover:text-white transition-colors">FAQ</a>
              <a href="#" className="text-[6px] md:text-sm text-white/90 hover:text-white transition-colors">Pusat Bantuan</a>
              <a href="#" className="text-[6px] md:text-sm text-white/90 hover:text-white transition-colors">Kontak Kami</a>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto border-t border-white/20 pt-2 md:pt-6 text-center text-[6px] md:text-xs text-white/80">
          © 2026 SafeHer. All Right reserved.
        </div>
      </footer>

      {/* Floating Emergency Button */}
      <EmergencyButton />
      
    </div>
  );
}

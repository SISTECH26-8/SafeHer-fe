'use client';

import React from 'react';
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

  if (isAuthPage) {
    return <div className="h-screen w-full bg-white">{children}</div>;
  }

  return (
    <div className="h-screen bg-white text-neutral-900 font-sans flex flex-col relative">
      
      {/* Top Navbar */}
      <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white border-b border-neutral-100 z-10">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-sistech-pink fill-sistech-pink" />
          <h1 className="text-xl font-extrabold text-sistech-pink tracking-tight">
            SafeHer
          </h1>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-neutral-800">
          <Link href="/" className="hover:text-sistech-pink transition-colors">Beranda</Link>
          <Link href="/route" className="hover:text-sistech-pink transition-colors">Rute Aman</Link>
          <Link href="/report" className="hover:text-sistech-pink transition-colors">Lapor Anonim</Link>
        </nav>

        {/* Right: Auth Buttons & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login" className="px-5 py-2 rounded-full bg-sistech-pink text-white text-sm font-bold shadow-md shadow-sistech-pink/20 hover:opacity-90 transition-all hover:scale-105">
              Login
            </Link>
            <Link href="/register" className="px-5 py-2 rounded-full bg-sistech-pink/15 text-sistech-pink text-sm font-bold hover:bg-sistech-pink/25 transition-all hover:scale-105">
              Signup
            </Link>
          </div>
          
          <button className="md:hidden p-2 hover:bg-neutral-100 rounded-md transition-colors text-neutral-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full overflow-y-auto">
        {children}
      </main>

      {/* Floating Emergency Button */}
      <EmergencyButton />
      
    </div>
  );
}

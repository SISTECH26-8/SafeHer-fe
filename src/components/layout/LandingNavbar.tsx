import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function LandingNavbar() {
  return (
    <nav className="w-full bg-white py-4 px-6 md:px-16 flex justify-between items-center shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill="#FF008A" fillOpacity="0.1" />
          <path d="M50 25 C 50 25, 40 15, 30 25 C 20 35, 50 60, 50 60 C 50 60, 80 35, 70 25 C 60 15, 50 25, 50 25 Z" fill="#FF008A" />
        </svg>
        <span className="font-bold text-xl text-neutral-800 tracking-tight">Safe<span className="text-sistech-pink">Her</span></span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-600">
        <Link href="/" className="text-sistech-pink">Beranda</Link>
        <Link href="/route" className="hover:text-sistech-pink transition-colors">Rute Aman</Link>
        <Link href="/report" className="hover:text-sistech-pink transition-colors">Lapor Anonim</Link>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <Link href="/login" className="px-6 py-2 rounded-full bg-sistech-pink text-white text-sm font-bold shadow-sm hover:bg-[#e61a6b] transition-all">
          Login
        </Link>
        <Link href="/register" className="px-6 py-2 rounded-full bg-sistech-pink text-white text-sm font-bold shadow-sm hover:bg-[#e61a6b] transition-all">
          Sign up
        </Link>
      </div>

      <button className="md:hidden text-neutral-700">
        <Menu className="w-6 h-6" />
      </button>
    </nav>
  );
}

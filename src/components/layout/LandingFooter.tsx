import React from 'react';

export default function LandingFooter() {
  return (
    <footer className="w-full bg-sistech-pink text-white py-12 px-6 md:px-16 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left Column */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
             <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" fill="white" fillOpacity="0.2" />
              <path d="M50 25 C 50 25, 40 15, 30 25 C 20 35, 50 60, 50 60 C 50 60, 80 35, 70 25 C 60 15, 50 25, 50 25 Z" fill="white" />
            </svg>
            <span className="font-bold text-xl tracking-tight">SafeHer</span>
          </div>
          <p className="text-sm text-white/90 leading-relaxed max-w-xs">
            Jalan-jalan terasa aman selama ada SafeHer yang dapat memberikan layanan yang dapat diakses dengan lancar.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="w-8 h-8 rounded-full bg-white text-sistech-pink flex items-center justify-center hover:bg-neutral-100 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white text-sistech-pink flex items-center justify-center hover:bg-neutral-100 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white text-sistech-pink flex items-center justify-center hover:bg-neutral-100 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col md:pl-16">
          <h3 className="font-bold text-lg mb-4">Navigasi</h3>
          <ul className="space-y-3 text-sm text-white/90">
            <li><a href="#" className="hover:text-white transition-colors">Beranda</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Rute Aman</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Lapor Anonim</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          <h3 className="font-bold text-lg mb-4">Bantuan</h3>
          <ul className="space-y-3 text-sm text-white/90">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Kontak Kami</a></li>
          </ul>
        </div>
      </div>

      <div className="w-full text-center pt-8 border-t border-white/20 text-xs text-white/80">
        @2026 SafeHer. All Right reserved.
      </div>
    </footer>
  );
}

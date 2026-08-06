'use client';

import React, { useState } from 'react';
import { MapPin, Search, GraduationCap, Coffee, ShoppingBag, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function RoutePage() {
  const [startLoc, setStartLoc] = useState('Kost Sisesa, Jalan Juragan Sinda 2, ...');
  const [endLoc, setEndLoc] = useState('');

  const recentDestinations = [
    {
      id: 1,
      name: 'Fakultas Ilmu Komputer, UI',
      address: 'Jl. Prof. DR. Sudjono D. Pusponegoro',
      distance: '5,2 KM',
      status: 'Aman',
      icon: <GraduationCap className="w-5 h-5 text-[#4D4D81]" />,
      bgIcon: 'bg-[#E3E3F0]',
      badgeColor: 'bg-[#14C911] text-white',
    },
    {
      id: 2,
      name: 'Kylau Common Space',
      address: 'Jl. Palakali, Kukusan, Beji',
      distance: '2,8 KM',
      status: 'Awas',
      icon: <Coffee className="w-5 h-5 text-[#8A5A44]" />,
      bgIcon: 'bg-[#E5D7D0]',
      badgeColor: 'bg-[#FF8A00] text-white',
    },
    {
      id: 3,
      name: 'Margo City Depok',
      address: 'Jl. Margonda Raya No. 358, Kemiri Mu...',
      distance: '8,4 KM',
      status: 'Siaga',
      icon: <ShoppingBag className="w-5 h-5 text-[#307B7A]" />,
      bgIcon: 'bg-[#CBE4E4]',
      badgeColor: 'bg-[#E3D015] text-white',
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 md:py-10 bg-white min-h-screen flex flex-col font-sans mb-20">
      
      {/* Top Banner SOS */}
      <div className="w-full border border-neutral-300 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start mb-6 md:mb-10 bg-white shadow-sm md:space-x-6">
        <div className="flex items-center space-x-3 mb-2 md:mb-0">
          {/* Custom Icon SOS */}
          <div className="relative flex-shrink-0">
             <div className="w-10 h-10 md:w-14 md:h-14 bg-green-700 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 md:w-6 md:h-6 bg-white rounded-full"></div>
             </div>
             <div className="absolute -bottom-2 -right-2 text-[10px] md:text-xs font-extrabold text-red-500 bg-white px-1 shadow-sm rounded">SOS</div>
          </div>
          <h2 className="text-base md:text-xl font-bold text-[#4B3C26] md:hidden">Selalu Ada Bantuan untukmu!</h2>
        </div>
        <div className="flex flex-col text-center md:text-left">
           <h2 className="hidden md:block text-xl font-bold text-[#4B3C26] mb-1">Selalu Ada Bantuan untukmu!</h2>
           <p className="text-xs md:text-sm text-neutral-700 leading-relaxed mt-1 md:mt-0">
             Fitur SOS kamu sudah aktif ke layanan darurat resmi. Yuk, tambahkan kontak terdekatmu juga biar ada teman atau keluarga yang langsung tahu kalau kamu butuh bantuan!
           </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-10">
        
        {/* Route Form (Left on Desktop) */}
        <div className="w-full lg:w-1/2 bg-[#E5E5E5] rounded-xl p-4 md:p-6 md:h-fit">
          <h3 className="text-sm font-extrabold text-black uppercase mb-4 tracking-wide hidden md:block">
            Cari Rute Aman
          </h3>
          
          {/* Start Location */}
          <div className="w-full bg-[#C4C4C4] rounded-lg p-3 flex items-center shadow-sm relative z-10 hover:bg-neutral-300 transition-colors cursor-pointer">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white">
               <MapPin className="w-4 h-4" />
             </div>
             <div className="ml-3 flex-1 overflow-hidden">
               <p className="text-sm font-bold text-black truncate">Lokasi Kamu (GPS)</p>
               <p className="text-xs text-neutral-800 truncate">{startLoc}</p>
             </div>
             <button className="text-blue-700 ml-2 p-2 hover:bg-blue-100 rounded-full transition-colors">
               <Search className="w-4 h-4" />
             </button>
          </div>

          {/* Dotted Line */}
          <div className="h-10 border-l-2 border-dotted border-neutral-500 ml-8 my-1"></div>

          {/* Destination */}
          <div className="w-full bg-[#C4C4C4] rounded-lg p-3 flex items-center shadow-sm relative z-10 hover:bg-neutral-300 transition-colors cursor-pointer">
             <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 text-white">
               <MapPin className="w-4 h-4" />
             </div>
             <div className="ml-3 flex-1">
               <p className="text-sm font-bold text-black">Tujuan Perjalanan</p>
               <p className="text-xs text-neutral-700">Klik untuk mencari tujuan perjalananmu!</p>
             </div>
          </div>

          {/* Button */}
          <button className="w-full mt-8 bg-[#A8A8A8] text-neutral-500 font-bold py-3.5 rounded-lg text-sm tracking-wide shadow-sm hover:bg-neutral-400 transition-colors">
            CARI RUTE
          </button>
        </div>

        {/* Recent Destinations (Right on Desktop) */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h3 className="text-xs md:text-sm font-extrabold text-black uppercase mb-4 tracking-wide">
            Tujuan Terakhir yang Dikunjungi
          </h3>
          <div className="space-y-3 md:space-y-4">
            {recentDestinations.map((dest) => (
              <div key={dest.id} className="w-full bg-[#FFEBF0] rounded-xl p-3 md:p-5 flex items-center justify-between shadow-sm relative border border-pink-100/50 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3 md:space-x-4 overflow-hidden">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${dest.bgIcon} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {dest.icon}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <h4 className="text-sm md:text-base font-bold text-black truncate">{dest.name}</h4>
                    <div className="flex items-center text-[10px] md:text-xs text-neutral-600 mt-0.5 md:mt-1">
                      <span className="truncate max-w-[120px] md:max-w-[200px]">{dest.address}</span>
                      <span className="mx-1 font-bold">&bull;</span>
                      <span className="font-bold text-black">{dest.distance}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0">
                   <div className={`px-2 py-1 md:px-3 md:py-1.5 rounded md:rounded-md text-[10px] md:text-xs font-bold ${dest.badgeColor} shadow-sm`}>
                     {dest.status}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Info Banner */}
      <div className="w-full bg-[#EAE8FF] border border-[#7A6AE6] rounded-xl p-4 md:p-5 text-center mt-8 md:mt-12 shadow-sm">
        <p className="text-[#3E2E95] text-sm md:text-base font-bold leading-snug">
          Merasa terancam? Tekan tombol SOS melayang di kanan bawah kapan saja!
        </p>
      </div>

    </div>
  );
}

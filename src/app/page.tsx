'use client';

import React from 'react';
import { MapPin, Phone, Lock, Heart, Star, Send } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white">
      
      {/* 1. Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-2 py-4 md:px-4 md:py-20 flex flex-row items-center gap-2 md:gap-16">
        <div className="w-1/2 flex flex-col items-start text-left">
          <h1 className="text-sm sm:text-xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-2 md:mb-4">
            Bisa kemana aja <br />
            tanpa takut <br />
            apapun
          </h1>
          <p className="text-neutral-600 mb-2 md:mb-8 max-w-md leading-relaxed text-[8px] sm:text-xs md:text-base">
            Mau ke suatu tempat tapi ragu aman atau ngganya? Aman - <span className="text-sistech-pink font-semibold">SafeHer</span> hadir untuk kesayanganmu. Rasakan kenyamanan melangkah dengan jalur yang aman!
          </p>
          <button className="px-3 py-1.5 md:px-8 md:py-3.5 bg-sistech-pink text-white font-bold rounded-lg md:rounded-xl shadow-sm md:shadow-lg shadow-sistech-pink/30 hover:bg-sistech-pink/90 hover:scale-105 transition-all text-[8px] sm:text-sm">
            Lihat Selengkapnya
          </button>
        </div>
        <div className="w-1/2 relative h-[150px] sm:h-[200px] md:h-[450px] rounded-lg md:rounded-3xl overflow-hidden shadow-md md:shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1542202229-7d93c2700d9b?auto=format&fit=crop&q=80&w=800" 
            alt="Forest Path" 
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="w-full max-w-4xl mx-auto px-2 md:px-4 py-4 md:py-8 mb-4 md:mb-12">
        <div className="flex justify-between items-center text-center">
          <div className="flex flex-col items-center">
            <h2 className="text-lg md:text-4xl font-extrabold text-sistech-pink/50 mb-0.5 md:mb-1">150+</h2>
            <p className="text-[8px] md:text-base font-bold text-neutral-800">Pengguna puas</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg md:text-4xl font-extrabold text-sistech-pink/50 mb-0.5 md:mb-1">80%</h2>
            <p className="text-[8px] md:text-base font-bold text-neutral-800">Terpercaya oleh<br />para wanita</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg md:text-4xl font-extrabold text-sistech-pink/50 mb-0.5 md:mb-1 flex items-center">4.5<Star className="w-3 h-3 md:w-8 md:h-8 fill-sistech-pink/50 text-sistech-pink/50 ml-0.5 md:ml-1" /></h2>
            <p className="text-[8px] md:text-base font-bold text-neutral-800">Website terbaik<br />2026</p>
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section className="w-full max-w-5xl mx-auto px-2 md:px-4 py-4 md:py-12 flex flex-row items-center justify-center gap-4 md:gap-12 mb-4 md:mb-12">
        <div className="w-1/2 flex justify-center">
          <div className="relative w-32 h-32 md:w-80 md:h-80">
            <img src="/SafeHer.png" alt="SafeHer Icon" className="w-full h-full object-contain" />
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-start relative">
          <h2 className="text-xs sm:text-base md:text-3xl font-extrabold text-sistech-pink mb-1 md:mb-4">
            Platform keselamatan<br />wanita terbaik di<br />Jabodetabek
          </h2>
          <p className="text-neutral-700 text-[8px] sm:text-xs md:text-base leading-relaxed max-w-sm mb-2 md:mb-6">
            <span className="text-sistech-pink font-bold">SafeHer</span> hadir sebagai website keselamatan wanita yang dapat memberikan hak berupa kenyamanan dan keamanan pada wanita.
          </p>
          <div className="self-end mt-1 md:mt-4">
            <button className="px-3 py-1 md:px-6 md:py-2 bg-red-600 text-white text-xs md:text-2xl font-black rounded-md md:rounded-xl shadow-md border-b-2 md:border-b-4 border-red-800 hover:scale-105 transition-transform tracking-widest">
              SOS
            </button>
          </div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section className="w-full max-w-5xl mx-auto px-2 md:px-4 py-4 md:py-12 flex flex-col items-center text-center">
        <h2 className="text-sm md:text-2xl font-extrabold text-neutral-900 mb-4 md:mb-10">Layanan SafeHer</h2>
        
        <div className="grid grid-cols-3 gap-2 md:gap-8 w-full">
          
          <Link href="/route" className="flex flex-col items-center group cursor-pointer">
            <div className="w-full h-24 sm:h-32 md:h-56 bg-green-100 rounded-xl md:rounded-3xl overflow-hidden mb-2 md:mb-4 shadow-sm md:shadow-md group-hover:-translate-y-1 transition-transform relative">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" alt="Map" className="object-cover w-full h-full opacity-60 mix-blend-multiply" />
            </div>
            <h3 className="text-[10px] sm:text-xs md:text-lg font-bold text-neutral-900">Rute Aman</h3>
          </Link>

          <Link href="/report" className="flex flex-col items-center group cursor-pointer">
            <div className="w-full h-24 sm:h-32 md:h-56 bg-neutral-100 border border-neutral-200 rounded-xl md:rounded-3xl overflow-hidden mb-2 md:mb-4 shadow-sm md:shadow-md group-hover:-translate-y-1 transition-transform p-2 md:p-4 relative flex flex-col items-center justify-center">
               <div className="w-11/12 h-5/6 bg-white rounded-lg md:rounded-xl shadow-sm border border-neutral-200 flex flex-col items-center p-1 md:p-3 relative">
                 <div className="w-full h-1 md:h-4 bg-neutral-100 rounded-full mb-1 md:mb-2"></div>
                 <div className="w-3/4 h-1 md:h-4 bg-neutral-100 rounded-full mb-2 md:mb-4"></div>
                 <div className="w-full h-3 md:h-8 bg-neutral-50 rounded border border-neutral-200 mb-1 md:mb-2"></div>
                 <div className="w-full h-6 md:h-16 bg-neutral-50 rounded border border-neutral-200 mb-1 md:mb-2"></div>
                 <div className="w-1/2 h-2 md:h-6 bg-red-500 rounded mt-auto"></div>
               </div>
            </div>
            <h3 className="text-[10px] sm:text-xs md:text-lg font-bold text-neutral-900">Lapor Anonim</h3>
          </Link>

          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-full h-24 sm:h-32 md:h-56 bg-red-50 rounded-xl md:rounded-3xl overflow-hidden mb-2 md:mb-4 shadow-sm md:shadow-md group-hover:-translate-y-1 transition-transform border border-red-100 flex flex-col items-center justify-center">
              <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border-2 md:border-4 border-red-500 flex items-center justify-center bg-white shadow-inner">
                <div className="w-12 h-12 md:w-24 md:h-24 rounded-full bg-red-50 flex items-center justify-center">
                  <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-xs md:text-xl font-black shadow-lg">
                    5
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-[10px] sm:text-xs md:text-lg font-bold text-neutral-900">SOS</h3>
          </div>

        </div>
      </section>

      {/* 5. Why Choose Tags Section */}
      <section className="w-full max-w-4xl mx-auto px-2 md:px-4 py-8 md:py-16 flex flex-col items-center relative min-h-[200px] md:min-h-[350px]">
        
        <h2 className="text-sm md:text-2xl font-extrabold text-neutral-900 mb-4 md:mb-8 z-10 relative mt-10 md:mt-20 text-center">
          Kenapa harus <br />
          memilih <span className="text-sistech-pink">SafeHer</span>?
        </h2>

        {/* Floating Tags */}
        <div className="absolute top-0 right-2 md:right-10 px-2 py-1 md:px-4 md:py-2 bg-sistech-pink/30 text-sistech-pink text-[6px] md:text-sm font-semibold rounded-full rotate-2 transform hover:scale-105 transition-transform max-w-[100px] md:max-w-[200px] text-center shadow-sm">
          Aman menyampaikan kekhawatiran tanpa harus malu
        </div>
        
        <div className="absolute top-10 left-2 md:left-20 px-2 py-1 md:px-4 md:py-2 bg-sistech-pink/40 text-sistech-purple text-[6px] md:text-sm font-semibold rounded-full -rotate-3 transform hover:scale-105 transition-transform max-w-[100px] md:max-w-xs text-center shadow-sm">
          Solusi cerdas bagi wanita yang ingin jalan sendirian
        </div>
        
        <div className="absolute bottom-6 left-4 md:left-32 px-3 py-1.5 md:px-5 md:py-2.5 bg-sistech-pink/40 text-sistech-purple text-[6px] md:text-sm font-semibold rounded-full -rotate-2 transform hover:scale-105 transition-transform shadow-sm">
          SOS lebih dari satu fungsi
        </div>
        
        <div className="absolute bottom-2 right-4 md:right-32 px-3 py-1.5 md:px-5 md:py-2.5 bg-sistech-pink/30 text-sistech-purple text-[6px] md:text-sm font-semibold rounded-full rotate-3 transform hover:scale-105 transition-transform shadow-sm">
          Update kondisi jalan 24/7
        </div>

      </section>

      {/* 6. Testimonials Section */}
      <section className="w-full max-w-5xl mx-auto px-2 md:px-4 py-8 md:py-12 flex flex-col items-center text-center">
        <h2 className="text-sm md:text-2xl font-extrabold text-neutral-900 mb-4 md:mb-10">Testimoni SafeHer</h2>
        
        <div className="grid grid-cols-2 gap-2 md:gap-8 w-full text-left">
          
          <div className="bg-white p-2 md:p-6 rounded-lg md:rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-shadow">
            <div className="flex items-center space-x-1 md:space-x-4 mb-1 md:mb-4">
              <div className="w-6 h-6 md:w-12 md:h-12 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                <img src="https://i.pravatar.cc/150?img=5" alt="Liliana Putri" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-extrabold text-neutral-900 text-[8px] md:text-base">Liliana Putri</h3>
            </div>
            <p className="text-[6px] md:text-sm text-neutral-700 leading-relaxed">
              "aku pernah ngerasa takut pas jalan malam-malam, tapi sekarang ngga lagi karena udah ada SafeHer yang bisa bantu aku kasih rekomendasi jalan yang aman!"
            </p>
          </div>

          <div className="bg-white p-2 md:p-6 rounded-lg md:rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-shadow">
            <div className="flex items-center space-x-1 md:space-x-4 mb-1 md:mb-4">
              <div className="w-6 h-6 md:w-12 md:h-12 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                <img src="https://i.pravatar.cc/150?img=9" alt="Ananda Zahira" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-extrabold text-neutral-900 text-[8px] md:text-base">Ananda Zahira</h3>
            </div>
            <p className="text-[6px] md:text-sm text-neutral-700 leading-relaxed">
              "Awalnya ragu pas teman bilang kalau website ini sangat membantu kalau jalan sendirian ketika malam hari, tapi pas aku coba malah ngerasa ini sangat membantu."
            </p>
          </div>

          <div className="bg-white p-2 md:p-6 rounded-lg md:rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-shadow">
            <div className="flex items-center space-x-1 md:space-x-4 mb-1 md:mb-4">
              <div className="w-6 h-6 md:w-12 md:h-12 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                <img src="https://i.pravatar.cc/150?img=32" alt="Rina Melda" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-extrabold text-neutral-900 text-[8px] md:text-base">Rina Melda</h3>
            </div>
            <p className="text-[6px] md:text-sm text-neutral-700 leading-relaxed">
              "IH DEMI DEH SAFEHER BENERAN KEREN BANGETTT PAKET UNTUK FITUR-FITURNYA. AKU BERTERIMAKASIH KEPADA YANG SUDAH MENCIPTAKAN SAFEHER, WUFF YU &lt;3"
            </p>
          </div>

          <div className="bg-white p-2 md:p-6 rounded-lg md:rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-shadow">
            <div className="flex items-center space-x-1 md:space-x-4 mb-1 md:mb-4">
              <div className="w-6 h-6 md:w-12 md:h-12 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                <img src="https://i.pravatar.cc/150?img=47" alt="Citra Lestari" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-extrabold text-neutral-900 text-[8px] md:text-base">Citra Lestari</h3>
            </div>
            <p className="text-[6px] md:text-sm text-neutral-700 leading-relaxed">
              "Jujur baru kali ini ngelihat website yang mementingkan keselamatan wanita dengan fitur yang sangat fungsional, aku takjub dengan dedikasi para pembuat SafeHer dan ingin berterimakasih atas adanya website ini."
            </p>
          </div>

        </div>
      </section>

      {/* 7. Contact Section */}
      <section className="w-full max-w-3xl mx-auto px-2 md:px-4 py-8 md:py-16 flex flex-col items-center md:items-start mb-4 md:mb-10 text-center md:text-left">
        <h2 className="text-sm md:text-2xl font-extrabold text-neutral-900 leading-snug mb-4">
          Tanyakan apapun ke <span className="text-sistech-pink">SafeHer</span>
        </h2>
        
        <form className="w-full flex flex-col gap-2 md:gap-4">
          <div className="flex flex-row gap-2 md:gap-4 w-full">
            <div className="flex flex-col gap-2 md:gap-4 w-1/2">
              <input 
                type="email" 
                placeholder="Email Pengguna" 
                className="w-full bg-neutral-100/70 border-none rounded-md md:rounded-xl px-2 py-1.5 md:px-4 md:py-3 text-[8px] md:text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 placeholder:text-neutral-400"
              />
              <input 
                type="text" 
                placeholder="Subjek" 
                className="w-full bg-neutral-100/70 border-none rounded-md md:rounded-xl px-2 py-1.5 md:px-4 md:py-3 text-[8px] md:text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 placeholder:text-neutral-400"
              />
              <input 
                type="text" 
                placeholder="Email Penerima" 
                className="w-full bg-neutral-100/70 border-none rounded-md md:rounded-xl px-2 py-1.5 md:px-4 md:py-3 text-[8px] md:text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 placeholder:text-neutral-400"
              />
            </div>
            <textarea 
              placeholder="Ketik pesan disini..." 
              className="w-1/2 bg-neutral-100/70 border-none rounded-md md:rounded-xl px-2 py-1.5 md:px-4 md:py-3 text-[8px] md:text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 placeholder:text-neutral-400 resize-none"
            ></textarea>
          </div>
          
          <div className="flex justify-center mt-2 md:mt-0">
            <button type="button" className="px-6 py-1.5 md:px-10 md:py-3 bg-sistech-pink text-white font-bold rounded-full shadow-sm md:shadow-md shadow-sistech-pink/30 hover:bg-sistech-pink/90 hover:scale-105 transition-all text-[10px] md:text-sm">
              Kirim
            </button>
          </div>
        </form>
      </section>

      {/* 8. Pre-footer Banner */}
      <section className="w-full max-w-3xl mx-auto px-2 md:px-4 pb-10 md:pb-20 pt-4 md:pt-8">
        <div className="w-full border border-sistech-purple/30 bg-sistech-purple/5 rounded-lg md:rounded-2xl p-3 md:p-6 text-center shadow-sm">
          <p className="text-sistech-purple font-bold text-[8px] md:text-base">
            Merasa terancam? Tekan tombol SOS melayang di kanan bawah kapan saja!
          </p>
        </div>
      </section>

    </div>
  );
}
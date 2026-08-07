'use client';

import React from 'react';
import { MapPin, Phone, Lock, Heart, Star, Send } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white">
      
      {/* 1. Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-8 md:py-20 flex flex-col md:flex-row items-center gap-6 md:gap-16">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
            Bisa kemana aja <br />
            tanpa takut <br />
            apapun
          </h1>
          <p className="text-neutral-600 mb-6 md:mb-8 max-w-md leading-relaxed text-sm md:text-base">
            Mau ke suatu tempat tapi ragu aman atau ngganya? Aman - <span className="text-sistech-pink font-semibold">SafeHer</span> hadir untuk kesayanganmu. Rasakan kenyamanan melangkah dengan jalur yang aman!
          </p>
          <button className="px-6 py-3 md:px-8 md:py-3.5 bg-sistech-pink text-white font-bold rounded-xl shadow-lg shadow-sistech-pink/30 hover:bg-sistech-pink/90 hover:scale-105 transition-all text-sm">
            Lihat Selengkapnya
          </button>
        </div>
        <div className="w-full md:w-1/2 relative h-[250px] sm:h-[300px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl order-1 md:order-2">
          <img 
            src="/forest-path.jpg" 
            alt="Forest Path" 
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="w-full max-w-4xl mx-auto px-4 md:px-4 py-8 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-center gap-8 md:gap-4">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-sistech-pink/50 mb-1">150+</h2>
            <p className="text-sm md:text-base font-bold text-neutral-800">Pengguna puas</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-sistech-pink/50 mb-1">80%</h2>
            <p className="text-sm md:text-base font-bold text-neutral-800">Terpercaya oleh<br />para wanita</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-sistech-pink/50 mb-1 flex items-center">4.5<Star className="w-6 h-6 md:w-8 md:h-8 fill-sistech-pink/50 text-sistech-pink/50 ml-1" /></h2>
            <p className="text-sm md:text-base font-bold text-neutral-800">Website terbaik<br />2026</p>
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8 md:mb-12">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-48 h-48 md:w-80 md:h-80">
            <img src="/SafeHer.png" alt="SafeHer Icon" className="w-full h-full object-contain" />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sistech-pink mb-4 leading-tight">
            Platform keselamatan<br />wanita terbaik di<br />Jabodetabek
          </h2>
          <p className="text-neutral-700 text-sm sm:text-base leading-relaxed max-w-sm mb-6">
            <span className="text-sistech-pink font-bold">SafeHer</span> hadir sebagai website keselamatan wanita yang dapat memberikan hak berupa kenyamanan dan keamanan pada wanita.
          </p>
          <div className="mt-2 md:mt-4">
            <button className="px-8 py-3 md:px-10 md:py-4 bg-red-600 text-white text-xl md:text-2xl font-black rounded-xl shadow-lg border-b-4 border-red-800 hover:scale-105 transition-transform tracking-widest">
              SOS
            </button>
          </div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-8 md:mb-12">Layanan SafeHer</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          
          <Link href="/route" className="flex flex-col items-center group cursor-pointer w-full">
            <div className="w-full h-48 md:h-64 bg-green-100 rounded-3xl overflow-hidden mb-4 shadow-md group-hover:-translate-y-2 transition-transform relative">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" alt="Map" className="object-cover w-full h-full opacity-60 mix-blend-multiply" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-neutral-900">Rute Aman</h3>
          </Link>

          <Link href="/report" className="flex flex-col items-center group cursor-pointer w-full">
            <div className="w-full h-48 md:h-64 bg-neutral-100 border border-neutral-200 rounded-3xl overflow-hidden mb-4 shadow-md group-hover:-translate-y-2 transition-transform p-4 relative flex flex-col items-center justify-center">
               <div className="w-10/12 md:w-11/12 h-5/6 bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col items-center p-3 relative">
                 <div className="w-full h-3 md:h-4 bg-neutral-100 rounded-full mb-2"></div>
                 <div className="w-3/4 h-3 md:h-4 bg-neutral-100 rounded-full mb-4"></div>
                 <div className="w-full h-6 md:h-8 bg-neutral-50 rounded border border-neutral-200 mb-2"></div>
                 <div className="w-full h-12 md:h-16 bg-neutral-50 rounded border border-neutral-200 mb-2"></div>
                 <div className="w-1/2 h-4 md:h-6 bg-red-500 rounded mt-auto"></div>
               </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-neutral-900">Lapor Anonim</h3>
          </Link>

          <div className="flex flex-col items-center group cursor-pointer w-full">
            <div className="w-full h-48 md:h-64 bg-red-50 rounded-3xl overflow-hidden mb-4 shadow-md group-hover:-translate-y-2 transition-transform border border-red-100 flex flex-col items-center justify-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-red-500 flex items-center justify-center bg-white shadow-inner">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-50 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-xl md:text-2xl font-black shadow-lg">
                    SOS
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-neutral-900">SOS</h3>
          </div>

        </div>
      </section>

      {/* 5. Why Choose Tags Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12 md:py-16 flex flex-col items-center relative min-h-[300px] md:min-h-[350px]">
        
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-8 z-10 relative mt-10 md:mt-20 text-center">
          Kenapa harus <br />
          memilih <span className="text-sistech-pink">SafeHer</span>?
        </h2>

        {/* Floating Tags */}
        <div className="absolute top-0 right-2 md:right-10 px-4 py-2 bg-sistech-pink/30 text-sistech-pink text-[10px] md:text-sm font-semibold rounded-full rotate-2 transform hover:scale-105 transition-transform max-w-[150px] md:max-w-[200px] text-center shadow-sm">
          Aman menyampaikan kekhawatiran tanpa harus malu
        </div>
        
        <div className="absolute top-16 left-2 md:left-20 px-4 py-2 bg-sistech-pink/40 text-sistech-purple text-[10px] md:text-sm font-semibold rounded-full -rotate-3 transform hover:scale-105 transition-transform max-w-[150px] md:max-w-xs text-center shadow-sm">
          Solusi cerdas bagi wanita yang ingin jalan sendirian
        </div>
        
        <div className="absolute bottom-12 left-4 md:left-32 px-5 py-2.5 bg-sistech-pink/40 text-sistech-purple text-[10px] md:text-sm font-semibold rounded-full -rotate-2 transform hover:scale-105 transition-transform shadow-sm">
          SOS lebih dari satu fungsi
        </div>
        
        <div className="absolute bottom-2 right-4 md:right-32 px-5 py-2.5 bg-sistech-pink/30 text-sistech-purple text-[10px] md:text-sm font-semibold rounded-full rotate-3 transform hover:scale-105 transition-transform shadow-sm">
          Update kondisi jalan 24/7
        </div>

      </section>

      {/* 6. Testimonials Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12 flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-8 md:mb-10">Testimoni SafeHer</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
          
          <div className="bg-white p-4 md:p-6 rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-shadow">
            <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                <img src="https://i.pravatar.cc/150?img=5" alt="Liliana Putri" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-extrabold text-neutral-900 text-sm md:text-base">Liliana Putri</h3>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              "aku pernah ngerasa takut pas jalan malam-malam, tapi sekarang ngga lagi karena udah ada SafeHer yang bisa bantu aku kasih rekomendasi jalan yang aman!"
            </p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-shadow">
            <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                <img src="https://i.pravatar.cc/150?img=9" alt="Ananda Zahira" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-extrabold text-neutral-900 text-sm md:text-base">Ananda Zahira</h3>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              "Awalnya ragu pas teman bilang kalau website ini sangat membantu kalau jalan sendirian ketika malam hari, tapi pas aku coba malah ngerasa ini sangat membantu."
            </p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-shadow">
            <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                <img src="https://i.pravatar.cc/150?img=32" alt="Rina Melda" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-extrabold text-neutral-900 text-sm md:text-base">Rina Melda</h3>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              "IH DEMI DEH SAFEHER BENERAN KEREN BANGETTT PAKET UNTUK FITUR-FITURNYA. AKU BERTERIMAKASIH KEPADA YANG SUDAH MENCIPTAKAN SAFEHER, WUFF YU &lt;3"
            </p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-shadow">
            <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                <img src="https://i.pravatar.cc/150?img=47" alt="Citra Lestari" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-extrabold text-neutral-900 text-sm md:text-base">Citra Lestari</h3>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              "Jujur baru kali ini ngelihat website yang mementingkan keselamatan wanita dengan fitur yang sangat fungsional, aku takjub dengan dedikasi para pembuat SafeHer dan ingin berterimakasih atas adanya website ini."
            </p>
          </div>

        </div>
      </section>

      {/* 7. Contact Section */}
      <section className="w-full max-w-3xl mx-auto px-4 py-12 md:py-16 flex flex-col items-center md:items-start mb-8 md:mb-10 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 leading-snug mb-6">
          Tanyakan apapun ke <span className="text-sistech-pink">SafeHer</span>
        </h2>
        
        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <input 
                type="email" 
                placeholder="Email Pengguna" 
                className="w-full bg-neutral-100/70 border-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 placeholder:text-neutral-400"
              />
              <input 
                type="text" 
                placeholder="Subjek" 
                className="w-full bg-neutral-100/70 border-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 placeholder:text-neutral-400"
              />
              <input 
                type="text" 
                placeholder="Email Penerima" 
                className="w-full bg-neutral-100/70 border-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 placeholder:text-neutral-400"
              />
            </div>
            <textarea 
              placeholder="Ketik pesan disini..." 
              className="w-full md:w-1/2 bg-neutral-100/70 border-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sistech-pink/50 placeholder:text-neutral-400 resize-none min-h-[120px] md:min-h-0"
            ></textarea>
          </div>
          
          <div className="flex justify-center md:justify-end mt-4 md:mt-0">
            <button type="button" className="px-10 py-3 bg-sistech-pink text-white font-bold rounded-full shadow-md shadow-sistech-pink/30 hover:bg-sistech-pink/90 hover:scale-105 transition-all text-sm w-full md:w-auto">
              Kirim
            </button>
          </div>
        </form>
      </section>

      {/* 8. Pre-footer Banner */}
      <section className="w-full max-w-3xl mx-auto px-4 pb-12 md:pb-20 pt-4 md:pt-8">
        <div className="w-full border border-sistech-purple/30 bg-sistech-purple/5 rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-sm">
          <p className="text-sistech-purple font-bold text-sm md:text-base">
            Merasa terancam? Tekan tombol SOS melayang di kanan bawah kapan saja!
          </p>
        </div>
      </section>

    </div>
  );
}
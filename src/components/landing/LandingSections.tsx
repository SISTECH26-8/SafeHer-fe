import React from 'react';
import Link from 'next/link';
import AuthLogo from '../ui/AuthLogo';

export function HeroSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 md:px-16 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 flex flex-col items-start">
        <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-neutral-900 leading-[1.1] mb-6">
          Bisa kemana aja <br />
          tanpa takut <br />
          apapun
        </h1>
        <p className="text-neutral-600 mb-8 max-w-md leading-relaxed">
          Mau ke suatu tempat tapi ragu aman atau ngganya? Aman - <span className="text-sistech-pink font-semibold">SafeHer</span> hadir untuk kamu semua. Rasakan kenyamanan melangkah dengan jalur yang aman!
        </p>
        <Link href="/about" className="px-8 py-3.5 bg-sistech-pink text-white rounded-full font-bold shadow-lg shadow-sistech-pink/30 hover:bg-[#e61a6b] transition-all">
          Lihat Selengkapnya
        </Link>
      </div>
      <div className="flex-1 w-full relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        {/* Placeholder image from Unsplash to match the vibe */}
        <img 
          src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop" 
          alt="Woman walking safely" 
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 md:px-16 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center">
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-5xl font-extrabold text-sistech-pink mb-2">150+</span>
          <span className="font-semibold text-neutral-700">Pengguna puas</span>
        </div>
        <div className="hidden md:block w-px h-16 bg-neutral-200"></div>
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-5xl font-extrabold text-sistech-pink mb-2">80%</span>
          <span className="font-semibold text-neutral-700">Terpercaya oleh<br />para wanita</span>
        </div>
        <div className="hidden md:block w-px h-16 bg-neutral-200"></div>
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-5xl font-extrabold text-sistech-pink mb-2">4.5<span className="text-2xl">★</span></span>
          <span className="font-semibold text-neutral-700">Website terbaik<br />2026</span>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 md:px-16 py-16 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 flex justify-center">
        <AuthLogo className="scale-150 transform origin-center" />
      </div>
      <div className="flex-1 flex flex-col items-start">
        <h2 className="text-2xl md:text-3xl font-extrabold text-sistech-pink mb-4 leading-tight">
          Platform keselamatan<br />wanita terbaik di<br />Jabodetabek
        </h2>
        <p className="text-neutral-600 leading-relaxed">
          <span className="font-bold text-sistech-pink">SafeHer</span> hadir sebagai website keselamatan wanita yang dapat memberikan hak berupa kenyamanan dan keamanan pada wanita.
        </p>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 md:px-16 py-16 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-neutral-900 mb-12">Layanan SafeHer</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {/* Card 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-full aspect-[4/5] bg-[#E8F3ED] rounded-3xl mb-6 overflow-hidden shadow-sm border border-neutral-100 flex items-center justify-center p-4">
             {/* Map placeholder image */}
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop" alt="Rute Aman Map" className="w-full h-full object-cover rounded-2xl opacity-80" />
          </div>
          <h3 className="font-bold text-xl text-neutral-900">Rute Aman</h3>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-full aspect-[4/5] bg-neutral-50 rounded-3xl mb-6 overflow-hidden shadow-sm border border-neutral-100 p-6 flex flex-col">
             <div className="text-left text-[10px] text-neutral-400 mb-2 font-bold">Lapor anonimmu aman disini</div>
             <div className="bg-white rounded-xl shadow-sm border border-neutral-100 flex-1 p-4 flex flex-col gap-3">
                <div className="h-4 bg-neutral-100 rounded-full w-1/3"></div>
                <div className="h-8 bg-neutral-100 rounded-lg w-full"></div>
                <div className="h-4 bg-neutral-100 rounded-full w-1/2"></div>
                <div className="h-16 bg-neutral-100 rounded-lg w-full"></div>
                <div className="mt-auto h-8 bg-sistech-pink rounded-lg w-full flex items-center justify-center text-white font-bold text-xs">SOS</div>
             </div>
          </div>
          <h3 className="font-bold text-xl text-neutral-900">Lapor Anonim</h3>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-full aspect-[4/5] bg-red-50 rounded-3xl mb-6 overflow-hidden shadow-sm border border-red-100 p-6 flex flex-col items-center justify-center">
             <div className="w-32 h-32 rounded-full border-4 border-red-200 flex items-center justify-center mb-4">
               <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-5xl font-extrabold text-red-500">5</span>
               </div>
             </div>
             <div className="bg-red-500 text-white font-bold px-6 py-2 rounded-full">BATALKAN SOS</div>
          </div>
          <h3 className="font-bold text-xl text-neutral-900">SOS</h3>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 md:px-16 py-16 flex flex-col items-center text-center">
      <h2 className="text-3xl font-extrabold text-neutral-900 mb-12">
        Kenapa harus <br/> memilih <span className="text-sistech-pink">SafeHer</span>?
      </h2>
      
      <div className="relative w-full max-w-3xl flex flex-col gap-6 items-center">
        {/* Simulating scattered layout with flex and margins */}
        <div className="flex justify-end w-full md:pr-12">
          <div className="bg-sistech-pink/20 text-sistech-pink font-semibold px-6 py-3 rounded-full text-sm md:text-base shadow-sm backdrop-blur-sm border border-sistech-pink/10">
            Aman menyampaikan kekhawatiran tanpa harus malu
          </div>
        </div>
        
        <div className="flex justify-start w-full md:pl-12">
          <div className="bg-sistech-pink/20 text-sistech-pink font-semibold px-6 py-3 rounded-full text-sm md:text-base shadow-sm backdrop-blur-sm border border-sistech-pink/10">
            Solusi cerdas bagi wanita pergi ke jalan sendirian
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center w-full gap-4 md:gap-12 mt-4">
          <div className="bg-sistech-pink/20 text-sistech-pink font-semibold px-6 py-3 rounded-full text-sm md:text-base shadow-sm backdrop-blur-sm border border-sistech-pink/10">
            SOS lebih dari satu fungsi
          </div>
          <div className="bg-sistech-pink/20 text-sistech-pink font-semibold px-6 py-3 rounded-full text-sm md:text-base shadow-sm backdrop-blur-sm border border-sistech-pink/10">
            Update kondisi jalan 24/7
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Liliana Putri",
      text: "\"aku pernah ngerasa takut pas jalan malam-malam, tapi sekarang ngga lagi karena udah ada SafeHer yang bisa bantu aku kasih rekomendasi jalan yang aman!\"",
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Ananda Zahira",
      text: "\"Awalnya ragu pas teman bilang kalo website ini sangat membantu kalau jalan sendirian ketika malam hari, tapi pas aku coba malah ngerasain sangat membantu.\"",
      img: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "Rina Melda",
      text: "\"INI DEMI DEH SAFEHER BENERAN KEREN BANGETTT PAKET UNTUK FITUR-FITURNYA. AKU BERTERIMAKASIH KEPADA YANG SUDAH MENCIPTAKAN SAFEHER, WUFF YU <3\"",
      img: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    {
      name: "Citra Lestari",
      text: "\"Jujur baru kali ini ngelihat website yang mementingkan keselamatan wanita dengan fiturnya yang sangat fungsional, aku takjub dengan dedikasi para pembuat SafeHer dan ingin berterimakasih atas adanya website ini.\"",
      img: "https://randomuser.me/api/portraits/women/12.jpg"
    }
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-6 md:px-16 py-16 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-neutral-900 mb-12">Testimoni SafeHer</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {testimonials.map((t, i) => (
          <div key={i} className="flex flex-col items-start">
            <div className="flex items-center gap-4 mb-3">
              <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
              <h4 className="font-bold text-neutral-900">{t.name}</h4>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
              {t.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 md:px-16 py-16 mb-20 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-10 text-center">
        Tanyakan apapun ke <span className="text-sistech-pink">SafeHer</span>
      </h2>
      
      <form className="w-full flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email Pengguna" 
            className="w-full bg-gray-100 rounded-xl px-4 py-3.5 border-none focus:ring-2 focus:ring-sistech-pink/50 outline-none text-sm placeholder-neutral-400"
          />
          <input 
            type="text" 
            placeholder="Subjek" 
            className="w-full bg-gray-100 rounded-xl px-4 py-3.5 border-none focus:ring-2 focus:ring-sistech-pink/50 outline-none text-sm placeholder-neutral-400"
          />
          <input 
            type="email" 
            placeholder="Email Penerima" 
            className="w-full bg-gray-100 rounded-xl px-4 py-3.5 border-none focus:ring-2 focus:ring-sistech-pink/50 outline-none text-sm placeholder-neutral-400"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <textarea 
            placeholder="Ketik pesan disini..." 
            className="w-full h-32 md:h-full bg-gray-100 rounded-xl px-4 py-3.5 border-none focus:ring-2 focus:ring-sistech-pink/50 outline-none text-sm placeholder-neutral-400 resize-none"
          ></textarea>
        </div>
      </form>
      <div className="w-full max-w-xs mt-8">
        <button type="button" className="w-full py-3.5 bg-sistech-pink text-white rounded-full font-bold shadow-sm hover:bg-[#e61a6b] transition-all">
          Kirim
        </button>
      </div>
    </section>
  );
}

export function StickyBanner() {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-6 pointer-events-none">
      <div className="bg-[#F0E6FF] border border-[#D5C2FF] text-[#6B4BCC] px-6 py-4 rounded-xl shadow-lg max-w-2xl w-full text-center font-bold text-sm pointer-events-auto">
        Merasa terancam? Tekan tombol SOS melayang di kanan bawah kapan saja!
      </div>
    </div>
  );
}

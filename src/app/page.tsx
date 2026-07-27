'use client';

import React, { useState } from 'react';

type Language = 'id' | 'en';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>('id');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Form State for Anonymous Report
  const [reportCategory, setReportCategory] = useState<string>('harassment');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [reportLocation, setReportLocation] = useState<string>('');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const triggerEmergency = () => {
    setIsEmergencyActive(true);
    setTimeout(() => {
      alert(
        lang === 'id'
          ? "Sinyal Darurat Terkirim ke Kontak Terdekat!"
          : "Emergency Signal Sent to Nearest Contacts!"
      );
      setIsEmergencyActive(false);
    }, 1000);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setShowReportModal(false);
      setReportDescription('');
      setReportLocation('');
    }, 2000);
  };

  // Translations object
  const content = {
    id: {
      beranda: 'Beranda',
      peta: 'Peta Aman',
      kontak: 'Kontak Darurat',
      lapor: 'Laporan Anonim',
      komunitas: 'Komunitas & Edukasi',
      heroTag: 'Perlindungan Perempuan Terpadu',
      heroTitleLine1: 'Ruang Aman untuk',
      heroTitleLine2: 'Setiap Langkahmu',
      heroDesc: 'SafeHer memberikan akses cepat ke bantuan darurat, pemantauan lokasi real-time, dan jaringan dukungan aman.',
      feature1Title: 'Peta Paling Aman',
      feature1Desc: 'Lacak rute aman dan terhindar dari area rawan.',
      feature2Title: 'Respon Cepat',
      feature2Desc: 'Terhubung langsung ke pihak berwenang & wali.',
      feature3Title: 'Laporan Anonim',
      feature3Desc: 'Laporkan insiden secara aman tanpa identitas.',
      emergencyBtn: 'TOMBOL EMERGENCY',
      modalTitle: 'Buat Laporan Anonim',
      modalSub: 'Identitas dan privasimu dijamin 100% aman dan tidak akan dilacak.',
      catLabel: 'Kategori Kejadian',
      cat1: 'Pelecehan Verbal / Catcalling',
      cat2: 'Pelecehan Fisik',
      cat3: 'Penguntitan (Stalking)',
      cat4: 'Area Rawan / Kurang Penerangan',
      locLabel: 'Lokasi Kejadian',
      locPlaceholder: 'Cth: Jl. Sudirman dekat Halte Bus',
      descLabel: 'Detail Laporan',
      descPlaceholder: 'Ceritakan kejadian selengkap mungkin (opsional)...',
      submitBtn: 'Kirim Laporan Rahasia',
      successMsg: 'Laporan Anonim Berhasil Terkirim!',
      cancelBtn: 'Batal',
    },
    en: {
      beranda: 'Home',
      peta: 'Safe Map',
      kontak: 'Emergency Contacts',
      lapor: 'Anonymous Report',
      komunitas: 'Community & Education',
      heroTag: 'Integrated Women Safety',
      heroTitleLine1: 'A Safe Space for',
      heroTitleLine2: 'Your Every Step',
      heroDesc: 'SafeHer provides rapid emergency access, real-time location monitoring, and a trusted support network.',
      feature1Title: 'Safe Map Routing',
      feature1Desc: 'Track safe routes and avoid high-risk areas.',
      feature2Title: 'Rapid Response',
      feature2Desc: 'Directly connect to authorities and trusted contacts.',
      feature3Title: 'Anonymous Report',
      feature3Desc: 'Report incidents safely without revealing identity.',
      emergencyBtn: 'EMERGENCY BUTTON',
      modalTitle: 'Submit Anonymous Report',
      modalSub: 'Your identity and privacy are 100% secured and untracked.',
      catLabel: 'Incident Category',
      cat1: 'Verbal Harassment / Catcalling',
      cat2: 'Physical Harassment',
      cat3: 'Stalking',
      cat4: 'Unsafe / Dimly Lit Area',
      locLabel: 'Incident Location',
      locPlaceholder: 'E.g., Main Street near Bus Station',
      descLabel: 'Report Details',
      descPlaceholder: 'Describe the situation in detail (optional)...',
      submitBtn: 'Submit Secret Report',
      successMsg: 'Anonymous Report Submitted Successfully!',
      cancelBtn: 'Cancel',
    },
  };

  const t = content[lang];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative overflow-x-hidden">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <div className="flex items-center gap-2">
          <div>
            <svg className="w-5 h-5 text-[#FF008A] fill-[#FF008A]" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#FF008A]">
            Safe<span className="text-purple-900">Her</span>
          </span>
        </div>

        {/* Right Action Controls: Language Toggle & Profile */}
        <div className="flex items-center gap-2">
          {/* Language Selector Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setLang('id')}
              className={`px-2 py-1 rounded-md transition-all ${
                lang === 'id' ? 'bg-white text-[#FF008A] shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-md transition-all ${
                lang === 'en' ? 'bg-white text-[#FF008A] shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              EN
            </button>
          </div>

          <button
            className="w-9 h-9 rounded-full bg-slate-300 border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-400 transition"
            aria-label="User Profile"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex">
          <div className="w-64 bg-white h-full p-6 flex flex-col justify-between shadow-xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#FF008A] fill-[#FF008A]" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="text-lg font-bold text-[#FF008A]">SafeHer</span>
                </div>
                <button onClick={toggleMenu} className="p-1 rounded hover:bg-slate-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-4">
                <button
                  onClick={() => {
                    toggleMenu();
                    setShowReportModal(true);
                  }}
                  className="text-left text-[#FF008A] font-semibold hover:opacity-80 transition flex items-center justify-between"
                >
                  <span>{t.lapor}</span>
                  <span className="bg-pink-100 text-[#FF008A] text-[10px] px-2 py-0.5 rounded-full uppercase">100% Safe</span>
                </button>
              </nav>
            </div>

          </div>
          <div className="flex-1" onClick={toggleMenu} />
        </div>
      )}

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-[#FF008A] text-sm font-semibold mb-4">
            <svg className="w-4 h-4 text-[#FF008A] fill-[#FF008A]" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {t.heroTag}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {t.heroTitleLine1} <br />
            <span className="text-[#FF008A]">{t.heroTitleLine2}</span>
          </h1>
          <p className="mt-4 text-slate-600 max-w-md mx-auto text-sm sm:text-base">
            {t.heroDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-pink-100 text-[#FF008A] mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{t.feature1Title}</h3>
            <p className="text-xs text-slate-500 mt-1">{t.feature1Desc}</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-700 mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{t.feature2Title}</h3>
            <p className="text-xs text-slate-500 mt-1">{t.feature2Desc}</p>
          </div>

          <button
            onClick={() => setShowReportModal(true)}
            className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-pink-300 hover:shadow-md transition text-left"
          >
            <div className="p-3 rounded-full bg-pink-100 text-[#FF008A] mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{t.feature3Title}</h3>
            <p className="text-xs text-slate-500 mt-1">{t.feature3Desc}</p>
          </button>
        </div>
      </main>

      {/* Anonymous Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h2 className="font-bold text-lg">{t.modalTitle}</h2>
                </div>
                <p className="text-xs text-pink-100 mt-1">{t.modalSub}</p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1 rounded-lg hover:bg-white/20 transition text-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {reportSubmitted ? (
              <div className="p-8 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 text-lg">{t.successMsg}</h3>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="p-6 flex flex-col gap-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.catLabel}
                  </label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white text-slate-800"
                  >
                    <option value="harassment">{t.cat1}</option>
                    <option value="physical">{t.cat2}</option>
                    <option value="stalking">{t.cat3}</option>
                    <option value="unsafe_area">{t.cat4}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.locLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={reportLocation}
                    onChange={(e) => setReportLocation(e.target.value)}
                    placeholder={t.locPlaceholder}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 focus:outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.descLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder={t.descPlaceholder}
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 focus:outline-none text-slate-800 resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#FF008A] hover:bg-pink-600 rounded-lg shadow transition"
                  >
                    {t.submitBtn}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={triggerEmergency}
          disabled={isEmergencyActive}
          className={`px-5 py-4 bg-black hover:bg-neutral-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-2xl border-2 border-red-600 flex items-center gap-3 transition-all duration-200 ${
            isEmergencyActive ? 'animate-pulse bg-red-700' : ''
          }`}
        >
          <svg className="w-6 h-6 text-red-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{t.emergencyBtn}</span>
        </button>
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import NavigationDrawer from './components/NavigationDrawer';
import AnonymousReportModal from './components/AnonymousReportModal';
import EmergencyButton from './components/EmergencyButton';
import { Language, content } from './types';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>('id');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const t = content[lang];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative overflow-x-hidden">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} lang={lang} setLang={setLang} />

      {isMenuOpen && (
        <NavigationDrawer
          toggleMenu={toggleMenu}
          openReportModal={() => setShowReportModal(true)}
          t={t}
        />
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

      <EmergencyButton lang={lang} t={t} />

      {showReportModal && (
        <AnonymousReportModal onClose={() => setShowReportModal(false)} t={t} />
      )}
    </div>
  );
}
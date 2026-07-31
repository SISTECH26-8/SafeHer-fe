import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Header({ isMenuOpen, toggleMenu, lang, setLang }: HeaderProps) {
  return (
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
        <svg className="w-5 h-5 text-[#FF008A] fill-[#FF008A]" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="text-xl font-bold tracking-tight text-[#FF008A]">
          Safe<span className="text-purple-900">Her</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
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
  );
}
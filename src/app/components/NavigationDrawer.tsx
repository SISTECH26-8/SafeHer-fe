import React from 'react';
import { Translations } from '../types';

interface NavigationDrawerProps {
  toggleMenu: () => void;
  openReportModal: () => void;
  t: Translations;
}

export default function NavigationDrawer({ toggleMenu, openReportModal, t }: NavigationDrawerProps) {
  return (
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
                openReportModal();
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
  );
}
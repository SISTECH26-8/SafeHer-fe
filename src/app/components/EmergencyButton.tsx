import React, { useState } from 'react';
import { Language, Translations } from '../types';

interface EmergencyButtonProps {
  lang: Language;
  t: Translations;
}

export default function EmergencyButton({ lang, t }: EmergencyButtonProps) {
  const [isEmergencyActive, setIsEmergencyActive] = useState<boolean>(false);

  const triggerEmergency = () => {
    setIsEmergencyActive(true);
    setTimeout(() => {
      alert(
        lang === 'id'
          ? 'Sinyal Darurat Terkirim ke Kontak Terdekat!'
          : 'Emergency Signal Sent to Nearest Contacts!'
      );
      setIsEmergencyActive(false);
    }, 1000);
  };

  return (
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
  );
}
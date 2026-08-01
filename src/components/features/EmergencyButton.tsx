import React from 'react';

export default function EmergencyButton() {
  return (
    <button className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-[#FF0F0F] text-white px-5 py-4 rounded-xl flex items-center justify-center shadow-[0_8px_30px_rgb(255,15,15,0.4)] hover:bg-[#D40000] hover:scale-105 active:scale-95 transition-all">
      <span className="font-extrabold tracking-widest text-xl leading-none">SOS</span>
    </button>
  );
}

import React from 'react';

export default function AuthLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* SVG Approximation of the Logo */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        {/* Heart icon on top */}
        <path d="M50 15 C 50 15, 45 10, 40 10 C 32 10, 32 20, 32 20 C 32 28, 50 35, 50 35 C 50 35, 68 28, 68 20 C 68 20, 68 10, 60 10 C 55 10, 50 15, 50 15 Z" fill="#FF008A" />
        
        {/* Hands */}
        <path d="M15 65 C 20 85, 40 95, 50 95 C 60 95, 80 85, 85 65 C 80 80, 65 85, 50 85 C 35 85, 20 80, 15 65 Z" fill="#F8C3A6" />
        <path d="M25 60 C 30 75, 45 80, 50 80 C 55 80, 70 75, 75 60 C 70 70, 60 75, 50 75 C 40 75, 30 70, 25 60 Z" fill="#FADCB9" />
        
        {/* Girl Figure */}
        <circle cx="50" cy="45" r="8" fill="#FF008A" />
        <path d="M43 55 L 57 55 L 60 85 L 40 85 Z" fill="#FF008A" />
        <path d="M43 55 L 35 75" stroke="#FF008A" strokeWidth="3" strokeLinecap="round" />
        <path d="M57 55 L 65 75" stroke="#FF008A" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

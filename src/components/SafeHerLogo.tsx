import React from 'react';

export default function SafeHerLogo({ className = "w-40 h-40" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 240 220" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M85 30C78 20 62 20 54 30C46 40 50 56 65 72L85 90L105 72C120 56 124 40 116 30C108 20 92 20 85 30Z" 
            fill="#FF55D2" transform="rotate(-15 85 55)"/>

      <circle cx="120" cy="55" r="14" fill="#FF1493" />
      <path d="M102 75C102 75 110 75 120 75C130 75 138 75 138 75C143 75 146 79 143 84L152 110C154 115 149 120 143 120L135 100L145 142H95L105 100L97 120C91 120 86 115 88 110L97 84C94 79 97 75 102 75Z" 
            fill="#FF1493" />

      <path d="M42 80C42 80 57 110 57 135C57 160 70 190 108 205C118 209 110 192 100 185C75 168 60 148 60 130C60 115 48 83 42 80Z" 
            fill="#FFE0BD" stroke="#DCAE82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M108 205C82 195 60 162 60 135C78 152 95 162 115 168" 
            fill="#FFE0BD" stroke="#DCAE82" strokeWidth="2" strokeLinecap="round"/>

      <path d="M198 80C198 80 183 110 183 135C183 160 170 190 132 205C122 209 130 192 140 185C165 168 180 148 180 130C180 115 192 83 198 80Z" 
            fill="#FFE0BD" stroke="#DCAE82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M132 205C158 195 180 162 180 135C162 152 145 162 125 168" 
            fill="#FFE0BD" stroke="#DCAE82" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
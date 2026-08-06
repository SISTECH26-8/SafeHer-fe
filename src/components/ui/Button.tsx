import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({ children, isLoading, className = '', ...props }: ButtonProps) {
  return (
    <button
      disabled={isLoading || props.disabled}
      className={`w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-full shadow-sm text-sm font-bold text-white bg-sistech-pink hover:bg-[#e61a6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sistech-pink transition-all active:scale-[0.98] disabled:opacity-50 ${className}`}
      {...props}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
    </button>
  );
}

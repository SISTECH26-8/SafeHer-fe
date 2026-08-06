import React, { useState, useRef, KeyboardEvent } from 'react';

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

export default function OtpInput({ length = 4, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(v => v !== '') && index === length - 1 && value) {
      onComplete(newOtp.join(''));
    } else if (newOtp.every(v => v !== '')) {
       // if all filled, trigger anyway
       onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-3 sm:gap-4 my-6">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold bg-gray-100 border-none rounded-xl text-neutral-900 focus:outline-none focus:ring-1 focus:ring-sistech-pink/50 transition-all"
          maxLength={1}
        />
      ))}
    </div>
  );
}

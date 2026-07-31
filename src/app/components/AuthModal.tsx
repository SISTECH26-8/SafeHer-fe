'use client';

import React, { useState } from 'react';
import { Translations } from '../types';
import { login, register } from '../libs/api';

interface AuthModalProps {
  onClose: () => void;
  t: Translations;
  initialMode?: 'login' | 'register';
  onSuccessLogin?: (email: string) => void;
}

export default function AuthModal({
  onClose,
  t,
  initialMode = 'login',
  onSuccessLogin,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'register') {
        if (password !== confirmPassword) {
          setError('Konfirmasi password tidak cocok!');
          setIsLoading(false);
          return;
        }

        await register({
          full_name: fullName,
          email: email,
          password: password,
          phone_number: phoneNumber,
        });

        setSubmitted(true);
        setTimeout(() => {
          setMode('login');
          setSubmitted(false);
          setIsLoading(false);
        }, 1500);

      } else {
        const res = await login({
          email: email,
          password: password,
        });

        if (res.token || res.data?.token) {
          localStorage.setItem('token', res.token || res.data?.token);
        }

        setSubmitted(true);
        setTimeout(() => {
          if (onSuccessLogin) onSuccessLogin(email);
          setIsLoading(false);
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Terjadi kesalahan, silakan coba lagi.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3">
      <div className="relative w-full max-w-sm bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-150">

        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 transition disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="pt-5 px-5 pb-1 text-center flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-[#FF008A]/10 border border-[#FF008A]/20 flex items-center justify-center text-[#FF008A] mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            {mode === 'login' ? t.login : t.register}
          </h2>
        </div>

        {submitted ? (
          <div className="p-6 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mb-2 border border-green-500/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">
              {mode === 'login' ? t.loginSuccess : 'Registrasi Berhasil! Silakan Masuk.'}
            </h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 pt-2 flex flex-col gap-2 text-left">
            {error && (
              <div className="bg-red-500/10 text-red-600 text-[11px] p-2 rounded-lg border border-red-500/20">
                {error}
              </div>
            )}

            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5 ml-0.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full text-xs bg-white/60 border border-slate-200 focus:border-[#FF008A] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#FF008A]/10 focus:outline-none transition placeholder:text-slate-400 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5 ml-0.5">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="08123456789"
                    className="w-full text-xs bg-white/60 border border-slate-200 focus:border-[#FF008A] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#FF008A]/10 focus:outline-none transition placeholder:text-slate-400 text-slate-800"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-0.5 ml-0.5">
                {t.emailLabel}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full text-xs bg-white/60 border border-slate-200 focus:border-[#FF008A] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#FF008A]/10 focus:outline-none transition placeholder:text-slate-400 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-0.5 ml-0.5">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs bg-white/60 border border-slate-200 focus:border-[#FF008A] rounded-xl px-3 py-2 pr-9 focus:ring-2 focus:ring-[#FF008A]/10 focus:outline-none transition placeholder:text-slate-400 text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.959 8.959 0 013.682-.813c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-4.692-4.692a3 3 0 00-4.243-4.243" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-0.5 ml-0.5">
                  {t.confirmPasswordLabel}
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs bg-white/60 border border-slate-200 focus:border-[#FF008A] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#FF008A]/10 focus:outline-none transition placeholder:text-slate-400 text-slate-800"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 mt-2 text-xs font-bold text-white bg-gradient-to-r from-[#FF008A] to-purple-600 hover:opacity-95 rounded-xl shadow-md shadow-[#FF008A]/20 transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <svg className="w-3.5 h-3.5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>{mode === 'login' ? t.login : t.register}</span>
            </button>

            <div className="text-center mt-1">
              <span className="text-[11px] text-slate-500">
                {mode === 'login' ? t.noAccount : t.hasAccount}{' '}
              </span>
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setError('');
                }}
                className="text-[11px] font-bold text-[#FF008A] hover:underline ml-0.5"
              >
                {mode === 'login' ? t.register : t.login}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
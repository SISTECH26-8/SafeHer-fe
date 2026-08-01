'use client';

import React, { useState } from 'react';
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone_number: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('https://safeher-be.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // API throws 422 for validation error, with detail array or similar msg format
        const errorDetail = data.detail 
          ? (Array.isArray(data.detail) ? data.detail[0].msg : data.detail) 
          : (data.message || 'Registration failed. Please check your inputs.');
        throw new Error(errorDetail);
      }

      // Success
      setSuccessMsg(data.message || 'Registration successful! You can now log in.');
      setFormData({ full_name: '', email: '', password: '', phone_number: '' });
      
      // Optional: redirect to login or dashboard after a short delay
      setTimeout(() => {
        router.push('/'); 
      }, 3000);

    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Subtle aesthetic background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-14 h-14 bg-sistech-pink/5 rounded-2xl flex items-center justify-center mb-6 border border-sistech-pink/10 shadow-sm">
          <ShieldCheck className="w-7 h-7 text-sistech-pink" />
        </div>
        <h2 className="mt-2 text-center text-[28px] font-bold tracking-tight text-neutral-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-500">
          Join SafeHer for trusted support and monitoring.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
        <div className="bg-white py-10 px-4 sm:px-10 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-[2rem]">
          
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50/50 border border-red-100 flex items-start space-x-3 text-red-600 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start space-x-3 text-emerald-600 text-sm">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span className="font-medium">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-neutral-400 group-focus-within:text-sistech-pink transition-colors" />
                </div>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="block w-full pl-11 pr-3 py-3 border border-neutral-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sistech-pink/20 focus:border-sistech-pink transition-all sm:text-sm shadow-sm"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400 group-focus-within:text-sistech-pink transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-11 pr-3 py-3 border border-neutral-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sistech-pink/20 focus:border-sistech-pink transition-all sm:text-sm shadow-sm"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">
                Phone Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-neutral-400 group-focus-within:text-sistech-pink transition-colors" />
                </div>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="block w-full pl-11 pr-3 py-3 border border-neutral-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sistech-pink/20 focus:border-sistech-pink transition-all sm:text-sm shadow-sm"
                  placeholder="+62 812 3456 7890"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400 group-focus-within:text-sistech-pink transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="block w-full pl-11 pr-3 py-3 border border-neutral-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sistech-pink/20 focus:border-sistech-pink transition-all sm:text-sm shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-sistech-pink hover:bg-[#e61a6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sistech-pink transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Registering...
                  </>
                ) : (
                  <>
                    Create account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-100" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-neutral-400 font-medium">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/login"
                className="w-full flex justify-center items-center py-3 px-4 border border-neutral-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-200 transition-all active:scale-[0.98]"
              >
                Log in instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

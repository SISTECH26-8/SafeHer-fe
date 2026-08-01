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
    <div className="w-full min-h-full flex flex-col md:flex-row animate-in fade-in duration-700 bg-white">
      
      {/* Left Side: Branding (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 lg:w-[55%] bg-gradient-to-br from-sistech-pink to-sistech-purple p-12 lg:p-20 flex-col justify-between items-start text-white relative overflow-hidden">
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] pointer-events-none translate-x-1/2"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-lg mt-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Your safety is our <br className="hidden lg:block" />
            <span className="text-white/90">top priority.</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Join SafeHer today to get rapid emergency access, real-time location monitoring, and a trusted support network wherever you go.
          </p>
        </div>
        
        <div className="relative z-10 text-white/50 text-sm font-medium">
          © {new Date().getFullYear()} SafeHer. All rights reserved.
        </div>
      </div>

      {/* Right Side: Form Area (Mobile + Desktop) */}
      <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col justify-center px-4 py-12 md:px-12 lg:px-16 xl:px-24 bg-white relative z-10">
        
        <div className="w-full max-w-sm mx-auto">
          
          <div className="text-left mb-10">
            <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Register</h2>
            <p className="text-neutral-500 mt-2 text-sm font-medium">Create a new account to get started.</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start space-x-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="font-medium leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 flex items-start space-x-3 text-green-600 text-sm animate-in fade-in slide-in-from-top-2">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span className="font-medium leading-relaxed">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-neutral-400 group-focus-within:text-sistech-pink transition-colors" />
                </div>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="block w-full pl-12 pr-4 py-3.5 border border-neutral-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sistech-pink/30 focus:border-sistech-pink transition-all font-medium shadow-sm hover:border-neutral-300"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400 group-focus-within:text-sistech-pink transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-12 pr-4 py-3.5 border border-neutral-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sistech-pink/30 focus:border-sistech-pink transition-all font-medium shadow-sm hover:border-neutral-300"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-neutral-400 group-focus-within:text-sistech-pink transition-colors" />
                </div>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="block w-full pl-12 pr-4 py-3.5 border border-neutral-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sistech-pink/30 focus:border-sistech-pink transition-all font-medium shadow-sm hover:border-neutral-300"
                  placeholder="+62 812 3456 7890"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400 group-focus-within:text-sistech-pink transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="block w-full pl-12 pr-4 py-3.5 border border-neutral-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sistech-pink/30 focus:border-sistech-pink transition-all font-medium shadow-sm hover:border-neutral-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-sistech-pink hover:bg-sistech-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sistech-pink transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-neutral-500 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="text-sistech-pink hover:text-sistech-purple font-bold transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Home, Map, ShieldAlert, User, Settings, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: Map, label: 'Safe Routes', href: '/routes' },
    { icon: ShieldAlert, label: 'Alerts', href: '/alerts' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: UserPlus, label: 'Register', href: '/register' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="flex flex-col h-full p-4">
      <div className="px-2 mb-8 mt-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          SafeHer
        </h1>
        <p className="text-xs text-neutral-400 mt-1">Your Personal Safety Companion</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0; // Temporarily make first item active

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-teal-500/10 text-teal-400 font-medium' 
                  : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200'
              }`}
            >
              <Icon 
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-teal-400' : 'text-neutral-500 group-hover:text-neutral-300'
                }`} 
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-neutral-800/50">
        <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl p-4 shadow-inner border border-neutral-700/30">
          <h4 className="text-sm font-medium text-neutral-200">Emergency</h4>
          <p className="text-xs text-neutral-400 mt-1 mb-3">Long press to trigger SOS</p>
          <button className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-2">
            <ShieldAlert className="w-4 h-4" />
            <span>SOS Alert</span>
          </button>
        </div>
      </div>
    </div>
  );
}

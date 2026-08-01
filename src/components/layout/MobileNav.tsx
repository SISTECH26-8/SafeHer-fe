import React from 'react';
import { Home, Map, ShieldAlert, User } from 'lucide-react';
import Link from 'next/link';

export default function MobileNav() {
  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Map, label: 'Routes', href: '/routes' },
    { icon: ShieldAlert, label: 'SOS', href: '/sos', isAlert: true },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <nav className="flex items-center justify-around px-2 pb-safe pt-2 h-16">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = index === 0; // Temp active state for first item
        
        if (item.isAlert) {
          return (
            <button key={item.label} className="relative -top-5 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-b from-red-500 to-red-600 p-1 shadow-lg shadow-red-500/30">
                <div className="w-full h-full rounded-full bg-red-600 flex items-center justify-center border-2 border-red-400/30">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-[10px] font-medium text-red-400 mt-1">SOS</span>
            </button>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center space-y-1 w-16"
          >
            <div className={`p-1.5 rounded-full transition-all duration-300 ${
              isActive ? 'bg-teal-500/10' : 'transparent'
            }`}>
              <Icon 
                className={`w-5 h-5 ${
                  isActive ? 'text-teal-400' : 'text-neutral-500'
                }`} 
              />
            </div>
            <span className={`text-[10px] font-medium ${
              isActive ? 'text-teal-400' : 'text-neutral-500'
            }`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

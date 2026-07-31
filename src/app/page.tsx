'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import NavigationDrawer from './components/NavigationDrawer';
import AnonymousReportModal from './components/AnonymousReportModal';
import EmergencyButton from './components/EmergencyButton';
import AuthModal from './components/AuthModal';
import { Language, content } from './types';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>('id');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const t = content[lang];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative overflow-x-hidden">
      <Header
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        lang={lang}
        setLang={setLang}
        onOpenAuth={() => setShowAuthModal(true)}
        userEmail={userEmail}
      />

      {isMenuOpen && (
        <NavigationDrawer
          toggleMenu={toggleMenu}
          openReportModal={() => setShowReportModal(true)}
          t={t}
        />
      )}

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col items-center justify-center text-center">
      </main>

      <EmergencyButton lang={lang} t={t} />

      {showReportModal && (
        <AnonymousReportModal onClose={() => setShowReportModal(false)} t={t} />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          t={t}
          onSuccessLogin={(email) => setUserEmail(email)}
        />
      )}
    </div>
  );
}
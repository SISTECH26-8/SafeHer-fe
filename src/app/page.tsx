'use client';

import React from 'react';
import LandingFooter from '@/components/layout/LandingFooter';
import { 
  HeroSection, 
  StatsSection, 
  AboutSection, 
  ServicesSection, 
  FeaturesSection, 
  TestimonialsSection, 
  ContactSection, 
  StickyBanner 
} from '@/components/landing/LandingSections';

export default function Home() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-sans relative">

      
      {/* Main Content Sections */}
      <main className="flex-1 w-full flex flex-col pb-10">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Floating Banner */}
      <StickyBanner />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
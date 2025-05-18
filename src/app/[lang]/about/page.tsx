"use client";

import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import AboutHero from './AboutHero';

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 px-4 py-12">
        <AboutHero />
      </main>
      <Footer />
    </div>
  );
} 
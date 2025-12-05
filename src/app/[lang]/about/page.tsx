'use client';

import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import AboutHero from './AboutHero';
import MeetOurFaces from './MeetOurFaces';
import LicensedLeader from './LicensedLeader';
import OurLocations from './OurLocations';
import AboutGallery from './AboutGallery';

export default function AboutUsPage() {
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash === '#licenses') {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          setTimeout(() => {
            const licensesSection = document.getElementById('licenses');
            if (licensesSection) {
              licensesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        });
      }
    };

    // Check immediately
    handleHashNavigation();

    // Also check after a short delay in case hash wasn't ready yet
    const timeoutId = setTimeout(handleHashNavigation, 200);

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 px-4 py-12">
        <AboutHero />
        <MeetOurFaces />
        <LicensedLeader />
        <OurLocations />
        <AboutGallery />
      </main>
      <Footer />
    </div>
  );
}

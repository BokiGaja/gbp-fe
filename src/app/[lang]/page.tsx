'use client';

import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import Hero from './home/Hero';
import Products from '@/app/[lang]/home/Products';
import MeetOurPartners from './home/MeetOurPartners';
import CoFounderMessage from './home/CoFounderMessage';
import ContactUs from './home/ContactUs';
import Events from './home/Events';
import Footer from '@/components/Footer';

export default function HomePage() {
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash === '#partners') {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          setTimeout(() => {
            const partnersSection = document.getElementById('partners');
            if (partnersSection) {
              partnersSection.scrollIntoView({ behavior: 'smooth' });
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
    <>
      <Navigation isHome={true} />
      <Hero />
      <Products />
      <MeetOurPartners />
      <CoFounderMessage />
      <ContactUs />
      <Events />
      <Footer />
    </>
  );
}

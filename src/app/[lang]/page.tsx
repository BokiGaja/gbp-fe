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
    // Handle hash navigation - scroll to partners section if hash is present
    if (window.location.hash === '#partners') {
      // Small delay to ensure the component is rendered
      setTimeout(() => {
        const partnersSection = document.getElementById('partners');
        if (partnersSection) {
          partnersSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
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

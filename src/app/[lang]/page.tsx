import Hero from './home/Hero';
import Products from '@/app/[lang]/home/Products';
import MeetOurPartners from './home/MeetOurPartners';
import CoFounderMessage from './home/CoFounderMessage';
import ContactUs from './home/ContactUs';
import Events from './home/Events';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
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

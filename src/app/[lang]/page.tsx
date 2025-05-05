import Hero from './home/Hero';
import Products from '@/app/[lang]/home/Products';
import MeetOurPartners from './home/MeetOurPartners';
import CoFounderMessage from './home/CoFounderMessage';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <MeetOurPartners />
      <CoFounderMessage />
    </>
  );
}

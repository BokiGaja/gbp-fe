import Hero from './home/Hero';
import Products from '@/app/[lang]/home/Products';
import MeetOurPartners from './home/MeetOurPartners';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <MeetOurPartners />
    </>
  );
}

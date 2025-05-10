"use client"

import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEvents } from '@/hooks/useEvents';

export default function EventsPage() {
  const { data, isLoading, error } = useEvents();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load events.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 px-4 md:px-16 py-12 bg-white">
      <h2 className="text-3xl md:text-4xl font-[500] text-[#000D2D] mb-8 md:mb-12">Events</h2>
        {data[0] && (
          <div className="relative w-full h-[400px] md:h-[630px] overflow-hidden mb-12 cursor-pointer group">
            <img
              src={data[0].coverImage?.url || ''}
              alt={data[0].title}
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute left-0 bottom-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0" style={{height: '60%'}}>
              <div className="w-full h-full bg-gradient-to-t from-[#000D2D]/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8">
              <div className="text-white opacity-70 text-md mb-2">{new Date(data[0].createdAt).toLocaleDateString()}</div>
              <div className="text-white text-2xl md:text-4xl font-[500] mb-2">
                {data[0].title}
              </div>
            </div>
            <button
              className="absolute bottom-6 right-6 w-12 h-12 flex items-center justify-center border border-white rounded-md bg-white/20 z-10 transition-colors duration-150 cursor-pointer"
              aria-label="Arrow (does nothing)"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="h-7 w-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 
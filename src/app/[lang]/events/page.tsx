"use client"

import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEvents } from '@/hooks/useEvents';
import React from 'react';

type Event = {
  id?: string | number;
  title: string;
  createdAt: string;
  coverImage?: { url?: string };
};

function groupEventsByMonth(events: Event[]) {
  return events.reduce<Record<string, Event[]>>((groups, event) => {
    const date = new Date(event.createdAt);
    const key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!groups[key]) groups[key] = [];
    groups[key].push(event);
    return groups;
  }, {});
}

export default function EventsPage() {
  const { data, isLoading, error } = useEvents();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load events.</div>;
  if (!data || !data.length) return <div>No events found.</div>;

  // Featured event is the first one
  const [featured, ...rest] = data;
  const grouped = groupEventsByMonth(rest);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 px-4 py-12 bg-white">
        <h2 className="text-3xl md:text-4xl font-[500] text-[#000D2D] mb-8 md:mb-12">Events</h2>
        {/* Featured event */}
        {featured && (
          <div className="relative w-full h-[400px] md:h-[630px] overflow-hidden mb-12 cursor-pointer group">
            <img
              src={featured.coverImage?.url || ''}
              alt={featured.title}
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute left-0 bottom-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0" style={{height: '60%'}}>
              <div className="w-full h-full bg-gradient-to-t from-[#000D2D]/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8">
              <div className="text-white opacity-70 text-md mb-2">{new Date(featured.createdAt).toLocaleDateString()}</div>
              <div className="text-white text-2xl md:text-4xl font-[500] mb-2">
                {featured.title}
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
        {/* Grouped events by month/year */}
        <div className="border-t border-[#000D2D]/8">
          {Object.entries(grouped).map(([month, events]) => (
            <div key={month} className="flex flex-col md:flex-row items-start gap-2 md:gap-8s border-b border-[#000D2D]/8 py-12 last:border-b-0">
              {/* Date label */}
              <div className="w-full md:w-64 text-[#000D2D] opacity-70 text-lg font-[500] flex-shrink-0 mb-2 md:mb-0">{month}</div>
              {/* Events grid */}
              <div className="flex flex-row flex-wrap gap-1 justify-start w-full">
                {events.map((event, idx) => (
                  <div
                    key={event.id || idx}
                    className="relative bg-gray-100 overflow-hidden group cursor-pointer aspect-[13/9] w-full md:max-w-[450px]"
                  >
                    <img
                      src={event.coverImage?.url || ''}
                      alt={event.title}
                      className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
                    />
                    <div
                      className="absolute left-0 bottom-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                      style={{ height: '60%' }}
                    >
                      <div className="w-full h-full bg-gradient-to-t from-[#000D2D]/60 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <div className="text-white opacity-80 text-xs mb-1">
                        {new Date(event.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-white text-lg font-semibold">{event.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
} 
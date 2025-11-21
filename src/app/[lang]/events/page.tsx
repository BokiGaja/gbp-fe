'use client';

import { Navigation } from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEvents } from '@/hooks/useEvents';
import React from 'react';
import { useTranslations } from 'next-intl';
import LoadingPage from '@/components/LoadingPage';
import NotFound from '@/components/NotFound';
import { useParams, useRouter } from 'next/navigation';

type Event = {
  id?: string | number;
  title: string;
  slug: string;
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
  const params = useParams();
  const lang = params.lang as string;
  const { data, isLoading, error } = useEvents(lang);
  const t = useTranslations('events');
  const router = useRouter();

  if (isLoading) return <LoadingPage />;
  if (error) return <NotFound />;

  // If no data, show empty state instead of 404
  if (!data || !data.length) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 px-4 py-12 bg-white">
          <h2 className="text-3xl md:text-4xl font-[500] text-[#000D2D] mb-8 md:mb-12">
            {t('title')}
          </h2>
          <p className="text-[#000D2D] opacity-70">No events available.</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Featured event is the first one
  const [featured, ...rest] = data;
  const grouped = groupEventsByMonth(rest);

  const handleEventClick = (slug: string) => {
    router.push(`/${lang}/events/${slug}`);
  };
  console.log('grouped', grouped);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 px-4 py-12 bg-white">
        <h2 className="text-3xl md:text-4xl font-[500] text-[#000D2D] mb-8 md:mb-12">
          {t('title')}
        </h2>
        {/* Featured event */}
        {featured && (
          <div
            className="relative w-full h-[300px] md:h-[450px] overflow-hidden mb-12 cursor-pointer group"
            onClick={() => handleEventClick(featured.slug)}
          >
            <img
              src={featured.coverImage?.url || ''}
              alt={featured.title}
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105 pointer-events-none"
            />
            <div
              className="absolute left-0 bottom-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
              style={{ height: '60%' }}
            >
              <div className="w-full h-full bg-gradient-to-t from-[#000D2D]/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8 pointer-events-none">
              <div className="text-white opacity-70 text-md mb-2">
                {new Date(featured.createdAt).toLocaleDateString()}
              </div>
              <div className="text-white text-2xl md:text-4xl font-[500] mb-2">
                {featured.title}
              </div>
            </div>
            <button
              className="absolute bottom-6 right-6 w-12 h-12 flex items-center justify-center border border-white rounded-md bg-white/20 z-10 transition-colors duration-150 cursor-pointer"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (featured.slug) handleEventClick(featured.slug);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="h-7 w-7"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
        {/* Grouped events by month/year */}
        <div className="border-t border-[#000D2D]/8">
          {Object.entries(grouped).map(([month, events]) => (
            <div key={month} className="border-b border-[#000D2D]/8 py-12 last:border-b-0">
              {/* Month/Year label above events */}
              <div className="text-[#000D2D] text-2xl md:text-3xl font-[500] mb-8">{month}</div>
              {/* Events grid */}
              <div className="flex flex-row flex-wrap gap-1 justify-start w-full">
                {events.map((event, idx) => (
                  <div
                    key={event.id || idx}
                    className="relative bg-gray-100 overflow-hidden group cursor-pointer aspect-[13/9] w-full md:max-w-[320px]"
                    onClick={() => handleEventClick(event.slug || '')}
                  >
                    <img
                      src={event.coverImage?.url || ''}
                      alt={event.title}
                      className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105 pointer-events-none"
                    />
                    <div
                      className="absolute left-0 bottom-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                      style={{ height: '60%' }}
                    >
                      <div className="w-full h-full bg-gradient-to-t from-[#000D2D]/60 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-4 pointer-events-none">
                      <div className="text-white opacity-80 text-xs mb-1">
                        {new Date(event.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-white text-lg font-semibold">{event.title}</div>
                    </div>
                    {/* Arrow button on hover */}
                    <button
                      type="button"
                      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (event.slug) handleEventClick(event.slug);
                      }}
                    >
                      <span className="w-12 h-12 bg-white/20 border border-white rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="white"
                          className="h-6 w-6"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
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

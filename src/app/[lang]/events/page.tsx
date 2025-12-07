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

  const grouped = groupEventsByMonth(data);

  const handleEventClick = (slug: string) => {
    router.push(`/${lang}/events/${slug}`);
  };

  // Helper function to render events in the same grid layout as Events.tsx
  const renderEventGrid = (events: Event[]) => {
    const grids = [];
    for (let i = 0; i < events.length; i += 3) {
      const batch = events.slice(i, i + 3);
      const [first, second, third] = batch;

      grids.push(
        <div key={i} className="grid md:grid-cols-2 gap-1 mb-1">
          {/* Left large event */}
          {first && first.coverImage?.url && (
            <div
              className="relative md:row-span-2 max-h-[604px] h-[300px] md:h-[604px] overflow-hidden cursor-pointer group bg-white"
              onClick={() => handleEventClick(first.slug)}
            >
              <img
                src={first.coverImage.url}
                alt={first.title || 'Event image'}
                className="w-full h-full object-cover max-h-[604px] transition-all duration-300 group-hover:scale-105 pointer-events-none"
              />
              <div
                className="absolute left-0 bottom-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                style={{ height: '60%' }}
              >
                <div className="w-full h-full bg-gradient-to-t from-[#000D2D]/60 to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 text-white pointer-events-none">
                <div className="mb-2 text-sm opacity-80">
                  {new Date(first.createdAt).toLocaleDateString()}
                </div>
                <div className="text-xl md:text-2xl drop-shadow-lg max-w-xs">{first.title}</div>
              </div>
            </div>
          )}
          {/* Right two small events */}
          <div className="grid grid-rows-2 gap-1">
            {second && second.coverImage?.url && (
              <div
                className="relative max-h-[300px] h-[140px] md:h-[300px] overflow-hidden cursor-pointer group bg-white"
                onClick={() => handleEventClick(second.slug)}
              >
                <img
                  src={second.coverImage.url}
                  alt={second.title || 'Event image'}
                  className="w-full h-full object-cover max-h-[300px] transition-all duration-300 group-hover:scale-105 pointer-events-none"
                />
                <div
                  className="absolute left-0 bottom-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                  style={{ height: '60%' }}
                >
                  <div className="w-full h-full bg-gradient-to-t from-[#000D2D]/60 to-transparent" />
                </div>
                <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                  <div className="mb-1 text-xs opacity-80">
                    {new Date(second.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-lg drop-shadow max-w-xs">{second.title}</div>
                </div>
              </div>
            )}
            {third && third.coverImage?.url && (
              <div
                className="relative max-h-[300px] h-[140px] md:h-[300px] overflow-hidden cursor-pointer group bg-white"
                onClick={() => handleEventClick(third.slug)}
              >
                <img
                  src={third.coverImage.url}
                  alt={third.title || 'Event image'}
                  className="w-full h-full object-cover max-h-[300px] transition-all duration-300 group-hover:scale-105 pointer-events-none"
                />
                <div
                  className="absolute left-0 bottom-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                  style={{ height: '60%' }}
                >
                  <div className="w-full h-full bg-gradient-to-t from-[#000D2D]/60 to-transparent" />
                </div>
                <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                  <div className="mb-1 text-xs opacity-80">
                    {new Date(third.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-lg drop-shadow max-w-xs">{third.title}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    return grids;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 px-4 py-12 bg-white">
        <h2 className="text-3xl md:text-4xl font-[500] text-[#000D2D] mb-8 md:mb-12">
          {t('title')}
        </h2>
        {/* Grouped events by month/year */}
        <div>
          {Object.entries(grouped).map(([month, events]) => (
            <div key={month} className="border-b border-[#000D2D]/8 py-12 last:border-b-0">
              {/* Month/Year label above events */}
              <div className="text-[#000D2D] text-2xl md:text-3xl font-[500] mb-8">{month}</div>
              {/* Events grid - same layout as Events.tsx */}
              <div className="w-full">{renderEventGrid(events)}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

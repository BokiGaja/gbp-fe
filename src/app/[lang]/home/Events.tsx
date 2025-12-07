'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useTopEvents } from '@/hooks/useTopEvents';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

type EventImageFormat = {
  url: string;
};

interface EventCoverImage {
  formats?: {
    small?: EventImageFormat;
    thumbnail?: EventImageFormat;
  };
}

interface Event {
  title: string;
  slug: string;
  createdAt?: string;
  coverImage?: EventCoverImage;
}

const Events = () => {
  const t = useTranslations('home.events');
  const params = useParams();
  const lang = params.lang as string;
  const { data, isLoading, isError } = useTopEvents(lang);
  const router = useRouter();

  // Memoize the items array from API data
  const items = useMemo(() => {
    if (!data?.events) return [];
    return data.events.map((event: Event) => ({
      title: event.title,
      slug: event.slug,
      date: event.createdAt ? new Date(event.createdAt).toLocaleDateString() : '',
      image:
        event.coverImage?.formats?.small?.url || event.coverImage?.formats?.thumbnail?.url || null,
    }));
  }, [data]);

  const handleEventClick = (slug: string) => {
    router.push(`/${lang}/events/${slug}`);
  };

  if (isLoading)
    return (
      <div className="py-20 px-4 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  if (isError)
    return (
      <div className="py-20 px-4 text-red-500">{t('errorLoading') || 'Error loading events.'}</div>
    );
  if (!items.length) return null;

  return (
    <section className="w-full px-4 pt-20 md:pt-30 pb-40 md:pb-60">
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-[500] text-[#000D2D]">{t('title')}</h2>
        <Link href={`/${lang}/events`} className="text-[#000D2D] text-md">
          {t('readAll')}
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-1">
        {/* Left large event */}
        {items[0]?.image && (
          <div
            className="relative md:row-span-2 max-h-[604px] h-[300px] md:h-[604px] overflow-hidden cursor-pointer group bg-white"
            onClick={() => items[0]?.slug && handleEventClick(items[0].slug)}
          >
            <img
              src={items[0].image}
              alt={items[0].title || 'Event image'}
              className="w-full h-full object-cover max-h-[604px] transition-all duration-300 group-hover:scale-105 pointer-events-none"
            />
          <div
            className="absolute left-0 bottom-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
            style={{ height: '60%' }}
          >
            <div className="w-full h-full bg-gradient-to-t from-[#000D2D]/60 to-transparent" />
          </div>
          <div className="absolute bottom-6 left-6 text-white pointer-events-none">
            <div className="mb-2 text-sm opacity-80">{items[0].date}</div>
            <div className="text-xl md:text-2xl drop-shadow-lg max-w-xs">{items[0].title}</div>
          </div>
          </div>
        )}
        {/* Right two small events */}
        <div className="grid grid-rows-2 gap-1">
          {[1, 2].map(
            (i) =>
              items[i] && items[i].image && (
                <div
                  key={i}
                  className="relative max-h-[300px] h-[140px] md:h-[300px] overflow-hidden cursor-pointer group bg-white"
                  onClick={() => items[i]?.slug && handleEventClick(items[i].slug)}
                >
                  <img
                    src={items[i].image}
                    alt={items[i].title || 'Event image'}
                    className="w-full h-full object-cover max-h-[300px] transition-all duration-300 group-hover:scale-105 pointer-events-none"
                  />
                  <div
                    className="absolute left-0 bottom-0 w-full pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                    style={{ height: '60%' }}
                  >
                    <div className="w-full h-full bg-gradient-to-t from-[#000D2D]/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                    <div className="mb-1 text-xs opacity-80">{items[i].date}</div>
                    <div className="text-lg drop-shadow max-w-xs">{items[i].title}</div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;

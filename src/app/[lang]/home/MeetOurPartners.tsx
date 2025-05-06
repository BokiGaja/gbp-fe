'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const partners = [
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato X',
    description:
      "Our cutting-edge armored vehicles deliver unparalleled protection and performance, ensuring your mission's success in the most demanding environments.",
    link: 'https://example.com/1',
  },
  {
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato X',
    description:
      "Our cutting-edge armored vehicles deliver unparalleled protection and performance, ensuring your mission's success in the most demanding environments.",
    link: 'https://example.com/2',
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato X',
    description:
      "Our cutting-edge armored vehicles deliver unparalleled protection and performance, ensuring your mission's success in the most demanding environments.",
    link: 'https://example.com/3',
  },
  {
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato X',
    description:
      "Our cutting-edge armored vehicles deliver unparalleled protection and performance, ensuring your mission's success in the most demanding environments.",
    link: 'https://example.com/4',
  },
  {
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato X',
    description:
      "Our cutting-edge armored vehicles deliver unparalleled protection and performance, ensuring your mission's success in the most demanding environments.",
    link: 'https://example.com/5',
  },
  {
    image: 'https://images.unsplash.com/photo-1519340333755-c892a4e0a7e4?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato X',
    description:
      "Our cutting-edge armored vehicles deliver unparalleled protection and performance, ensuring your mission's success in the most demanding environments.",
    link: 'https://example.com/6',
  },
  {
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato X',
    description:
      "Our cutting-edge armored vehicles deliver unparalleled protection and performance, ensuring your mission's success in the most demanding environments.",
    link: 'https://example.com/7',
  },
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato X',
    description:
      "Our cutting-edge armored vehicles deliver unparalleled protection and performance, ensuring your mission's success in the most demanding environments.",
    link: 'https://example.com/8',
  },
];

export default function MeetOurPartners() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations('home');

  // Debounced progress update
  const debouncedUpdateProgress = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = 420 + 32;
      const visibleCards = Math.floor(el.offsetWidth / cardWidth);
      const scrolledCards = el.scrollLeft / cardWidth;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const atEnd = Math.abs(el.scrollLeft - maxScroll) < 2;
      let progress = Math.min((visibleCards + scrolledCards) / partners.length, 1);
      if (atEnd) progress = 1;
      setScrollProgress(progress);
    }, 100);
  };

  useEffect(() => {
    debouncedUpdateProgress();
    window.addEventListener('resize', debouncedUpdateProgress);
    return () => {
      window.removeEventListener('resize', debouncedUpdateProgress);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const renderPartnerCard = (partner: typeof partners[0], idx: number) => (
    <div
      key={idx}
      className="group bg-[#F5F5F5] md:bg-white hover:bg-[#F5F5F5] rounded-xl flex flex-col items-start relative scroll-snap-start transition-colors duration-150 border border-transparent cursor-default min-w-full md:w-[420px] md:min-w-[420px] md:max-w-[420px] md:h-[300px]"
      style={{ height: '300px'}}
    >
      {/* Overlay for non-hovered state */}
      <div className="absolute inset-0 bg-white opacity-20 pointer-events-none rounded-xl transition-opacity duration-150 group-hover:opacity-0" />
      <div className="flex w-full items-center justify-between pt-8 px-8 z-10">
        <img src={partner.image} alt={partner.title} className="w-20 h-20 rounded-full" />
        <a
          href={partner.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 mr-2 z-10 flex items-center px-6 py-3 rounded-lg font-[400] text-md gap-2 bg-transparent group-hover:bg-[#E8E8E8]"
          style={{ color: '#000D2D', boxShadow: 'none', transition: 'none' }}
        >
          <span className="hidden group-hover:inline" style={{ transition: 'none' }}>{t('visitWebsite')}</span>
          <ArrowUpRight className="w-5 h-5 text-[#000D2D] font-[400] ml-0 group-hover:ml-2 md:ml-2" style={{ transition: 'none' }} />
        </a>
      </div>
      <h3 className="text-[24px] font-[500] text-[#000D2D] pt-4 px-8 pb-0 m-0 z-10">{partner.title}</h3>
      <p className="text-[16px] font-[400] px-8 pt-2 pb-0 leading-snug z-10" style={{ color: 'rgba(0,13,45,0.5)' }}>{partner.description}</p>
    </div>
  );

  return (
    <section className="mb-20 mt-10 md:my-30 px-4 w-full">
      <div className="flex flex-col md:flex-row md:items-center w-full mb-12 gap-3">
        <h2 className="text-4xl text-[#000D2D] font-[500] mb-0 whitespace-nowrap m-0">{t('meetOurPartners')}</h2>
        <div className="flex flex-row items-center md:flex-1 md:items-center w-full md:w-auto gap-3 mt-4 md:mt-0">
          <div className="flex-1 h-[2px] bg-gray-200 relative rounded overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#000D2D] rounded transition-all duration-200"
              style={{ width: `${scrollProgress * 100}%`, transitionProperty: 'width' }}
            />
          </div>
          <button
            onClick={() => scrollBy(-420)}
            className="w-10 h-10 flex items-center justify-center border border-[#D1D5DB] rounded-lg text-2xl text-[#CBD0D8] hover:border-[#000D2D] hover:text-[#000D2D] bg-white ml-4 cursor-pointer"
            aria-label="Scroll left"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button
            onClick={() => scrollBy(420)}
            className="w-10 h-10 flex items-center justify-center border border-[#D1D5DB] rounded-lg text-2xl text-[#CBD0D8] hover:border-[#000D2D] hover:text-[#000D2D] bg-white cursor-pointer"
            aria-label="Scroll right"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"></polyline></svg>
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        onScroll={debouncedUpdateProgress}
        className="flex gap-8 overflow-x-auto w-full pb-4 scroll-snap-x scroll-smooth scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {partners.map(renderPartnerCard)}
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
} 
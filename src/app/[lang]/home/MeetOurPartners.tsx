'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { usePartners } from '@/hooks/usePartners';

interface LogoImage {
  url: string;
  formats?: {
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

interface Partner {
  logo: LogoImage | string;
  title: string;
  description: string;
  link: string;
  position?: number;
}

export default function MeetOurPartners() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations('home');
  const params = useParams();
  const lang = params.lang as string;
  const { data, isLoading, isError } = usePartners(lang);

  // Map API response to component format
  const partners = useMemo(() => {
    if (!data) return [];
    // Handle both array response and object with partners property
    const partnersData = Array.isArray(data) ? data : data.partners || [];
    return partnersData
      .map((partner: Partner) => {
        // Extract logo URL from object or use string directly
        let logoUrl = '';
        if (typeof partner.logo === 'string') {
          logoUrl = partner.logo;
        } else if (partner.logo) {
          // Prefer small format, then thumbnail, then full URL
          logoUrl =
            partner.logo.formats?.small?.url ||
            partner.logo.formats?.thumbnail?.url ||
            partner.logo.url ||
            '';
        }
        return {
          image: logoUrl,
          title: partner.title,
          description: partner.description,
          link: partner.link,
          position: partner.position ?? Infinity, // Use Infinity for undefined/null positions (sort to end)
        };
      })
      .sort((a: { position: number }, b: { position: number }) => a.position - b.position); // Sort by position in ascending order
  }, [data]);

  // Debounced progress update
  const debouncedUpdateProgress = useCallback(() => {
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
  }, [partners.length]);

  useEffect(() => {
    if (partners.length > 0) {
      debouncedUpdateProgress();
    }
    window.addEventListener('resize', debouncedUpdateProgress);
    return () => {
      window.removeEventListener('resize', debouncedUpdateProgress);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [partners.length, debouncedUpdateProgress]);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const renderPartnerCard = (
    partner: { image: string; title: string; description: string; link: string },
    idx: number
  ) => (
    <div
      key={idx}
      className="group bg-[#F5F5F5] md:bg-white hover:bg-[#F5F5F5] rounded-xl flex flex-col items-start relative scroll-snap-start transition-colors duration-150 border border-transparent cursor-default min-w-full md:w-[420px] md:min-w-[420px] md:max-w-[420px]"
    >
      {/* Overlay for non-hovered state */}
      <div className="absolute inset-0 bg-white opacity-20 pointer-events-none rounded-xl transition-opacity duration-150 group-hover:opacity-0" />
      <div className="flex w-full items-center justify-between pt-8 px-8 z-10">
        {partner.image && (
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={partner.image}
              alt={partner.title}
              fill
              className="object-contain rounded-full"
              sizes="80px"
            />
          </div>
        )}
        <a
          href={partner.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 mr-2 z-10 flex items-center px-6 py-3 rounded-lg font-[400] text-md gap-2 bg-transparent group-hover:bg-[#E8E8E8]"
          style={{ color: '#000D2D', boxShadow: 'none', transition: 'none' }}
        >
          <span className="hidden group-hover:inline" style={{ transition: 'none' }}>
            {t('visitWebsite')}
          </span>
          <ArrowUpRight
            className="w-5 h-5 text-[#000D2D] font-[400] ml-0 group-hover:ml-2 md:ml-2"
            style={{ transition: 'none' }}
          />
        </a>
      </div>
      <h3 className="text-[24px] font-[500] text-[#000D2D] pt-4 px-8 pb-0 m-0 z-10">
        {partner.title}
      </h3>
      <p
        className="text-[16px] font-[400] px-8 pt-2 pb-8 leading-snug z-10"
        style={{ color: 'rgba(0,13,45,0.5)' }}
      >
        {partner.description.length > 200
          ? `${partner.description.slice(0, 200)}...`
          : partner.description}
      </p>
    </div>
  );

  if (isLoading) {
    return (
      <section id="partners" className="pt-20 md:pt-30 px-4 w-full">
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (isError || !partners.length) {
    return null;
  }

  return (
    <section id="partners" className="pt-20 md:pt-30 px-4 w-full">
      <div className="flex flex-col md:flex-row md:items-center w-full mb-8 md:mb-12 gap-3">
        <h2 className="text-3xl md:text-4xl text-[#000D2D] font-[500] mb-0 whitespace-nowrap m-0 mr-2">
          {t('meetOurPartners')}
        </h2>
        {/* Desktop progress bar and arrows */}
        <div className="hidden md:flex flex-row items-center md:flex-1 md:items-center w-full md:w-auto gap-3 mt-4 md:mt-0">
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
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={() => scrollBy(420)}
            className="w-10 h-10 flex items-center justify-center border border-[#D1D5DB] rounded-lg text-2xl text-[#CBD0D8] hover:border-[#000D2D] hover:text-[#000D2D] bg-white cursor-pointer"
            aria-label="Scroll right"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="9 6 15 12 9 18"></polyline>
            </svg>
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
      {/* Mobile progress bar and arrows */}
      <div className="flex md:hidden flex-row items-center w-full gap-3 mt-4">
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
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          onClick={() => scrollBy(420)}
          className="w-10 h-10 flex items-center justify-center border border-[#D1D5DB] rounded-lg text-2xl text-[#CBD0D8] hover:border-[#000D2D] hover:text-[#000D2D] bg-white cursor-pointer"
          aria-label="Scroll right"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="9 6 15 12 9 18"></polyline>
          </svg>
        </button>
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

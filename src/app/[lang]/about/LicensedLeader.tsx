import React, { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function LicensedLeader() {
  const t = useTranslations('about.licensedLeader');
  
  const licenses = [
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato X',
    description:
      "Our cutting-edge armored vehicles deliver unparalleled protection and performance, ensuring your mission's success in the most demanding environments.",
    link: '#',
  },
  {
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato Y',
    description:
      "Our advanced technology ensures reliability and safety in every mission, no matter the challenge.",
    link: '#',
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato Z',
    description:
      "Trusted by professionals worldwide for unmatched durability and performance.",
    link: '#',
  },
  {
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato Alpha',
    description:
      "Innovative solutions for modern defense needs, setting new industry standards.",
    link: '#',
  },
  {
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato Beta',
    description:
      "Engineered for excellence, our vehicles are the backbone of secure operations.",
    link: '#',
  },
  {
    image: 'https://images.unsplash.com/photo-1519340333755-c892a4e0a7e4?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato Gamma',
    description:
      "Performance and protection, redefined for the most demanding environments.",
    link: '#',
  },
  {
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato Delta',
    description:
      "Next-generation armored vehicles for the future of defense.",
    link: '#',
  },
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=80&h=80&q=80',
    title: 'Plato Omega',
    description:
      "Unmatched reliability and innovation for mission success.",
    link: '#',
  },
];

function LicenseIcon() {
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      <circle cx="16" cy="13" r="7" stroke="#0A1633" strokeWidth="2"/>
      <circle cx="16" cy="13" r="2" fill="#0A1633"/>
      <path d="M12 21l4 3 4-3" stroke="#0A1633" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M16 20v4" stroke="#0A1633" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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
      let progress = Math.min((visibleCards + scrolledCards) / licenses.length, 1);
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

  const renderLicenseCard = (license: typeof licenses[0], idx: number) => (
    <div
      key={idx}
      className="group bg-[#F5F5F5] md:bg-white hover:bg-[#F5F5F5] rounded-xl flex flex-col items-start relative scroll-snap-start transition-colors duration-150 border border-transparent cursor-default min-w-full md:w-[420px] md:min-w-[420px] md:max-w-[420px] md:h-[300px]"
      style={{ height: '300px'}}
    >
      {/* Overlay for non-hovered state */}
      <div className="absolute inset-0 bg-white opacity-20 pointer-events-none rounded-xl transition-opacity duration-150 group-hover:opacity-0" />
      <div className="flex w-full items-center justify-between pt-8 px-8 z-10">
        <img src={license.image} alt={license.title} className="w-20 h-20 rounded-full" />
        <a
          href={license.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 mr-2 z-10 flex items-center px-6 py-3 rounded-lg font-[400] text-md gap-2 bg-transparent group-hover:bg-[#E8E8E8]"
          style={{ color: '#000D2D', boxShadow: 'none', transition: 'none' }}
        >
          <span className="hidden group-hover:inline" style={{ transition: 'none' }}>{t('seeLicense')}</span>
          <LicenseIcon />
        </a>
      </div>
      <h3 className="text-[24px] font-[500] text-[#000D2D] pt-4 px-8 pb-0 m-0 z-10">{license.title}</h3>
      <p className="text-[16px] font-[400] px-8 pt-2 pb-0 leading-snug z-10" style={{ color: 'rgba(0,13,45,0.5)' }}>{license.description}</p>
    </div>
  );

  return (
    <section className="pt-20 md:pt-30 w-full">
      <div className="flex flex-col md:flex-row md:items-center w-full mb-8 md:mb-12 gap-3">
        <h2 className="text-3xl md:text-4xl text-[#000D2D] font-[500] mb-0 whitespace-pre-line m-0 mr-2">
          {t('title')}
          <br />
          {t('title2')}
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
            aria-label={t('scrollLeft')}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button
            onClick={() => scrollBy(420)}
            className="w-10 h-10 flex items-center justify-center border border-[#D1D5DB] rounded-lg text-2xl text-[#CBD0D8] hover:border-[#000D2D] hover:text-[#000D2D] bg-white cursor-pointer"
            aria-label={t('scrollRight')}
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
        {licenses.map(renderLicenseCard)}
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
          aria-label={t('scrollLeft')}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button
          onClick={() => scrollBy(420)}
          className="w-10 h-10 flex items-center justify-center border border-[#D1D5DB] rounded-lg text-2xl text-[#CBD0D8] hover:border-[#000D2D] hover:text-[#000D2D] bg-white cursor-pointer"
          aria-label={t('scrollRight')}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"></polyline></svg>
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
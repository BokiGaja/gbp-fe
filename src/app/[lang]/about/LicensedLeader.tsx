'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useLicenses } from '@/hooks/useLicenses';
import { useParams } from 'next/navigation';

interface LogoImage {
  url: string;
  formats?: {
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

interface LicenseFile {
  url: string;
  name?: string;
}

interface License {
  logo: LogoImage | string;
  title: string;
  description: string;
  link: string;
  licenseFile?: LicenseFile;
}

function LicenseIcon() {
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      <circle cx="16" cy="13" r="7" stroke="#0A1633" strokeWidth="2" />
      <circle cx="16" cy="13" r="2" fill="#0A1633" />
      <path d="M12 21l4 3 4-3" stroke="#0A1633" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 20v4" stroke="#0A1633" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export default function LicensedLeader() {
  const t = useTranslations('about.licensedLeader');
  const params = useParams();
  const locale = params.lang as string;
  const { data, isLoading, isError } = useLicenses(locale);

  // Map API response to component format
  const licenses = useMemo(() => {
    if (!data) return [];
    // Handle both array response and object with licenses property
    const licensesData = Array.isArray(data) ? data : data.licenses || [];
    return licensesData.map((license: License) => {
      // Extract logo URL from object or use string directly
      let logoUrl = '';
      if (typeof license.logo === 'string') {
        logoUrl = license.logo;
      } else if (license.logo) {
        // Prefer small format, then thumbnail, then full URL
        logoUrl =
          license.logo.formats?.small?.url ||
          license.logo.formats?.thumbnail?.url ||
          license.logo.url ||
          '';
      }
      // Extract license file URL
      const fileUrl = license.licenseFile?.url || '';
      const fileName = license.licenseFile?.name || 'license.pdf';

      return {
        image: logoUrl,
        title: license.title,
        description: license.description,
        link: license.link,
        fileUrl,
        fileName,
      };
    });
  }, [data]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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
      let progress = Math.min((visibleCards + scrolledCards) / licenses.length, 1);
      if (atEnd) progress = 1;
      setScrollProgress(progress);
    }, 100);
  }, [licenses.length]);

  useEffect(() => {
    if (licenses.length > 0) {
      debouncedUpdateProgress();
    }
    window.addEventListener('resize', debouncedUpdateProgress);
    return () => {
      window.removeEventListener('resize', debouncedUpdateProgress);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [licenses.length, debouncedUpdateProgress]);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleDownload = async (fileUrl: string, fileName: string) => {
    if (!fileUrl) return;

    try {
      // Fetch the file
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      // Create a blob URL and trigger download
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
      // Fallback: open in new tab if download fails
      window.open(fileUrl, '_blank');
    }
  };

  const renderLicenseCard = (
    license: {
      image: string;
      title: string;
      description: string;
      link: string;
      fileUrl: string;
      fileName: string;
    },
    idx: number
  ) => (
    <div
      key={idx}
      className="group bg-[#F5F5F5] md:bg-white hover:bg-[#F5F5F5] rounded-xl flex flex-col items-start relative scroll-snap-start transition-colors duration-150 border border-transparent cursor-default min-w-full md:w-[420px] md:min-w-[420px] md:max-w-[420px]"
      style={{ minHeight: '300px', height: 'auto' }}
    >
      {/* Overlay for non-hovered state */}
      <div className="absolute inset-0 bg-white opacity-20 pointer-events-none rounded-xl transition-opacity duration-150 group-hover:opacity-0" />
      <div className="flex w-full items-center justify-between pt-8 px-8 z-10">
        {license.image && (
          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-full bg-white">
            <div className="absolute inset-2">
              <Image src={license.image} alt={license.title || 'License logo'} fill className="object-contain" />
            </div>
          </div>
        )}
        <button
          onClick={() => license.fileUrl && handleDownload(license.fileUrl, license.fileName)}
          disabled={!license.fileUrl}
          className="ml-4 mr-2 z-10 flex items-center px-6 py-3 rounded-lg font-[400] text-md gap-2 bg-transparent group-hover:bg-[#E8E8E8] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          style={{ color: '#000D2D', boxShadow: 'none', transition: 'none' }}
        >
          <span className="hidden group-hover:inline" style={{ transition: 'none' }}>
            {t('seeLicense')}
          </span>
          <LicenseIcon />
        </button>
      </div>
      <h3 className="text-[24px] font-[500] text-[#000D2D] pt-4 px-8 pb-0 m-0 z-10">
        {license.title}
      </h3>
      <p
        className="text-[16px] font-[400] px-8 pt-2 pb-8 leading-snug z-10 flex-1"
        style={{ color: 'rgba(0,13,45,0.5)' }}
      >
        {license.description.length > 200
          ? `${license.description.slice(0, 200)}...`
          : license.description}
      </p>
    </div>
  );

  if (isLoading) {
    return (
      <section className="pt-20 md:pt-30 w-full">
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (isError || !licenses.length) {
    return null;
  }

  return (
    <section id="licenses" className="pt-20 md:pt-30 w-full">
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
            aria-label={t('scrollRight')}
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
          aria-label={t('scrollRight')}
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

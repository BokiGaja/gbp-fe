'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { CategoriesDropdown } from './ProductsDropdown';
import CategoriesIcon from './icons/CategoriesIcon';

export function Navigation({ isHome = false }: { isHome?: boolean }) {
  const t = useTranslations('nav');

  const linkClass = isHome
    ? 'opacity-70 hover:opacity-100 transition text-white'
    : 'text-[#000D2D] cursor-pointer';

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    function handleScroll() {
      setDropdownOpen(false);
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [dropdownOpen]);

  return (
    <nav
      className={`top-0 left-0 w-full z-50 h-[70px] ${
        isHome
          ? 'text-white bg-transparent absolute'
          : 'text-[#000D2D] bg-white border-b border-[#000D2D]/8'
      }`}
    >
      <div className="mx-auto px-6 xl:px-12 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={76} height={76} className="w-[76px]" />
            </Link>
          </div>
          {/* Center: Navigation Links */}
          <div className="hidden md:flex space-x-10 text-m items-center">
            {/* Product & Services Dropdown */}
            <div className="relative">
              <button
                className={linkClass + ' flex items-center gap-2 cursor-pointer'}
                onClick={() => setDropdownOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                type="button"
              >
                <CategoriesIcon className="mr-2" />
                {t('products')}
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <CategoriesDropdown open={dropdownOpen} dropdownRef={dropdownRef as React.RefObject<HTMLDivElement>} t={t} />
            </div>
            {/* Other nav links */}
            <Link href="/partners" className={linkClass}>
              {t('partners')}
            </Link>
            <Link href="/events" className={linkClass}>
              {t('events')}
            </Link>
            <Link href="/about" className={linkClass}>
              {t('about')}
            </Link>
          </div>
          {/* Right: Language + Contact + Mobile Menu */}
          <div className="flex items-center space-x-6 text-m">
            <LanguageSwitcher isDark={!isHome} />
            <Link
              href="/contact"
              className={`hidden md:inline ${
                isHome ? 'text-white' : 'text-[#000D2D] cursor-pointer'
              }`}
            >
              {t('contact')}
            </Link>
            {/* Hamburger menu icon for mobile */}
            <button
              className="block md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000D2D]"
              aria-label="Open mobile menu"
              onClick={() => setMobileMenuOpen(true)}
              type="button"
            >
              <svg className="my-auto" width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="18" height="2" rx="1" fill={isHome ? 'white' : '#000D2D'}/>
                <rect x="6" y="10" width="12" height="2" rx="1" fill={isHome ? 'white' : '#000D2D'}/>
                <rect x="6" y="16" width="6" height="2" rx="1" fill={isHome ? 'white' : '#000D2D'}/>
              </svg>
            </button>
            {/* Mobile menu overlay */}
            {mobileMenuOpen && !mobileCategoriesOpen && (
              <div className="fixed inset-0 z-50 bg-[#0A1633] bg-opacity-95 flex flex-col p-8 md:hidden">
                <button
                  className="self-end mb-8 p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  aria-label="Close mobile menu"
                  onClick={() => setMobileMenuOpen(false)}
                  type="button"
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="7" y1="7" x2="21" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="21" y1="7" x2="7" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <nav className="flex flex-col gap-6 text-xl text-white">
                  <button
                    className="text-left w-full py-2"
                    onClick={() => setMobileCategoriesOpen(true)}
                  >
                    {t('products')}
                  </button>
                  <Link href="/partners" onClick={() => setMobileMenuOpen(false)}>{t('partners')}</Link>
                  <Link href="/events" onClick={() => setMobileMenuOpen(false)}>{t('events')}</Link>
                  <Link href="/about" onClick={() => setMobileMenuOpen(false)}>{t('about')}</Link>
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>{t('contact')}</Link>
                </nav>
              </div>
            )}
            {/* Mobile categories overlay */}
            {mobileMenuOpen && mobileCategoriesOpen && (
              <div className="fixed inset-0 z-50 bg-[#0A1633] bg-opacity-95 flex flex-col p-8 md:hidden">
                <button
                  className="self-start mb-8 p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  aria-label="Back to mobile menu"
                  onClick={() => setMobileCategoriesOpen(false)}
                  type="button"
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="21" y1="14" x2="7" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <polyline points="14,7 7,14 14,21" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <CategoriesDropdown open={true} dropdownRef={dropdownRef as React.RefObject<HTMLDivElement>} t={t} />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

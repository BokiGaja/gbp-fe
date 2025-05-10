'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation({ isHome = false }: { isHome?: boolean }) {
  const t = useTranslations('nav');

  const linkClass = isHome
    ? 'opacity-70 hover:opacity-100 transition text-white'
    : 'text-[#000D2D] cursor-pointer';

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
              <img src="/logo.png" alt="Logo" className="w-[76px]" />
            </Link>
          </div>
          {/* Center: Navigation Links */}
          <div className="hidden md:flex space-x-10 text-m">
            <Link href="/products" className={linkClass}>
              {t('products')}
            </Link>
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
            <div className="block md:hidden">
              <svg className="my-auto" width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="18" height="2" rx="1" fill={isHome ? 'white' : '#000D2D'}/>
                <rect x="6" y="10" width="12" height="2" rx="1" fill={isHome ? 'white' : '#000D2D'}/>
                <rect x="6" y="16" width="6" height="2" rx="1" fill={isHome ? 'white' : '#000D2D'}/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

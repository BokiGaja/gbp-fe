'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const t = useTranslations('nav');

  return (
    <>
      <nav className="top-0 left-0 w-full z-50 text-white h-[70px] bg-transparent absolute">
        <div className="mx-auto px-6 xl:px-12 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Left: Logo */}
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo" className="w-[76px]" />
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden md:flex space-x-10 text-m">
              <Link href="/products" className="opacity-70 hover:opacity-100 transition">
                {t('products')}
              </Link>
              <Link href="/partners" className="opacity-70 hover:opacity-100 transition">
                {t('partners')}
              </Link>
              <Link href="/events" className="opacity-70 hover:opacity-100 transition">
                {t('events')}
              </Link>
              <Link href="/about" className="opacity-70 hover:opacity-100 transition">
                {t('about')}
              </Link>
            </div>

            {/* Right: Language + Contact + Mobile Menu */}
            <div className="flex items-center space-x-6 text-m">
              <LanguageSwitcher />
              <Link
                href="/contact"
                className="text-white hidden md:inline"
              >
                {t('contact')}
              </Link>
              {/* Hamburger menu icon for mobile */}
              <div className="block md:hidden">
                <svg className="my-auto" width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="4" width="18" height="2" rx="1" fill="white"/>
                  <rect x="6" y="10" width="12" height="2" rx="1" fill="white"/>
                  <rect x="6" y="16" width="6" height="2" rx="1" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

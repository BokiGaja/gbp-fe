'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const t = useTranslations('common');

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
              <Link href="/products" className="hover:text-yellow-400 transition">
                {t('nav.products')}
              </Link>
              <Link href="/partners" className="hover:text-yellow-400 transition">
                {t('nav.partners')}
              </Link>
              <Link href="/events" className="hover:text-yellow-400 transition">
                {t('nav.events')}
              </Link>
              <Link href="/about" className="hover:text-yellow-400 transition">
                {t('nav.about')}
              </Link>
            </div>

            {/* Right: Language + Contact */}
            <div className="flex items-center space-x-6 text-m">
              <LanguageSwitcher />
              <Link
                href="/contact"
                className="text-white hover:text-yellow-400 transition"
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

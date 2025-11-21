'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { MobileNavigation } from './mobile/MobileNavigation';
import { ProductsDropdown } from './ProductsDropdown';

export function Navigation({ isHome = false }: { isHome?: boolean }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const params = useParams();
  const lang = params.lang as string;

  const isHomePage =
    pathname === '/' || pathname === `/${lang}` || pathname === `/${lang}/` || isHome;

  const handlePartnersClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      const partnersSection = document.getElementById('partners');
      if (partnersSection) {
        partnersSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const linkClass = isHome
    ? 'opacity-70 hover:opacity-100 transition text-white'
    : dropdownOpen
      ? 'text-white cursor-pointer'
      : 'text-[#000D2D] cursor-pointer';

  return (
    <nav
      className={`top-0 left-0 w-full z-50 h-[70px] ${
        dropdownOpen
          ? `ext-white bg-[#0A1633] ${isHome && 'absolute'}`
          : isHome
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
            <ProductsDropdown
              isHome={isHome}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              linkClass={linkClass}
            />
            {/* Other nav links */}
            <Link href="/#partners" className={linkClass} onClick={handlePartnersClick}>
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
                isHome || dropdownOpen ? 'text-white' : 'text-[#000D2D] cursor-pointer'
              }`}
            >
              {t('contact')}
            </Link>
            {/* Mobile Navigation */}
            <MobileNavigation isHome={isHome} onPartnersClick={handlePartnersClick} />
          </div>
        </div>
      </div>
    </nav>
  );
}

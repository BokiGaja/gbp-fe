'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState, useRef } from 'react';
import { MobileCategoriesDropdown } from './MobileCategoriesDropdown';
import HamburgerIcon from '../icons/HamburgerIcon';
import CloseIcon from '../icons/CloseIcon';
import BackArrowIcon from '../icons/BackArrowIcon';

interface MobileNavigationProps {
  isHome: boolean;
  onPartnersClick: (e: React.MouseEvent) => void;
}

export function MobileNavigation({ isHome, onPartnersClick }: MobileNavigationProps) {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Hamburger menu icon for mobile */}
      <button
        className="block md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000D2D]"
        aria-label="Open mobile menu"
        onClick={() => setMobileMenuOpen(true)}
        type="button"
      >
        <HamburgerIcon color={isHome ? 'white' : '#000D2D'} className="my-auto" />
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
            <CloseIcon />
          </button>
          <nav className="flex flex-col gap-6 text-xl text-white">
            <button className="text-left w-full py-2" onClick={() => setMobileCategoriesOpen(true)}>
              {t('products')}
            </button>
            <Link
              href="/partners"
              onClick={(e) => {
                onPartnersClick(e);
                setMobileMenuOpen(false);
              }}
            >
              {t('partners')}
            </Link>
            <Link href="/events" onClick={() => setMobileMenuOpen(false)}>
              {t('events')}
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
              {t('about')}
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              {t('contact')}
            </Link>
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
            <BackArrowIcon />
          </button>
          <MobileCategoriesDropdown
            open={true}
            dropdownRef={dropdownRef as React.RefObject<HTMLDivElement>}
            t={t}
          />
        </div>
      )}
    </>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { useRef, useEffect } from 'react';
import { CategoriesDropdown } from './CategoriesDropdown';
import CategoriesIcon from './icons/CategoriesIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import { usePathname } from 'next/navigation';

interface ProductsDropdownProps {
  isHome: boolean;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  linkClass: string;
}

export function ProductsDropdown({
  isHome,
  dropdownOpen,
  setDropdownOpen,
  linkClass,
}: ProductsDropdownProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const isCategoryPage = pathname?.includes('/categories');
  const isHomePage = pathname === '/' || isHome;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) ||
        (buttonRef.current && buttonRef.current.contains(event.target as Node))
      ) {
        return;
      }
      setDropdownOpen(false);
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.classList.add('overflow-hidden');
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('overflow-hidden');
    };
  }, [dropdownOpen, setDropdownOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className={
          linkClass +
          ' flex items-center gap-2 cursor-pointer' +
          (isCategoryPage
            ? ' font-normal text-[16px] leading-[16px] tracking-[0] font-work-sans' +
              (dropdownOpen ? ' text-white' : ' text-[#000D2D]')
            : '')
        }
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        type="button"
      >
        {/* Only show CategoriesIcon on home page */}
        {isHomePage && <CategoriesIcon className="mr-2" />}
        {t('products')}
        {/* Only show chevron if not on home page */}
        {!isHomePage && <ChevronDownIcon className="mr-2" />}
      </button>
      <CategoriesDropdown
        open={dropdownOpen}
        dropdownRef={dropdownRef as React.RefObject<HTMLDivElement>}
        t={t}
      />
    </div>
  );
}

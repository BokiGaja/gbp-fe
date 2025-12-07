'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useRef, useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';

export function LanguageSwitcher({ isDark = false }: { isDark?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getLabel = (locale: string) => {
    if (locale === 'en') return 'Eng';
    if (locale === 'sr-Latn') return 'Srpski';
    if (locale === 'ru-RU') return 'Русский';
    return locale;
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get parent path for detail pages to avoid 404s
  const getParentPath = (path: string): string => {
    // Remove leading slash and split
    const segments = path.split('/').filter(Boolean);

    // Check if we're on a detail page (items/[slug], events/[slug], or categories with multiple segments)
    if (segments.length >= 2) {
      const [firstSegment, secondSegment] = segments;

      // If it's items/[slug], go to home page (no items listing page exists)
      if (firstSegment === 'items') {
        return '/';
      }

      // If it's events/[slug], go to events listing page
      if (firstSegment === 'events') {
        return '/events';
      }

      // If it's categories with multiple segments, go to parent category or home
      if (firstSegment === 'categories' && segments.length > 1) {
        // If there are 2 segments (root category), go to home page (no categories listing exists)
        // If there are 3 segments (subcategory), go to parent root category
        if (segments.length === 2) {
          return '/';
        } else if (segments.length === 3) {
          return `/${firstSegment}/${secondSegment}`;
        }
      }
    }

    // For other pages, return the original path
    return path;
  };

  const handleLanguageChange = (newLocale: string) => {
    // If we're on a detail page, navigate to parent page
    const targetPath = getParentPath(pathname);
    router.replace(targetPath, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center space-x-1 cursor-pointer ${
          isDark ? 'text-[#000D2D]' : 'text-white'
        }`}
      >
        <span className="mr-2">{getLabel(locale || 'en')}</span>
        <Globe size={18} className={isDark ? 'text-[#000D2D]' : 'text-white'} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white text-black rounded shadow z-50">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className="block w-full text-left text-[#000D2D] px-4 py-2 hover:bg-gray-100 cursor-pointer rounded"
            >
              {getLabel(loc)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

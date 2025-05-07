'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const lang = document.documentElement.lang;
      if (lang) setCurrentLocale(lang);
    }
  }, []);

  const getLabel = (locale: string) => {
    return locale === 'en' ? 'Eng' : 'Srpski';
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1 text-white cursor-pointer"
      >
        <span className="mr-2">{getLabel(currentLocale || 'en')}</span>
        <Globe size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white text-black rounded shadow z-50">
          {routing.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => {
                router.replace(pathname, { locale });
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer rounded"
            >
              {getLabel(locale)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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
        className={`flex items-center space-x-1 cursor-pointer ${
          isDark ? 'text-[#000D2D]' : 'text-white'
        }`}
      >
        <span className="mr-2">{getLabel(locale || 'en')}</span>
        <Globe size={18} className={isDark ? 'text-[#000D2D]' : 'text-white'} />
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
              className="block w-full text-left text-[#000D2D] px-4 py-2 hover:bg-gray-100 cursor-pointer rounded"
            >
              {getLabel(locale)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

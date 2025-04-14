'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const t = useTranslations('common');

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-8">
            <Link
              href="/"
              className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/about"
              className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('nav.about')}
            </Link>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
} 
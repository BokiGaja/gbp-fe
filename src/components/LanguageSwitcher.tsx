'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex gap-2">
      {routing.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => router.replace(pathname, { locale })}
          className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {locale === 'en' ? 'English' : 'Srpski'}
        </button>
      ))}
    </div>
  );
} 
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'sr-Latn'],

  // Used when no locale matches
  defaultLocale: 'en'
}); 
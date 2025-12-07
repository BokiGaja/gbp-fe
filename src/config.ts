export const locales = ['en', 'sr-Latn', 'ru-RU'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'en' as const;

export const locales = ['en', 'sr-Latn'] as const;
export type Locale = typeof locales[number];

export const defaultLocale = 'en' as const; 
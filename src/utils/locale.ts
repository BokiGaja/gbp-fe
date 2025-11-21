/**
 * Map frontend locale to API locale format
 * Converts sr-Latn to sr for API calls
 */
export const mapLocaleForAPI = (locale: string): string => {
  // Convert sr-Latn to sr for API
  if (locale === 'sr-Latn') return 'sr';
  return locale;
};


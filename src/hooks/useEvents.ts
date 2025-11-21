import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API } from '@/constants/api';
import { mapLocaleForAPI } from '@/utils/locale';

export const useEvents = (locale?: string) => {
  return useQuery({
    queryKey: ['events', locale],
    queryFn: async () => {
      const apiLocale = locale ? mapLocaleForAPI(locale) : undefined;
      const url = apiLocale
        ? `${BASE_API}/events?locale=${apiLocale}`
        : `${BASE_API}/events`;
      const res = await axios.get(url);
      return res.data;
    },
  });
};

export const fetchEvent = async (slug: string, locale?: string) => {
  const apiLocale = locale ? mapLocaleForAPI(locale) : undefined;
  const url = apiLocale
    ? `${BASE_API}/events?slug=${slug}&locale=${apiLocale}`
    : `${BASE_API}/events?slug=${slug}`;
  const res = await axios.get(url);
  return res.data;
};

export const useEvent = (slug: string, locale?: string) => {
  return useQuery({
    queryKey: ['event', slug, locale],
    queryFn: () => fetchEvent(slug, locale),
  });
}; 
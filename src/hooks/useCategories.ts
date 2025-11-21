import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API } from '@/constants/api';
import { mapLocaleForAPI } from '@/utils/locale';

export const fetchCategory = async (slug: string, locale?: string) => {
  const apiLocale = locale ? mapLocaleForAPI(locale) : undefined;
  const url = apiLocale
    ? `${BASE_API}/categories?slug=${slug}&locale=${apiLocale}`
    : `${BASE_API}/categories?slug=${slug}`;
  const res = await axios.get(url);
  return res.data;
};

export const fetchItem = async (slug: string, locale?: string) => {
  const apiLocale = locale ? mapLocaleForAPI(locale) : undefined;
  const url = apiLocale
    ? `${BASE_API}/items?slug=${slug}&locale=${apiLocale}`
    : `${BASE_API}/items?slug=${slug}`;
  const res = await axios.get(url);
  return res.data;
};

export const useTopCategories = (locale?: string) => {
  return useQuery({
    queryKey: ['top-categories', locale],
    queryFn: async () => {
      const apiLocale = locale ? mapLocaleForAPI(locale) : undefined;
      const url = apiLocale
        ? `${BASE_API}/top-categories?locale=${apiLocale}`
        : `${BASE_API}/top-categories`;
      const res = await axios.get(url);
      return res.data;
    },
  });
};

export const useCategories = (locale?: string) => {
  return useQuery({
    queryKey: ['categories', locale],
    queryFn: async () => {
      const apiLocale = locale ? mapLocaleForAPI(locale) : undefined;
      const url = apiLocale
        ? `${BASE_API}/categories?locale=${apiLocale}`
        : `${BASE_API}/categories`;
      const res = await axios.get(url);
      return res.data;
    },
  });
};

export const useCategory = (slug: string, locale?: string) => {
  return useQuery({
    queryKey: ['category', slug, locale],
    queryFn: () => fetchCategory(slug, locale),
  });
};

export const useItem = (slug: string, locale?: string) => {
  return useQuery({
    queryKey: ['item', slug, locale],
    queryFn: () => fetchItem(slug, locale),
  });
};

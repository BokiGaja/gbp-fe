import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API } from '@/constants/api';
import { mapLocaleForAPI } from '@/utils/locale';

export const useAboutUsGalleries = (locale?: string) => {
  return useQuery({
    queryKey: ['about-us-galleries', locale],
    queryFn: async () => {
      const apiLocale = locale ? mapLocaleForAPI(locale) : undefined;
      const url = apiLocale 
        ? `${BASE_API}/about-us-galleries?locale=${apiLocale}`
        : `${BASE_API}/about-us-galleries`;
      const res = await axios.get(url);
      return res.data;
    },
  });
};


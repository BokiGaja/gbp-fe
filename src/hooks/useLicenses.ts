import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API } from '@/constants/api';
import { mapLocaleForAPI } from '@/utils/locale';

export const useLicenses = (locale?: string) => {
  return useQuery({
    queryKey: ['licenses', locale],
    queryFn: async () => {
      const apiLocale = locale ? mapLocaleForAPI(locale) : undefined;
      const url = apiLocale ? `${BASE_API}/licenses?locale=${apiLocale}` : `${BASE_API}/licenses`;
      const res = await axios.get(url);
      return res.data;
    },
  });
};


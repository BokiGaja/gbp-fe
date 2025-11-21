import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API } from '@/constants/api';
import { mapLocaleForAPI } from '@/utils/locale';

export const usePartners = (locale?: string) => {
  return useQuery({
    queryKey: ['partners', locale],
    queryFn: async () => {
      const apiLocale = locale ? mapLocaleForAPI(locale) : undefined;
      const url = apiLocale ? `${BASE_API}/partners?locale=${apiLocale}` : `${BASE_API}/partners`;
      const res = await axios.get(url);
      return res.data;
    },
  });
};

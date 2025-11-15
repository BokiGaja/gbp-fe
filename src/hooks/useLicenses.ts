import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API } from '@/constants/api';

export const useLicenses = () => {
  return useQuery({
    queryKey: ['licenses'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/licenses`);
      return res.data;
    },
  });
};


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API } from '@/constants/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['top-categories'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/top-categories`);
      return res.data;
    },
  });
}; 
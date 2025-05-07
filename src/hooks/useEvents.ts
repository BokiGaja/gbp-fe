import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API } from '@/constants/api';

export const useEvents = () => {
  return useQuery({
    queryKey: ['top-events'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/top-events`);
      return res.data;
    },
  });
}; 
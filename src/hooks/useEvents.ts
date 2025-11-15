import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API } from '@/constants/api';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/events`);
      return res.data;
    },
  });
};

export const fetchEvent = async (slug: string) => {
  const res = await axios.get(`${BASE_API}/events?slug=${slug}`);
  return res.data;
};

export const useEvent = (slug: string) => {
  return useQuery({
    queryKey: ['event', slug],
    queryFn: () => fetchEvent(slug),
  });
}; 
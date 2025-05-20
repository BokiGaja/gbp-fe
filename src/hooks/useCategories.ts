import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API } from '@/constants/api';

export const fetchCategory = async (slug: string) => {
  const res = await axios.get(`${BASE_API}/categories?slug=${slug}`);
  return res.data;
};

export const useTopCategories = () => {
  return useQuery({
    queryKey: ['top-categories'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/top-categories`);
      return res.data;
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/categories`);
      return res.data;
    },
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => fetchCategory(slug),
  });
}; 
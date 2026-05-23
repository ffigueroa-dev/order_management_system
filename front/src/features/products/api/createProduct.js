import { api } from '@/api/axios';

export const createProduct = async (data) => {
  const res = await api.post('/products', data);
  return res.data;
};

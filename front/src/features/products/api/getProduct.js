import { api } from '@/api/axios';

export const getProduct = async (id) => {
  if (!id) {
    throw new Error('id is required');
  }
  const res = await api.get(`/products/${id}`);
  return res.data;
};

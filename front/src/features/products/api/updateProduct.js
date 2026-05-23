import { api } from '@/api/axios';

export const updateProduct = async (id, data) => {
  if (!id) {
    throw new Error('id is required');
  }
  const res = await api.patch(`/products/${id}`, data);
  return res.data;
};

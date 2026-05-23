import { api } from '@/api/axios';

export const deleteProduct = async (id) => {
  if (!id) {
    throw new Error('id is required');
  }
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

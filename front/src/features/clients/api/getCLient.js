import { api } from '@/api/axios';

export const getClient = async (id) => {
  if (!id) {
    throw new Error('id is required');
  }
  const res = await api.get(`/clients/${id}`);
  return res.data;
};

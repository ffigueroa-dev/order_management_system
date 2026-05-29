import { api } from '@/api/axios';

export const getUser = async (id) => {
  if (!id) {
    throw new Error('id is required');
  }
  const res = await api.get(`/users/${id}`);
  
  return res.data;
};

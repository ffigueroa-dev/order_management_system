import { api } from '@/api/axios';

export const deleteUser = async (id) => {
  if (!id) {
    throw new Error('id is required');
  }
  const res = await api.delete(`/users/${id}`);
  
  return res.data;
};

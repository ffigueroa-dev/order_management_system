import { api } from '@/api/axios';

export const updateUser = async (id, data) => {
  if (!id) {
    throw new Error('id is required');
  }
  const res = await api.patch(`/users/${id}`, data);
  return res.data;
};

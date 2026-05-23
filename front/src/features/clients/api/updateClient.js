import { api } from '@/api/axios';

export const updateClient = async (id, data) => {
  if (!id) {
    throw new Error('id is required');
  }
  const res = await api.patch(`/clients/${id}`, data);
  return res.data;
};

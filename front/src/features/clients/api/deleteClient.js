import { api } from '@/api/axios';

export const deleteClient = async (id) => {
  if (!id) {
    throw new Error('id is required');
  }
  const res = await api.delete(`/clients/${id}`);
  return res.data;
};

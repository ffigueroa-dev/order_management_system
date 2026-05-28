import { api } from '@/api/axios';

export const deleteStatus = async (id) => {
  if (!id) {
    throw new Error('id is required');
  }
  const res = await api.delete(`/statuses/${id}`);
  return res.data;
};

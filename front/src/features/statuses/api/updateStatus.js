import { api } from '@/api/axios';

export const updateStatus = async (id, data) => {
  const res = await api.patch(`/statuses/${id}`, data);
  return res.data;
};

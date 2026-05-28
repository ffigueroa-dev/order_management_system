import { api } from '@/api/axios';

export const createStatus = async (data) => {
  const response = await api.post('/statuses', data);
  return response.data;
};

import { api } from '@/api/axios';

export const getStatuses = async () => {
  const response = await api.get('/statuses');
  return response.data;
};

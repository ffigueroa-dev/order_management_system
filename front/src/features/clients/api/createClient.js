import { api } from '@/api/axios';

export const createClient = async (data) => {
  const res = await api.post('/clients', data);
  return res.data;
};

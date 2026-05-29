import { api } from '@/api/axios';

export const createUser = async (data) => {
  const res = await api.post('/users', data);
  return res.data;
};

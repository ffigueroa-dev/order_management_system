import { api } from '@/api/axios';

export const createOrder = async (data) => {
  const res = await api.post('/orders', data);
  return res.data;
};

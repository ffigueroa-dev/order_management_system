import { api } from '@/api/axios';

export const getOrder = async (id) => {
  if (!id) {
    throw new Error('id is required');
  }
  
  const response = await api.get(`/orders/${id}`);

  return response.data;
};
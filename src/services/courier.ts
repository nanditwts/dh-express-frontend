import api from './api';
import { Courier } from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getCouriers = async () => {
  const response = await api.get<any, ApiResponse<Courier[]>>('/couriers');
  return response.data;
};

export const createCourier = async (courier: Omit<Courier, 'id' | 'createdAt'>) => {
  const response = await api.post<any, ApiResponse<Courier>>('/couriers', courier);
  return response.data;
};

export const updateCourier = async (id: string, courier: Partial<Courier>) => {
  const response = await api.put<any, ApiResponse<Courier>>(`/couriers/${id}`, courier);
  return response.data;
};

export const deleteCourier = async (id: string) => {
  await api.delete(`/couriers/${id}`);
};
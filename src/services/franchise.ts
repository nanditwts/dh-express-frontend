import api from './api';
import { Franchise } from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getFranchises = async () => {
  const response = await api.get<any, ApiResponse<Franchise[]>>('/franchises');
  return response.data;
};

export const createFranchise = async (franchise: Omit<Franchise, 'id' | 'createdAt'>) => {
  const response = await api.post<any, ApiResponse<Franchise>>('/franchises', franchise);
  return response.data;
};

export const updateFranchise = async (id: string, franchise: Partial<Franchise>) => {
  const response = await api.put<any, ApiResponse<Franchise>>(`/franchises/${id}`, franchise);
  return response.data;
};

export const deleteFranchise = async (id: string) => {
  await api.delete(`/franchises/${id}`);
};
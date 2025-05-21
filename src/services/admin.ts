import api from './api';
import { Admin } from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const fetchAdmins = async () => {
  const response = await api.get<any, ApiResponse<Admin[]>>('/admins');
  return response.data;
};

export const createAdmin = async (admin: Omit<Admin, 'id' | 'createdAt'>) => {
  const response = await api.post<any, ApiResponse<Admin>>('/admins', admin);
  return response.data;
};

export const updateAdmin = async (id: string, admin: Partial<Admin>) => {
  const response = await api.put<any, ApiResponse<Admin>>(`/admins/${id}`, admin);
  return response.data;
};

export const deleteAdmin = async (id: string) => {
  await api.delete(`/admins/${id}`);
};
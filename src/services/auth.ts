import api from './api';
import { User } from '../types';

interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export const login = async (email: string, password: string) => {
  const response = await api.post<any, LoginResponse>('/auth/login', {
    email,
    password,
  });
  
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};
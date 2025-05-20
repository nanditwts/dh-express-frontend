import api from './api';
import { Channel } from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getChannels = async () => {
  const response = await api.get<any, ApiResponse<Channel[]>>('/channels');
  return response.data;
};

export const createChannel = async (channel: Omit<Channel, 'id' | 'createdAt'>) => {
  const response = await api.post<any, ApiResponse<Channel>>('/channels', channel);
  return response.data;
};

export const updateChannel = async (id: string, channel: Partial<Channel>) => {
  const response = await api.put<any, ApiResponse<Channel>>(`/channels/${id}`, channel);
  return response.data;
};

export const deleteChannel = async (id: string) => {
  await api.delete(`/channels/${id}`);
};
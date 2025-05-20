import { create } from 'zustand';
import { Channel } from '../types';
import * as channelService from '../services/channel';
import { toast } from 'react-toastify';

interface ChannelState {
  channels: Channel[];
  isLoading: boolean;
  addChannel: (channel: Omit<Channel, 'id' | 'createdAt'>) => Promise<void>;
  updateChannel: (id: string, channel: Partial<Channel>) => Promise<void>;
  deleteChannel: (id: string) => Promise<void>;
  getChannelById: (id: string) => Channel | undefined;
  getChannelsByCourierId: (courierId: string) => Channel[];
  fetchChannels: () => Promise<void>;
}

export const useChannelStore = create<ChannelState>()((set, get) => ({
  channels: [],
  isLoading: false,
  fetchChannels: async () => {
    try {
      set({ isLoading: true });
      const channels = await channelService.getChannels();
      set({ channels });
    } catch (error) {
      toast.error(error as string);
    } finally {
      set({ isLoading: false });
    }
  },
  addChannel: async (channel) => {
    try {
      set({ isLoading: true });
      const newChannel = await channelService.createChannel(channel);
      set((state) => ({
        channels: [...state.channels, newChannel],
      }));
    } catch (error) {
      toast.error(error as string);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateChannel: async (id, channel) => {
    try {
      set({ isLoading: true });
      const updatedChannel = await channelService.updateChannel(id, channel);
      set((state) => ({
        channels: state.channels.map((c) => (c.id === id ? updatedChannel : c)),
      }));
    } catch (error) {
      toast.error(error as string);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteChannel: async (id) => {
    try {
      set({ isLoading: true });
      await channelService.deleteChannel(id);
      set((state) => ({
        channels: state.channels.filter((channel) => channel.id !== id),
      }));
    } catch (error) {
      toast.error(error as string);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  getChannelById: (id) => {
    return get().channels.find((channel) => channel.id === id);
  },
  getChannelsByCourierId: (courierId) => {
    return get().channels.filter((channel) => channel.courierId === courierId);
  },
}));
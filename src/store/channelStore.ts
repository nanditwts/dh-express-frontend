import { create } from 'zustand';
import { Channel } from '../types';
import { fetchChannels as fetchChannelsApi } from '../services/channel';

interface ChannelStore {
  channels: Channel[];
  fetchChannels: () => Promise<void>;
}

export const useChannelStore = create<ChannelStore>((set) => ({
  channels: [],
  fetchChannels: async () => {
    try {
      const channels = await fetchChannelsApi();
      set({ channels });
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  },
}));
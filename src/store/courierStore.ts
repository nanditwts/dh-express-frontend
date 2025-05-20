import { create } from 'zustand';
import { Courier } from '../types';
import { fetchCouriers as fetchCouriersApi } from '../services/courier';

interface CourierStore {
  couriers: Courier[];
  fetchCouriers: () => Promise<void>;
}

export const useCourierStore = create<CourierStore>((set) => ({
  couriers: [],
  fetchCouriers: async () => {
    try {
      const couriers = await fetchCouriersApi();
      set({ couriers });
    } catch (error) {
      console.error('Error fetching couriers:', error);
    }
  },
}));
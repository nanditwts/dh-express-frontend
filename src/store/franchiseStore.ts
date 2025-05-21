import { create } from 'zustand';
import { Franchise } from '../types';
import { getFranchises as fetchFranchisesApi } from '../services/franchise';

interface FranchiseStore {
  franchises: Franchise[];
  fetchFranchises: () => Promise<void>;
}

export const useFranchiseStore = create<FranchiseStore>((set) => ({
  franchises: [],
  fetchFranchises: async () => {
    try {
      const franchises = await fetchFranchisesApi();
      set({ franchises });
    } catch (error) {
      console.error('Error fetching franchises:', error);
    }
  },
}));
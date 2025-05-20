import { create } from 'zustand';
import { Admin } from '../types';
import { fetchAdmins as fetchAdminsApi } from '../services/admin';

interface AdminStore {
  admins: Admin[];
  fetchAdmins: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  admins: [],
  fetchAdmins: async () => {
    try {
      const admins = await fetchAdminsApi();
      set({ admins });
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  },
}));
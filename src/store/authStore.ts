import { create } from 'zustand';
import { User } from '../types';
import { login as loginApi, logout as logoutApi } from '../services/auth';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      const user = await loginApi(email, password);
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      await logoutApi();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },
}));
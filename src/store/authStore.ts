import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import * as authService from '../services/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const user = await authService.login(email, password);
          set({
            user,
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          return false;
        }
      },
      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
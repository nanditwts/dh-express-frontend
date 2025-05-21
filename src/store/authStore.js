import { create } from "zustand";
import { persist } from "zustand/middleware";

import * as authService from "../services/auth";

export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      login: async (email, password) => {
        try {
          const { user, token } = await authService.login(email, password);

          set({
            user,
            isAuthenticated: true,
            token,
          });
          return true;
        } catch (error) {
          return false;
        }
      },
      logout: () => {
        localStorage.removeItem("token");
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

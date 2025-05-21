import { create } from "zustand";

import * as adminService from "../services/admin";
import { toast } from "react-toastify";

export const useAdminStore = create()((set, get) => ({
  admins: [],
  isLoading: false,
  fetchAdmins: async () => {
    try {
      set({ isLoading: true });
      const admins = await adminService.getAdmins();
      set({ admins });
    } catch (error) {
      toast.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  addAdmin: async (admin) => {
    try {
      set({ isLoading: true });
      const newAdmin = await adminService.createAdmin(admin);
      set((state) => ({
        admins: [...state.admins, newAdmin],
      }));
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateAdmin: async (id, admin) => {
    try {
      set({ isLoading: true });
      const updatedAdmin = await adminService.updateAdmin(id, admin);
      set((state) => ({
        admins: state.admins.map((a) => (a.id === id ? updatedAdmin : a)),
      }));
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteAdmin: async (id) => {
    try {
      set({ isLoading: true });
      await adminService.deleteAdmin(id);
      set((state) => ({
        admins: state.admins.filter((admin) => admin.id !== id),
      }));
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  getAdminById: (id) => {
    return get().admins.find((admin) => admin.id === id);
  },
}));

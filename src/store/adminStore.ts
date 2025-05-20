import { create } from 'zustand';
import { Admin } from '../types';
import * as adminService from '../services/admin';
import { toast } from 'react-toastify';

interface AdminState {
  admins: Admin[];
  isLoading: boolean;
  addAdmin: (admin: Omit<Admin, 'id' | 'createdAt'>) => Promise<void>;
  updateAdmin: (id: string, admin: Partial<Admin>) => Promise<void>;
  deleteAdmin: (id: string) => Promise<void>;
  getAdminById: (id: string) => Admin | undefined;
  fetchAdmins: () => Promise<void>;
}

export const useAdminStore = create<AdminState>()((set, get) => ({
  admins: [],
  isLoading: false,
  fetchAdmins: async () => {
    try {
      set({ isLoading: true });
      const admins = await adminService.getAdmins();
      set({ admins });
    } catch (error) {
      toast.error(error as string);
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
      toast.error(error as string);
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
      toast.error(error as string);
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
      toast.error(error as string);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  getAdminById: (id) => {
    return get().admins.find((admin) => admin.id === id);
  },
}));
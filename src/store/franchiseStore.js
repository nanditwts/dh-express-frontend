import { create } from "zustand";

import * as franchiseService from "../services/franchise";
import { toast } from "react-toastify";

export const useFranchiseStore = create()((set, get) => ({
  franchises: [],
  isLoading: false,
  fetchFranchises: async () => {
    try {
      set({ isLoading: true });
      const franchises = await franchiseService.getFranchises();
      set({ franchises });
    } catch (error) {
      toast.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  addFranchise: async (franchise) => {
    try {
      set({ isLoading: true });
      const newFranchise = await franchiseService.createFranchise(franchise);
      set((state) => ({
        franchises: [...state.franchises, newFranchise],
      }));
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateFranchise: async (id, franchise) => {
    try {
      set({ isLoading: true });
      const updatedFranchise = await franchiseService.updateFranchise(
        id,
        franchise
      );
      set((state) => ({
        franchises: state.franchises.map((f) =>
          f.id === id ? updatedFranchise : f
        ),
      }));
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteFranchise: async (id) => {
    try {
      set({ isLoading: true });
      await franchiseService.deleteFranchise(id);
      set((state) => ({
        franchises: state.franchises.filter((franchise) => franchise.id !== id),
      }));
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  getFranchiseById: (id) => {
    return get().franchises.find((franchise) => franchise.id === id);
  },
  getFranchisesByAdminId: (adminId) => {
    return get().franchises.filter(
      (franchise) => franchise.adminId === adminId
    );
  },
}));

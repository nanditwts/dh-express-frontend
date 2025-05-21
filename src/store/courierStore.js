import { create } from "zustand";

import * as courierService from "../services/courier";
import { toast } from "react-toastify";

export const useCourierStore = create()((set, get) => ({
  couriers: [],
  isLoading: false,
  fetchCouriers: async () => {
    try {
      set({ isLoading: true });
      const couriers = await courierService.getCouriers();
      set({ couriers });
    } catch (error) {
      toast.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  addCourier: async (courier) => {
    try {
      set({ isLoading: true });
      const newCourier = await courierService.createCourier(courier);
      set((state) => ({
        couriers: [...state.couriers, newCourier],
      }));
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateCourier: async (id, courier) => {
    try {
      set({ isLoading: true });
      const updatedCourier = await courierService.updateCourier(id, courier);
      set((state) => ({
        couriers: state.couriers.map((c) => (c.id === id ? updatedCourier : c)),
      }));
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteCourier: async (id) => {
    try {
      set({ isLoading: true });
      await courierService.deleteCourier(id);
      set((state) => ({
        couriers: state.couriers.filter((courier) => courier.id !== id),
      }));
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  getCourierById: (id) => {
    return get().couriers.find((courier) => courier.id === id);
  },
}));

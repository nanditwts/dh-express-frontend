import { create } from 'zustand';
import { Courier } from '../types';
import * as courierService from '../services/courier';
import { toast } from 'react-toastify';

interface CourierState {
  couriers: Courier[];
  isLoading: boolean;
  addCourier: (courier: Omit<Courier, 'id' | 'createdAt'>) => Promise<void>;
  updateCourier: (id: string, courier: Partial<Courier>) => Promise<void>;
  deleteCourier: (id: string) => Promise<void>;
  getCourierById: (id: string) => Courier | undefined;
  fetchCouriers: () => Promise<void>;
}

export const useCourierStore = create<CourierState>()((set, get) => ({
  couriers: [],
  isLoading: false,
  fetchCouriers: async () => {
    try {
      set({ isLoading: true });
      const couriers = await courierService.getCouriers();
      set({ couriers });
    } catch (error) {
      toast.error(error as string);
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
      toast.error(error as string);
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
      toast.error(error as string);
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
      toast.error(error as string);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  getCourierById: (id) => {
    return get().couriers.find((courier) => courier.id === id);
  },
}));
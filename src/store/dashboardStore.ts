import { create } from 'zustand';
import { DashboardStats } from '../types';
import { useAdminStore } from './adminStore';
import { useFranchiseStore } from './franchiseStore';

interface DashboardState {
  stats: DashboardStats;
  isLoading: boolean;
  refreshStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  stats: {
    totalFranchises: 0,
    activeFranchises: 0,
    totalAdmins: 0,
    activeAdmins: 0,
    pendingKyc: 0,
    averageCommission: 0,
  },
  isLoading: false,
  refreshStats: async () => {
    set({ isLoading: true });
    
    try {
      // Fetch fresh data
      await Promise.all([
        useAdminStore.getState().fetchAdmins(),
        useFranchiseStore.getState().fetchFranchises(),
      ]);
      
      const admins = useAdminStore.getState().admins;
      const franchises = useFranchiseStore.getState().franchises;
      
      const totalAdmins = admins.length;
      const activeAdmins = admins.filter((admin) => admin.isActive).length;
      
      const totalFranchises = franchises.length;
      const pendingKyc = franchises.filter((franchise) => franchise.kycStatus === 'Pending').length;
      const activeFranchises = totalFranchises - pendingKyc;
      
      const totalCommission = franchises.reduce((sum, franchise) => sum + franchise.commission, 0);
      const averageCommission = totalFranchises > 0 ? Number((totalCommission / totalFranchises).toFixed(2)) : 0;
      
      set({
        stats: {
          totalFranchises,
          activeFranchises,
          totalAdmins,
          activeAdmins,
          pendingKyc,
          averageCommission,
        },
      });
    } catch (error) {
      console.error('Error refreshing stats:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
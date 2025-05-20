import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, CheckCircle2, Clock, TrendingUp, BarChart } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { StatsCard } from '../components/dashboard/StatsCard';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { useDashboardStore } from '../store/dashboardStore';
import { useAdminStore } from '../store/adminStore';
import { useFranchiseStore } from '../store/franchiseStore';

export const DashboardPage: React.FC = () => {
  const { stats, refreshStats, isLoading } = useDashboardStore();
  const { admins } = useAdminStore();
  const { franchises } = useFranchiseStore();
  
  useEffect(() => {
    refreshStats();
  }, []);
  
  // Get most recent franchises, sorted by date
  const recentFranchises = [...franchises]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  


  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to DH Express management portal</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatsCard
              title="Total Franchises"
              value={stats.totalFranchises}
              icon={<Building2 size={24} />}
              isLoading={isLoading}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatsCard
              title="Active Franchises"
              value={stats.activeFranchises}
              icon={<CheckCircle2 size={24} />}
              isLoading={isLoading}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatsCard
              title="Total Admins"
              value={stats.totalAdmins}
              icon={<Users size={24} />}
              isLoading={isLoading}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatsCard
              title="Pending KYC"
              value={stats.pendingKyc}
              icon={<Clock size={24} />}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card
                title="Recent Franchises"
                icon={<Building2 size={20} />}
                className="h-full"
              >
                <Table
                  columns={[
                    { header: 'Franchise Name', accessor: 'franchiseName' },
                    { header: 'Admin', accessor: (item) => {
                      const admin = admins.find(a => a.id === item.adminId);
                      return admin ? admin.businessName : 'N/A';
                    }},
                    { header: 'City', accessor: 'city' },
                    { header: 'KYC Status', accessor: (item) => (
                      <Badge
                        variant={item.kycStatus === 'Approved' ? 'success' : 'warning'}
                      >
                        {item.kycStatus}
                      </Badge>
                    )},
                  ]}
                  data={recentFranchises}
                  keyExtractor={(item) => item.id}
                  emptyMessage="No franchises found"
                />
              </Card>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card
              title="Commission Overview"
              icon={<TrendingUp size={20} />}
              className="h-full"
            >
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center p-4 bg-primary-50 rounded-full mb-4">
                  <BarChart size={32} className="text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.averageCommission}%
                </div>
                <div className="text-sm text-gray-500 mt-1">Average Commission</div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Franchises</span>
                    <span className="font-medium text-gray-900">{stats.totalFranchises}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Active Franchises</span>
                    <span className="font-medium text-gray-900">{stats.activeFranchises}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-success-500 h-2 rounded-full"
                      style={{
                        width: `${stats.totalFranchises ? (stats.activeFranchises / stats.totalFranchises) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Pending KYC</span>
                    <span className="font-medium text-gray-900">{stats.pendingKyc}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-warning-500 h-2 rounded-full"
                      style={{
                        width: `${stats.totalFranchises ? (stats.pendingKyc / stats.totalFranchises) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminListPage } from './pages/AdminListPage';
import { FranchiseListPage } from './pages/FranchiseListPage';
import { CourierListPage } from './pages/CourierListPage';
import { ChannelListPage } from './pages/ChannelListPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { useAdminStore } from './store/adminStore';
import { useFranchiseStore } from './store/franchiseStore';
import { useCourierStore } from './store/courierStore';
import { useChannelStore } from './store/channelStore';

function App() {
  const { fetchAdmins } = useAdminStore();
  const { fetchFranchises } = useFranchiseStore();
  const { fetchCouriers } = useCourierStore();
  const { fetchChannels } = useChannelStore();

  useEffect(() => {
    // Fetch initial data
    fetchAdmins();
    fetchFranchises();
    fetchCouriers();
    fetchChannels();
  }, [fetchAdmins, fetchFranchises, fetchCouriers, fetchChannels]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/couriers"
            element={
              <ProtectedRoute>
                <CourierListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/channels"
            element={
              <ProtectedRoute>
                <ChannelListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admins"
            element={
              <ProtectedRoute>
                <AdminListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/franchises"
            element={
              <ProtectedRoute>
                <FranchiseListPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
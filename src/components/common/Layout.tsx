import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  Users,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Building2,
  Truck,
  Share2,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAdminStore } from '../../store/adminStore';
import { useFranchiseStore } from '../../store/franchiseStore';
import { useCourierStore } from '../../store/courierStore';
import { useChannelStore } from '../../store/channelStore';
import { Button } from '../ui/Button';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
  isActive: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon,
  label,
  count,
  isActive,
  onClick,
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-primary-700 text-white'
          : 'text-gray-300 hover:bg-primary-800 hover:text-white'
      }`}
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium flex-1">{label}</span>
      {count !== undefined && (
        <span className="bg-primary-800 text-white text-xs px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { logout, user } = useAuthStore();
  const { admins } = useAdminStore();
  const { franchises } = useFranchiseStore();
  const { couriers } = useCourierStore();
  const { channels } = useChannelStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const adminCount = admins.length;
  const franchiseCount = franchises.length;
  const courierCount = couriers.length;
  const channelCount = channels.length;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-primary-900 text-white">
        <div className="p-4 flex items-center space-x-2 border-b border-primary-800">
          <Package size={28} className="text-primary-400" />
          <h1 className="text-xl font-bold">DH Express</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem
            to="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            isActive={location.pathname === '/dashboard'}
          />
          <SidebarItem
            to="/couriers"
            icon={<Truck size={20} />}
            label="Couriers"
            count={courierCount}
            isActive={location.pathname.startsWith('/couriers')}
          />
          <SidebarItem
            to="/channels"
            icon={<Share2 size={20} />}
            label="Channels"
            count={channelCount}
            isActive={location.pathname.startsWith('/channels')}
          />
          <SidebarItem
            to="/admins"
            icon={<Users size={20} />}
            label="Admins"
            count={adminCount}
            isActive={location.pathname.startsWith('/admins')}
          />
          <SidebarItem
            to="/franchises"
            icon={<Building2 size={20} />}
            label="Franchises"
            count={franchiseCount}
            isActive={location.pathname.startsWith('/franchises')}
          />
        </nav>
        <div className="p-4 border-t border-primary-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-2 text-gray-300 hover:bg-primary-800 hover:text-white rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-200 md:hidden ${
          isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileSidebar}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-primary-900 text-white z-30 transform transition-transform duration-200 ease-in-out md:hidden ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-primary-800">
          <div className="flex items-center space-x-2">
            <Package size={24} className="text-primary-400" />
            <h1 className="text-lg font-bold">DH Express</h1>
          </div>
          <button
            onClick={closeMobileSidebar}
            className="text-gray-300 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem
            to="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            isActive={location.pathname === '/dashboard'}
            onClick={closeMobileSidebar}
          />
          <SidebarItem
            to="/couriers"
            icon={<Truck size={20} />}
            label="Couriers"
            count={courierCount}
            isActive={location.pathname.startsWith('/couriers')}
            onClick={closeMobileSidebar}
          />
          <SidebarItem
            to="/channels"
            icon={<Share2 size={20} />}
            label="Channels"
            count={channelCount}
            isActive={location.pathname.startsWith('/channels')}
            onClick={closeMobileSidebar}
          />
          <SidebarItem
            to="/admins"
            icon={<Users size={20} />}
            label="Admins"
            count={adminCount}
            isActive={location.pathname.startsWith('/admins')}
            onClick={closeMobileSidebar}
          />
          <SidebarItem
            to="/franchises"
            icon={<Building2 size={20} />}
            label="Franchises"
            count={franchiseCount}
            isActive={location.pathname.startsWith('/franchises')}
            onClick={closeMobileSidebar}
          />
        </nav>
        <div className="p-4 border-t border-primary-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-2 text-gray-300 hover:bg-primary-800 hover:text-white rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  {user?.name.charAt(0)}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isProfileDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'admin';
}

export interface Admin {
  id: string;
  businessName: string;
  contactPersonName: string;
  email: string;
  contactPersonMobile: string;
  city: string;
  state: string;
  commission: number;
  isActive: boolean;
  createdAt: string;
}

export interface Franchise {
  id: string;
  franchiseName: string;
  contactPersonName: string;
  contactPersonMobile: string;
  gstNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  commission: number;
  kycStatus: 'Approved' | 'Pending';
  adminId: string;
  createdAt: string;
}

export interface Courier {
  id: string;
  name: string;
  logo: string;
  isActive: boolean;
  createdAt: string;
}

export interface Channel {
  id: string;
  courierId: string;
  type: 'B2B' | 'B2C';
  businessName: string;
  apiKey: string;
  secretKey: string;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalFranchises: number;
  activeFranchises: number;
  totalAdmins: number;
  activeAdmins: number;
  pendingKyc: number;
  averageCommission: number;
}

export interface FormErrors {
  [key: string]: string;
}
import React, { useState, useEffect } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Franchise } from '../../types';
import { validateFranchiseForm } from '../../utils/validation';
import { useAdminStore } from '../../store/adminStore';

interface FranchiseFormProps {
  initialData?: Franchise;
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const FranchiseForm: React.FC<FranchiseFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const { admins } = useAdminStore();
  const activeAdmins = admins.filter(admin => admin.isActive);
  
  const [formData, setFormData] = useState({
    franchiseName: initialData?.franchiseName || '',
    contactPersonName: initialData?.contactPersonName || '',
    contactPersonMobile: initialData?.contactPersonMobile || '',
    gstNumber: initialData?.gstNumber || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    pincode: initialData?.pincode || '',
    commission: initialData?.commission.toString() || '',
    kycStatus: initialData?.kycStatus || 'Pending',
    adminId: initialData?.adminId || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateFranchiseForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit({
      ...formData,
      commission: Number(formData.commission),
    });
  };

  const adminOptions = activeAdmins.map((admin) => ({
    value: admin.id,
    label: `${admin.businessName} (${admin.contactPersonName})`,
  }));

  const kycStatusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Franchise Name"
          name="franchiseName"
          value={formData.franchiseName}
          onChange={handleChange}
          error={errors.franchiseName}
          placeholder="Enter franchise name"
        />
        <Input
          label="Contact Person Name"
          name="contactPersonName"
          value={formData.contactPersonName}
          onChange={handleChange}
          error={errors.contactPersonName}
          placeholder="Enter contact person name"
        />
        <Input
          label="Contact Mobile"
          name="contactPersonMobile"
          value={formData.contactPersonMobile}
          onChange={handleChange}
          error={errors.contactPersonMobile}
          placeholder="Enter 10-digit mobile number"
        />
        <Input
          label="GST Number"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}
          error={errors.gstNumber}
          placeholder="Enter GST number"
        />
        <div className="md:col-span-2">
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            placeholder="Enter complete address"
          />
        </div>
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
          placeholder="Enter city"
        />
        <Input
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          error={errors.state}
          placeholder="Enter state"
        />
        <Input
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          error={errors.pincode}
          placeholder="Enter 6-digit pincode"
        />
        <Input
          label="Commission (%)"
          type="number"
          name="commission"
          value={formData.commission}
          onChange={handleChange}
          error={errors.commission}
          placeholder="Enter commission percentage"
          min="0"
          max="100"
          step="0.1"
        />
        <Select
          label="KYC Status"
          options={kycStatusOptions}
          value={formData.kycStatus}
          onChange={handleSelectChange('kycStatus')}
          error={errors.kycStatus}
        />
        <Select
          label="Franchise Admin"
          options={adminOptions}
          value={formData.adminId}
          onChange={handleSelectChange('adminId')}
          error={errors.adminId}
        />
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Update' : 'Create'} Franchise
        </Button>
      </div>
    </form>
  );
};
import React, { useState, useEffect } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { Admin } from '../../types';
import { validateAdminForm } from '../../utils/validation';

interface AdminFormProps {
  initialData?: Admin;
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const AdminForm: React.FC<AdminFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    businessName: initialData?.businessName || '',
    contactPersonName: initialData?.contactPersonName || '',
    email: initialData?.email || '',
    password: '',
    contactPersonMobile: initialData?.contactPersonMobile || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    commission: initialData?.commission.toString() || '',
    isActive: initialData?.isActive ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (isActive: boolean) => {
    setFormData((prev) => ({ ...prev, isActive }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateAdminForm({
      ...formData,
      id: initialData?.id,
    });
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit({
      ...formData,
      commission: Number(formData.commission),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Business Name"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          error={errors.businessName}
          placeholder="Enter business name"
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
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter email address"
        />
        <Input
          label={initialData ? "Password (leave blank to keep current)" : "Password"}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder={initialData ? "••••••••" : "Enter password"}
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
      </div>
      
      <div className="mt-4">
        <Toggle
          enabled={formData.isActive}
          onChange={handleToggleChange}
          label="Active Status"
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
          {initialData ? 'Update' : 'Create'} Admin
        </Button>
      </div>
    </form>
  );
};
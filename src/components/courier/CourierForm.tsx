import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { Courier } from '../../types';
import { validateCourierForm } from '../../utils/validation';

interface CourierFormProps {
  initialData?: Courier;
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const CourierForm: React.FC<CourierFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    logo: initialData?.logo || '',
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
    
    const validationErrors = validateCourierForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Courier Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter courier name"
        />
        <Input
          label="Logo URL"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          error={errors.logo}
          placeholder="Enter logo URL"
        />
        {formData.logo && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">Logo Preview:</p>
            <img
              src={formData.logo}
              alt="Logo preview"
              className="w-32 h-32 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}
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
          {initialData ? 'Update' : 'Create'} Courier
        </Button>
      </div>
    </form>
  );
};
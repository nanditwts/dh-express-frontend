import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Toggle } from '../ui/Toggle';
import { Channel } from '../../types';
import { validateChannelForm } from '../../utils/validation';
import { useCourierStore } from '../../store/courierStore';

interface ChannelFormProps {
  initialData?: Channel;
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ChannelForm: React.FC<ChannelFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const { couriers } = useCourierStore();
  const activeCouriers = couriers.filter(courier => courier.isActive);
  
  const [formData, setFormData] = useState({
    courierId: initialData?.courierId || '',
    type: initialData?.type || '',
    businessName: initialData?.businessName || '',
    apiKey: initialData?.apiKey || '',
    secretKey: initialData?.secretKey || '',
    isActive: initialData?.isActive ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (isActive: boolean) => {
    setFormData((prev) => ({ ...prev, isActive }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateChannelForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit(formData);
  };

  const courierOptions = activeCouriers.map((courier) => ({
    value: courier.id,
    label: courier.name,
  }));

  const typeOptions = [
    { value: 'B2B', label: 'B2B' },
    { value: 'B2C', label: 'B2C' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Courier"
          options={courierOptions}
          value={formData.courierId}
          onChange={handleSelectChange('courierId')}
          error={errors.courierId}
        />
        <Select
          label="Channel Type"
          options={typeOptions}
          value={formData.type}
          onChange={handleSelectChange('type')}
          error={errors.type}
        />
        <Input
          label="Business Name"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          error={errors.businessName}
          placeholder="Enter business name"
        />
        <Input
          label="API Key"
          name="apiKey"
          value={formData.apiKey}
          onChange={handleChange}
          error={errors.apiKey}
          placeholder="Enter API key"
        />
        <Input
          label="Secret Key"
          name="secretKey"
          value={formData.secretKey}
          onChange={handleChange}
          error={errors.secretKey}
          placeholder="Enter secret key"
          type="password"
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
          {initialData ? 'Update' : 'Create'} Channel
        </Button>
      </div>
    </form>
  );
};
import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Toggle } from "../ui/Toggle";

import { validateAdminForm } from "../../utils/validation";

export const AdminForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    business_name: initialData?.business_name || "",
    contact_person_name: initialData?.contact_person_name || "",
    email: initialData?.email || "",
    password: "",
    contact_person_mobile: initialData?.contact_person_mobile || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    commission: initialData?.commission.toString() || "",
    is_active: initialData?.is_active ?? true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (is_active) => {
    setFormData((prev) => ({ ...prev, is_active }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateAdminForm({
      ...formData,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("HERERERE");
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
          name="business_name"
          value={formData.business_name}
          onChange={handleChange}
          error={errors.business_name}
          placeholder="Enter business name"
        />
        <Input
          label="Contact Person Name"
          name="contact_person_name"
          value={formData.contact_person_name}
          onChange={handleChange}
          error={errors.contact_person_name}
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
          label={
            initialData ? "Password (leave blank to keep current)" : "Password"
          }
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder={initialData ? "••••••••" : "Enter password"}
        />
        <Input
          label="Contact Mobile"
          name="contact_person_mobile"
          value={formData.contact_person_mobile}
          onChange={handleChange}
          error={errors.contact_person_mobile}
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
          enabled={formData.is_active}
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
          {initialData ? "Update" : "Create"} Admin
        </Button>
      </div>
    </form>
  );
};

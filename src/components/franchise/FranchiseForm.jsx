import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Select } from "../ui/Select";

import { validateFranchiseForm } from "../../utils/validation";
import { useAdminStore } from "../../store/adminStore";

export const FranchiseForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const { admins } = useAdminStore();
  const activeAdmins = admins.filter((admin) => admin.is_active);

  const [formData, setFormData] = useState({
    franchise_name: initialData?.franchise_name || "",
    contact_person_name: initialData?.contact_person_name || "",
    contact_person_mobile: initialData?.contact_person_mobile || "",
    gst_number: initialData?.gst_number || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    pincode: initialData?.pincode || "",
    commission: initialData?.commission.toString() || "",
    kyc_status: initialData?.kyc_status || "Pending",
    admin_id: initialData?.admin_id || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
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
    label: `${admin.business_name} (${admin.contact_person_name})`,
  }));

  const kyc_statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Franchise Name"
          name="franchise_name"
          value={formData.franchise_name}
          onChange={handleChange}
          error={errors.franchise_name}
          placeholder="Enter franchise name"
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
          label="Contact Mobile"
          name="contact_person_mobile"
          value={formData.contact_person_mobile}
          onChange={handleChange}
          error={errors.contact_person_mobile}
          placeholder="Enter 10-digit mobile number"
        />
        <Input
          label="GST Number"
          name="gst_number"
          value={formData.gst_number}
          onChange={handleChange}
          error={errors.gst_number}
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
          options={kyc_statusOptions}
          value={formData.kyc_status}
          onChange={handleSelectChange("kyc_status")}
          error={errors.kyc_status}
        />
        <Select
          label="Franchise Admin"
          options={adminOptions}
          value={formData.admin_id}
          onChange={handleSelectChange("admin_id")}
          error={errors.admin_id}
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
          {initialData ? "Update" : "Create"} Franchise
        </Button>
      </div>
    </form>
  );
};

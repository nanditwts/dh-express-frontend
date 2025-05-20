import { FormErrors } from '../types';

export const validateCourierForm = (data: Record<string, any>): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name?.trim()) {
    errors.name = 'Courier name is required';
  }

  if (!data.logo?.trim()) {
    errors.logo = 'Logo URL is required';
  } else if (!isValidUrl(data.logo)) {
    errors.logo = 'Please enter a valid URL';
  }

  return errors;
};

export const validateChannelForm = (data: Record<string, any>): FormErrors => {
  const errors: FormErrors = {};

  if (!data.courierId) {
    errors.courierId = 'Please select a courier';
  }

  if (!data.type) {
    errors.type = 'Please select a channel type';
  }

  if (!data.businessName?.trim()) {
    errors.businessName = 'Business name is required';
  }

  if (!data.apiKey?.trim()) {
    errors.apiKey = 'API key is required';
  }

  if (!data.secretKey?.trim()) {
    errors.secretKey = 'Secret key is required';
  }

  return errors;
};

export const validateAdminForm = (data: Record<string, any>): FormErrors => {
  const errors: FormErrors = {};

  if (!data.businessName?.trim()) {
    errors.businessName = 'Business name is required';
  }

  if (!data.contactPersonName?.trim()) {
    errors.contactPersonName = 'Contact person name is required';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!data.password?.trim() && !data.id) {
    errors.password = 'Password is required';
  } else if (data.password && data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!data.contactPersonMobile?.trim()) {
    errors.contactPersonMobile = 'Contact person mobile is required';
  } else if (!/^\d{10}$/.test(data.contactPersonMobile)) {
    errors.contactPersonMobile = 'Mobile number must be 10 digits';
  }

  if (!data.city?.trim()) {
    errors.city = 'City is required';
  }

  if (!data.state?.trim()) {
    errors.state = 'State is required';
  }

  if (data.commission === undefined || data.commission === '') {
    errors.commission = 'Commission is required';
  } else if (isNaN(Number(data.commission)) || Number(data.commission) < 0 || Number(data.commission) > 100) {
    errors.commission = 'Commission must be between 0 and 100';
  }

  return errors;
};

export const validateFranchiseForm = (data: Record<string, any>): FormErrors => {
  const errors: FormErrors = {};

  if (!data.franchiseName?.trim()) {
    errors.franchiseName = 'Franchise name is required';
  }

  if (!data.contactPersonName?.trim()) {
    errors.contactPersonName = 'Contact person name is required';
  }

  if (!data.contactPersonMobile?.trim()) {
    errors.contactPersonMobile = 'Contact person mobile is required';
  } else if (!/^\d{10}$/.test(data.contactPersonMobile)) {
    errors.contactPersonMobile = 'Mobile number must be 10 digits';
  }

  if (!data.gstNumber?.trim()) {
    errors.gstNumber = 'GST number is required';
  } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(data.gstNumber)) {
    errors.gstNumber = 'Invalid GST number format';
  }

  if (!data.address?.trim()) {
    errors.address = 'Address is required';
  }

  if (!data.city?.trim()) {
    errors.city = 'City is required';
  }

  if (!data.state?.trim()) {
    errors.state = 'State is required';
  }

  if (!data.pincode?.trim()) {
    errors.pincode = 'Pincode is required';
  } else if (!/^\d{6}$/.test(data.pincode)) {
    errors.pincode = 'Pincode must be 6 digits';
  }

  if (data.commission === undefined || data.commission === '') {
    errors.commission = 'Commission is required';
  } else if (isNaN(Number(data.commission)) || Number(data.commission) < 0 || Number(data.commission) > 100) {
    errors.commission = 'Commission must be between 0 and 100';
  }

  if (!data.adminId) {
    errors.adminId = 'Please select a franchise admin';
  }

  return errors;
};

export const validateLoginForm = (data: Record<string, any>): FormErrors => {
  const errors: FormErrors = {};

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!data.password?.trim()) {
    errors.password = 'Password is required';
  }

  return errors;
};

function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
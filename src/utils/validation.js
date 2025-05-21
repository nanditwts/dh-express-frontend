export const validateCourierForm = (data) => {
  const errors = {};

  if (!data.name?.trim()) {
    errors.name = "Courier name is required";
  }

  if (!data.logo?.trim()) {
    errors.logo = "Logo URL is required";
  } else if (!isValidUrl(data.logo)) {
    errors.logo = "Please enter a valid URL";
  }

  return errors;
};

export const validateChannelForm = (data) => {
  const errors = {};

  if (!data.courierId) {
    errors.courierId = "Please select a courier";
  }

  if (!data.type) {
    errors.type = "Please select a channel type";
  }

  if (!data.businessName?.trim()) {
    errors.businessName = "Business name is required";
  }

  if (!data.apiKey?.trim()) {
    errors.apiKey = "API key is required";
  }

  if (!data.secretKey?.trim()) {
    errors.secretKey = "Secret key is required";
  }

  return errors;
};

export const validateAdminForm = (data) => {
  const errors = {};

  if (!data.business_name?.trim()) {
    errors.business_name = "Business name is required";
  }

  if (!data.contact_person_name?.trim()) {
    errors.contact_person_name = "Contact person name is required";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!data.password?.trim() && !data.id) {
    errors.password = "Password is required";
  } else if (data.password && data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!data.contact_person_mobile?.trim()) {
    errors.contact_person_mobile = "Contact person mobile is required";
  } else if (!/^\d{10}$/.test(data.contact_person_mobile)) {
    errors.contact_person_mobile = "Mobile number must be 10 digits";
  }

  if (!data.city?.trim()) {
    errors.city = "City is required";
  }

  if (!data.state?.trim()) {
    errors.state = "State is required";
  }

  if (data.commission === undefined || data.commission === "") {
    errors.commission = "Commission is required";
  } else if (
    isNaN(Number(data.commission)) ||
    Number(data.commission) < 0 ||
    Number(data.commission) > 100
  ) {
    errors.commission = "Commission must be between 0 and 100";
  }

  return errors;
};

export const validateFranchiseForm = (data) => {
  const errors = {};

  if (!data.franchise_name?.trim()) {
    errors.franchise_name = "Franchise name is required";
  }

  if (!data.contact_person_name?.trim()) {
    errors.contact_person_name = "Contact person name is required";
  }

  if (!data.contact_person_mobile?.trim()) {
    errors.contact_person_mobile = "Contact person mobile is required";
  } else if (!/^\d{10}$/.test(data.contact_person_mobile)) {
    errors.contact_person_mobile = "Mobile number must be 10 digits";
  }

  if (!data.gst_number?.trim()) {
    errors.gst_number = "GST number is required";
  } else if (
    !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
      data.gst_number
    )
  ) {
    errors.gst_number = "Invalid GST number format";
  }

  if (!data.address?.trim()) {
    errors.address = "Address is required";
  }

  if (!data.city?.trim()) {
    errors.city = "City is required";
  }

  if (!data.state?.trim()) {
    errors.state = "State is required";
  }

  if (!data.pincode?.trim()) {
    errors.pincode = "Pincode is required";
  } else if (!/^\d{6}$/.test(data.pincode)) {
    errors.pincode = "Pincode must be 6 digits";
  }

  if (data.commission === undefined || data.commission === "") {
    errors.commission = "Commission is required";
  } else if (
    isNaN(Number(data.commission)) ||
    Number(data.commission) < 0 ||
    Number(data.commission) > 100
  ) {
    errors.commission = "Commission must be between 0 and 100";
  }

  if (!data.admin_id) {
    errors.admin_id = "Please select a franchise admin";
  }

  console.log("ERRRRR", errors);

  return errors;
};

export const validateLoginForm = (data) => {
  const errors = {};

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!data.password?.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

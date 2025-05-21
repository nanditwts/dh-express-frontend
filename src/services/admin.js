import api from "./api";

export const getAdmins = async () => {
  const response = await api.get("/admins");
  return response.data;
};

export const createAdmin = async (admin) => {
  const response = await api.post("/admins", admin);
  return response.data;
};

export const updateAdmin = async (id, admin) => {
  const response = await api.put(`/admins/${id}`, admin);
  return response.data;
};

export const deleteAdmin = async (id) => {
  await api.delete(`/admins/${id}`);
};

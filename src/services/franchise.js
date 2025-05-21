import api from "./api";

export const getFranchises = async () => {
  const response = await api.get("/franchises");
  return response.data;
};

export const createFranchise = async (franchise) => {
  const response = await api.post("/franchises", franchise);
  return response.data;
};

export const updateFranchise = async (id, franchise) => {
  const response = await api.put(`/franchises/${id}`, franchise);
  return response.data;
};

export const deleteFranchise = async (id) => {
  await api.delete(`/franchises/${id}`);
};

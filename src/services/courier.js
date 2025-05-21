import api from "./api";

export const getCouriers = async () => {
  const response = await api.get("/couriers");
  return response.data;
};

export const createCourier = async (courier) => {
  const response = await api.post("/couriers", courier);
  return response.data;
};

export const updateCourier = async (id, courier) => {
  const response = await api.put(`/couriers/${id}`, courier);
  return response.data;
};

export const deleteCourier = async (id) => {
  await api.delete(`/couriers/${id}`);
};

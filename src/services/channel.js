import api from "./api";

export const getChannels = async () => {
  const response = await api.get("/channels");
  return response.data;
};

export const createChannel = async (channel) => {
  const response = await api.post("/channels", channel);
  return response.data;
};

export const updateChannel = async (id) => {
  const response = await api.put(`/channels/${id}`, channel);
  return response.data;
};

export const deleteChannel = async (id) => {
  await api.delete(`/channels/${id}`);
};

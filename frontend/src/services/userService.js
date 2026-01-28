import apiClient from "./apiService";

export const login = async (email, senha) => {
  const response = await apiClient.post("/users/login", { email, senha });
  return response;
};

export const getUsers = async () => {
  const response = await apiClient.get("/users");
  return response;
};

export const getUserById = async (userId) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response;
};

export const createUser = async (userData) => {
  const response = await apiClient.post("/users", userData);
  return response;
};

export const updateUser = async (userId, userData) => {
  const response = await apiClient.put(`/users/${userId}`, userData);
  return response;
};

export const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response;
};

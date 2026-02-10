import apiClient from "./apiService";

export const getMenusByRole = async (roleId) => {
  const response = await apiClient.get(`/menus/role/${roleId}`);
  return response;
};

export const getAllMenus = async () => {
  const response = await apiClient.get("/menus");
  return response;
};

export const getMenuById = async (menuId) => {
  const response = await apiClient.get(`/menus/${menuId}`);
  return response;
};

export const createMenu = async (menuData) => {
  const response = await apiClient.post("/menus", menuData);
  return response;
};

export const updateMenu = async (menuId, menuData) => {
  const response = await apiClient.put(`/menus/${menuId}`, menuData);
  return response;
};

export const deleteMenu = async (menuId) => {
  const response = await apiClient.delete(`/menus/${menuId}`);
  return response;
};

export const getSubMenusByMenu = async (menuId) => {
  const response = await apiClient.get(`/submenus/menu/${menuId}`);
  return response;
};

export const createSubMenu = async (submenuData) => {
  const response = await apiClient.post("/submenus", submenuData);
  return response;
};

export const updateSubMenu = async (submenuId, submenuData) => {
  const response = await apiClient.put(`/submenus/${submenuId}`, submenuData);
  return response;
};

export const deleteSubMenu = async (submenuId) => {
  const response = await apiClient.delete(`/submenus/${submenuId}`);
  return response;
};

export const getPermissions = async () => {
  const response = await apiClient.get("/permissions");
  return response;
};

export const createPermission = async (permissionData) => {
  const response = await apiClient.post("/permissions", permissionData);
  return response;
};

export const deletePermission = async (permissionId) => {
  const response = await apiClient.delete(`/permissions/${permissionId}`);
  return response;
};

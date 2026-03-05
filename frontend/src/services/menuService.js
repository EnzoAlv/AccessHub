import apiService from "./apiService";

const menuService = {

  async getAllMenus() {
    return apiService.get("/menus");
  },

  async getMenuById(id) {
    return apiService.get(`/menus/${id}`);
  },

  async createMenu(data) {
    return apiService.post("/menus", data);
  },

  async updateMenu(id, data) {
    return apiService.put(`/menus/${id}`, data);
  },

  async deleteMenu(id) {
    return apiService.delete(`/menus/${id}`);
  },

  async getAllSubMenus() {
    return apiService.get("/submenus");
  },

  async getSubMenuById(id) {
    return apiService.get(`/submenus/${id}`);
  },

  async createSubMenu(data) {
    return apiService.post("/submenus", data);
  },

  async updateSubMenu(id, data) {
    return apiService.put(`/submenus/${id}`, data);
  },

  async deleteSubMenu(id) {
    return apiService.delete(`/submenus/${id}`);
  },
};

export default menuService;

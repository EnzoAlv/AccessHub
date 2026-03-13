import api from './apiService';

const subMenuService = {
  getAll: async () => {
    const response = await api.get('/submenus');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/submenus/${id}`);
    return response.data;
  },

  getByMenuId: async (menuId) => {
    const response = await api.get(`/menus/${menuId}/submenus`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/submenus', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/submenus/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/submenus/${id}`);
    return response.data;
  }
};

export default subMenuService;
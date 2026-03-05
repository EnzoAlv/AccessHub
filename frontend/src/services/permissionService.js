import apiService from './apiService';

const permissionService = {
  /**
   * Busca todas as permissions, com filtros opcionais
   * @param {Object} filters 
   */
  async getPermissions(filters = {}) {
    const params = new URLSearchParams();

    if (filters.roleId) params.append('roleId', filters.roleId);
    if (filters.menuId) params.append('menuId', filters.menuId);
    if (filters.subMenuId) params.append('subMenuId', filters.subMenuId);

    const query = params.toString();
    const endpoint = `/permissions${query ? `?${query}` : ''}`;

    return apiService.get(endpoint);
  },

  /**
   * Busca permissions de um role específico
   * @param {number} roleId
   */
  async getPermissionsByRole(roleId) {
    return this.getPermissions({ roleId });
  },

  async createPermission(data) {
    return apiService.post('/permissions', data);
  },

  async updatePermission(id, data) {
    return apiService.put(`/permissions/${id}`, data);
  },


  async deletePermission(id) {
    return apiService.delete(`/permissions/${id}`);
  },
};

export default permissionService;
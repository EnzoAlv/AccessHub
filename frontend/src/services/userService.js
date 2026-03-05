import apiService from "./apiService";

const userService = {

  async getAllUsers() {
    return apiService.get("/users");
  },


  async getUserById(id) {
    return apiService.get(`/users/${id}`);
  },


  async createUser(data) {
    return apiService.post("/users", data);
  },


  async updateUser(id, data) {
    return apiService.put(`/users/${id}`, data);
  },


  async deleteUser(id) {
    return apiService.delete(`/users/${id}`);
  },

};

export default userService;

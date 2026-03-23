import { apiClient } from "#/services/api/apiClient.js";

export const adminApi = {
  async getUsers(params) {
    const { data } = await apiClient.get("/admin/users", { params });
    return data;
  }
};

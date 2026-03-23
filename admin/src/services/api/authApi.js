import { apiClient } from "#/services/api/apiClient.js";

export const authApi = {
  async login(credentials) {
    const { data } = await apiClient.post("/auth/login", credentials);
    return data;
  },
  async refreshSession() {
    const { data } = await apiClient.post("/auth/refresh-token");
    return data;
  },
  async logout() {
    const { data } = await apiClient.delete("/auth/logout");
    return data;
  }
};

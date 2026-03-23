import axios from "axios";

import { authActions } from "#/features/auth/authSlice.js";

const defaultConfig = {
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
};

export const apiClient = axios.create(defaultConfig);

const refreshClient = axios.create(defaultConfig);

let storeReference = null;
let refreshRequest = null;

const isAuthRoute = (url = "") => {
  return ["/auth/login", "/auth/logout", "/auth/refresh-token"].some((route) =>
    url.includes(route)
  );
};

const getAccessToken = () => {
  return storeReference?.getState()?.auth?.accessToken ?? null;
};

const refreshAccessToken = async () => {
  if (!storeReference) {
    throw new Error("Store is not attached to the API client.");
  }

  if (!refreshRequest) {
    refreshRequest = refreshClient
      .post("/auth/refresh-token")
      .then(({ data }) => {
        storeReference.dispatch(
          authActions.refreshSucceeded({
            accessToken: data.accessToken,
            user: data.user
          })
        );

        return data.accessToken;
      })
      .catch((error) => {
        storeReference.dispatch(
          authActions.sessionExpired("Your session expired. Please sign in again.")
        );
        throw error;
      })
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
};

export const attachStore = (store) => {
  storeReference = store;
};

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response?.status;

    if (
      !storeReference ||
      statusCode !== 401 ||
      !originalRequest ||
      originalRequest.__isRetryRequest ||
      isAuthRoute(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest.__isRetryRequest = true;

    try {
      const newAccessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

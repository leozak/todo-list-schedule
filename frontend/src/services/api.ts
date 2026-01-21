import axios from "axios";

import { API_URL } from "./config";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  config.headers["Content-Type"] = "application/json";
  config.headers["Authorization"] = access_token
    ? `Bearer ${access_token}`
    : "";
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Tenta pegar um novo token
        const refreshToken = localStorage.getItem("refresh_token");
        const { data } = await axios.get(`${API_URL}/refresh-token`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
      }
    }
    Promise.reject(error);
  },
);

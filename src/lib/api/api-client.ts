import { AUTH_KEYS } from "@/config/auth";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

// Attach Authorization header
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(AUTH_KEYS.ACCESS);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let queuedRequests: ((token: string) => void)[] = [];

function onAccessTokenFetched(token: string) {
  queuedRequests.forEach((cb) => cb(token));
  queuedRequests = [];
}

api.interceptors.response.use(
  (response) => response.data,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response) {
      return Promise.reject(
        new Error("We couldn't connect to the server. Please try again.")
      );
    }

    const status = error.response.status;
    const isLoginRequest = originalRequest.url?.includes("/auth/login");
    const isRegisterRequest = originalRequest.url?.includes("/auth/register");

    if (status !== 401) {
      const serverMessage = (error.response.data as any)?.message ?? null;

      const safeMessage =
        serverMessage ||
        {
          400: "We couldn't process your request. Please check your information and try again.",
          403: "You don't have permission for this action.",
          404: "Resource not found.",
          405: "Method not allowed.",
          408: "The request took too long. Try again.",
          409: "There was a conflict. Please review your data.",
          413: "The request is too large.",
          429: "Too many requests. Please slow down.",
          500: "Something went wrong on the server.",
          502: "Bad gateway.",
          503: "The service is unavailable at the moment.",
          504: "The server took too long to respond.",
        }[status] ||
        "An unexpected error occurred.";

      return Promise.reject(new Error(safeMessage));
    }

    // ------------------------------------------------------
    // 401 DURING LOGIN → INVALID CREDENTIALS
    // ------------------------------------------------------
    if (isLoginRequest) {
      const serverMessage =
        (error.response.data as any)?.message || "Invalid email or password.";

      error.response.data = { message: serverMessage };
      return new Error("Invalid email or password. Please try again.");
    }

    // ------------------------------------------------------
    // 401 DURING REFRESH → AVOID LOOP
    // ------------------------------------------------------
    if (originalRequest._retry) {
      return Promise.reject(
        new Error("Your session expired. Please log in again.")
      );
    }
    // 400 DURING REGISTER → INVALID CREDENTIALS
    if (isRegisterRequest) {
      const serverMessage = 
        (error.response.data as any)?.message || "Invalid email or password.";
      error.response.data = { message: serverMessage };
      return Promise.reject(new Error("Invalid email or password. Please try again."));
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve) => {
        queuedRequests.push((newToken) => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem(AUTH_KEYS.REFRESH);

      if (!refreshToken) {
        throw new Error("Missing refresh token");
      }

      const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      const newAccessToken = refreshResponse.data.accessToken;
      const newRefreshToken = refreshResponse.data.refreshToken;

      // Save new tokens
      localStorage.setItem(AUTH_KEYS.ACCESS, newAccessToken);
      localStorage.setItem(AUTH_KEYS.REFRESH, newRefreshToken);

      onAccessTokenFetched(newAccessToken);
      isRefreshing = false;

      // Retry original request with new token
      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      return api(originalRequest);
    } catch (err) {
      isRefreshing = false;
      queuedRequests = [];

      // Clear session data
      localStorage.removeItem(AUTH_KEYS.ACCESS);
      localStorage.removeItem(AUTH_KEYS.REFRESH);
      localStorage.removeItem(AUTH_KEYS.USER);

      return Promise.reject(
        new Error("Session expired, please log in again")
      );
    }
  }
);

// Typed client
export const apiClient = {
  get: <T>(url: string): Promise<T> => api.get<T>(url) as Promise<T>,
  post: <T>(url: string, body?: unknown): Promise<T> =>
    api.post<T>(url, body) as Promise<T>,
  put: <T>(url: string, body?: unknown): Promise<T> =>
    api.put<T>(url, body) as Promise<T>,
  delete: <T>(url: string): Promise<T> =>
    api.delete<T>(url) as Promise<T>,
};

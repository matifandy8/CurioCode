import type { AuthResponse } from "@/app/providers/auth.types";
import { AUTH_KEYS } from "@/config/auth";
import { apiClient } from "@/lib/api/api-client";


export const AuthService = {
  async login(email: string, password: string) {
    const res = await apiClient.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    
    return res;
  },

  async register(name: string, email: string, password: string) {
    const res = await apiClient.post<AuthResponse>("/auth/register", {
      name,
      email,
      password,
    });

    return res;
  },

  async getUser() {    
    const res = await apiClient.get<AuthResponse>("/auth/me");
    return res;
  },

  async logout() {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // Ignore errors
    }

  },

  async refreshToken() {
    const refreshToken = localStorage.getItem(AUTH_KEYS.REFRESH);
    const res = await apiClient.post<{ accessToken: string, refreshToken: string, success: boolean }>("/auth/refresh", {
      refreshToken,
    });

    localStorage.setItem(AUTH_KEYS.ACCESS, res.accessToken);

    return res;
  },
};

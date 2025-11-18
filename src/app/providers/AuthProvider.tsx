import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./auth.context";
import { AuthService } from "@/features/auth/services/auth.service";
import { AUTH_KEYS } from "@/config/auth";
import type { User } from "./auth.types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      const storedAccess = localStorage.getItem(AUTH_KEYS.ACCESS);
      const storedRefresh = localStorage.getItem(AUTH_KEYS.REFRESH);

      if (!storedRefresh) {
        logout(false);
        setLoading(false);
        return;
      }

      setRefreshToken(storedRefresh);

      if (!storedAccess) {
        try {
          const res = await AuthService.refreshToken();
          setToken(res.accessToken);
          setRefreshToken(res.refreshToken);
          await loadUser();
        } catch {
          logout(false);
        }
        setLoading(false);
        return;
      }

      try {
        setToken(storedAccess);
        await loadUser();
      } catch {
        try {
          const res = await AuthService.refreshToken();
          setToken(res.accessToken);
          await loadUser();
        } catch {
          logout(false);
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);


  useEffect(() => {
    if (token) localStorage.setItem(AUTH_KEYS.ACCESS, token);
    else localStorage.removeItem(AUTH_KEYS.ACCESS);
  }, [token]);

  useEffect(() => {
    if (refreshToken) localStorage.setItem(AUTH_KEYS.REFRESH, refreshToken);
    else localStorage.removeItem(AUTH_KEYS.REFRESH);
  }, [refreshToken]);


  const loadUser = async () => {
    const res = await AuthService.getUser();
    setUser(res.user);
  };
  

  const login = async (email: string, password: string) => {
    setLoading(true);
    const res = await AuthService.login(email, password);

    if (!res.success) throw new Error(res.message);

    localStorage.setItem(AUTH_KEYS.ACCESS, res.accessToken);
    setToken(res.accessToken);
    setRefreshToken(res.refreshToken);
    await loadUser();

    setLoading(false);
    return res;
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    const res = await AuthService.register(name, email, password);
    if (!res.success) throw new Error(res.message);
    setLoading(false);
    return res;
  };

  const logout = async (callBackend = true) => {
    setLoading(true);

    try {
      if (callBackend) await AuthService.logout();
    } catch {
      // Ignore errors on logout
    }

    setToken(null);
    setRefreshToken(null);
    setUser(null);

    localStorage.removeItem(AUTH_KEYS.ACCESS);
    localStorage.removeItem(AUTH_KEYS.REFRESH);
    localStorage.removeItem(AUTH_KEYS.USER);

    setLoading(false);
  };

  const isAdmin = user?.role === "admin";
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        getUser: loadUser,
        isAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

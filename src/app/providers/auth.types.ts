export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (name: string, email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
  isAdmin: boolean;
  isAuthenticated: boolean;
};


export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

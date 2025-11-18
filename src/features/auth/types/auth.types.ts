export interface User {
  id: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  adminToken?: string;
  userToken?: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export type FormValuesRegister = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

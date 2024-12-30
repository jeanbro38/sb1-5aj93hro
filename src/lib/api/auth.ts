import api from './config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export const login = async (credentials: LoginCredentials) => 
  api.post<AuthResponse>('/auth/login', credentials);

export const register = async (data: RegisterData) =>
  api.post<AuthResponse>('/auth/register', data);

export const me = async () => 
  api.get('/auth/me');
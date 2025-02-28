import { InternalAxiosRequestConfig } from 'axios';

export function authInterceptor(config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}
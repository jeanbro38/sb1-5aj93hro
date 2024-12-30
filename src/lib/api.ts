import axios from 'axios';
import * as adminApi from './api/services/admin';
import * as authApi from './api/services/auth';
import * as gamesApi from './api/services/games';
import * as vpsApi from './api/services/vps';
import * as webApi from './api/services/web';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = authApi;
export const admin = adminApi;
export const games = gamesApi;
export const vps = vpsApi;
export const web = webApi;
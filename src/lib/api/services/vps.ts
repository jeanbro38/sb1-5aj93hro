import api from '../config';
import type { VPSService } from '../types';

interface CreateVPSData {
  specs: {
    cpu: number;
    ram: number;
    storage: number;
  };
}

export async function list() {
  return api.get<VPSService[]>('/vps');
}

export async function create(data: CreateVPSData) {
  return api.post<VPSService>('/vps', data);
}

export async function control(id: string, action: 'start' | 'stop' | 'reboot' | 'reinstall') {
  return api.post(`/vps/${id}/control`, { action });
}

export async function snapshot(id: string) {
  return api.post(`/vps/${id}/snapshot`);
}

export async function getVnc(id: string) {
  return api.get(`/vps/${id}/vnc`);
}
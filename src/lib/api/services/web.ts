import api from '../config';
import type { WebService } from '../types';

interface CreateWebsiteData {
  type: 'cpanel' | 'plesk';
  domain: string;
}

export async function list() {
  return api.get<WebService[]>('/web');
}

export async function create(type: 'cpanel' | 'plesk', domain: string) {
  return api.post<WebService>('/web', { type, domain });
}

export async function getPanelUrl(id: string) {
  return api.get(`/web/${id}/panel`);
}

export async function getStats() {
  return api.get('/web/stats');
}
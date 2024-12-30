import api from '../config';
import type { GameService } from '../types';

interface CreateGameData {
  game: string;
  slots: number;
}

export async function list() {
  return api.get<GameService[]>('/games');
}

export async function create(game: string, slots: number) {
  return api.post<GameService>('/games', { game, slots });
}

export async function control(id: string, action: 'start' | 'stop' | 'reboot') {
  return api.post(`/games/${id}/control`, { action });
}

export async function getPanelUrl(id: string) {
  return api.get(`/games/${id}/info`);
}
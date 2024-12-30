export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface VPSService {
  id: string;
  userId: string;
  status: 'running' | 'stopped' | 'error';
  specs: {
    cpu: number;
    ram: number;
    storage: number;
  };
  ipAddress: string;
  created: Date;
}

export interface GameService {
  id: string;
  userId: string;
  status: 'running' | 'stopped' | 'error';
  game: string;
  slots: number;
  created: Date;
}

export interface WebService {
  id: string;
  userId: string;
  type: 'cpanel' | 'plesk';
  domain: string;
  storage: {
    used: number;
    total: number;
  };
  bandwidth: {
    used: number;
    total: number;
  };
  created: Date;
}
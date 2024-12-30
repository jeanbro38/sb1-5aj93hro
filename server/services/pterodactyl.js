import axios from 'axios';

class PterodactylService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.PTERODACTYL_API_URL,
      headers: {
        'Authorization': `Bearer ${process.env.PTERODACTYL_API_KEY}`,
      },
    });
  }

  async createServer(options) {
    try {
      const response = await this.api.post('/api/application/servers', {
        ...options,
        // Add Pterodactyl-specific parameters
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create game server: ${error.message}`);
    }
  }

  async controlServer(serverId, action) {
    try {
      const response = await this.api.post(`/api/client/servers/${serverId}/power`, {
        signal: action,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to control game server: ${error.message}`);
    }
  }

  async getServerInfo(serverId) {
    try {
      const response = await this.api.get(`/api/client/servers/${serverId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get server info: ${error.message}`);
    }
  }
}

export default new PterodactylService();
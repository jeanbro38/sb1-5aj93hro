import axios from 'axios';

class PleskService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.PLESK_API_URL,
      headers: {
        'X-API-Key': process.env.PLESK_API_KEY,
      },
    });
  }

  async createWebsite(options) {
    try {
      const response = await this.api.post('/domains', {
        ...options,
        // Add Plesk-specific parameters
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create website: ${error.message}`);
    }
  }

  async getStats(domainId) {
    try {
      const response = await this.api.get(`/domains/${domainId}/statistics`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get website statistics: ${error.message}`);
    }
  }
}

export default new PleskService();
import axios from 'axios';

class ProxmoxService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.PROXMOX_API_URL,
      headers: {
        'Authorization': `Bearer ${process.env.PROXMOX_API_TOKEN}`,
      },
    });
  }

  async createVM(specs) {
    try {
      const response = await this.api.post('/nodes/proxmox/qemu', {
        ...specs,
        // Add Proxmox-specific parameters
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create VM: ${error.message}`);
    }
  }

  async controlVM(vmid, action) {
    try {
      const response = await this.api.post(`/nodes/proxmox/qemu/${vmid}/status/${action}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to control VM: ${error.message}`);
    }
  }

  async createSnapshot(vmid, name) {
    try {
      const response = await this.api.post(`/nodes/proxmox/qemu/${vmid}/snapshot`, {
        name,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create snapshot: ${error.message}`);
    }
  }

  async getVNCProxy(vmid) {
    try {
      const response = await this.api.post(`/nodes/proxmox/qemu/${vmid}/vncproxy`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get VNC proxy: ${error.message}`);
    }
  }
}

export default new ProxmoxService();
import ProxmoxService from '../services/proxmox.js';

export const listVPS = async (req, res) => {
  try {
    const servers = await ProxmoxService.listVMs(req.user.id);
    res.json(servers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createVPS = async (req, res) => {
  try {
    const { specs } = req.body;
    const server = await ProxmoxService.createVM(specs);
    res.status(201).json(server);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const controlVPS = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    await ProxmoxService.controlVM(id, action);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSnapshot = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await ProxmoxService.createSnapshot(id, name);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVNCProxy = async (req, res) => {
  try {
    const { id } = req.params;
    const proxy = await ProxmoxService.getVNCProxy(id);
    res.json(proxy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
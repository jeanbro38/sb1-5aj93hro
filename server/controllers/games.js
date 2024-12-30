import PterodactylService from '../services/pterodactyl.js';

export const listServers = async (req, res) => {
  try {
    const servers = await PterodactylService.listServers(req.user.id);
    res.json(servers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createServer = async (req, res) => {
  try {
    const { game, slots } = req.body;
    const server = await PterodactylService.createServer({ game, slots });
    res.status(201).json(server);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const controlServer = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    await PterodactylService.controlServer(id, action);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getServerInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const info = await PterodactylService.getServerInfo(id);
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
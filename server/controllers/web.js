import PleskService from '../services/plesk.js';

export const listWebsites = async (req, res) => {
  try {
    const websites = await PleskService.listWebsites(req.user.id);
    res.json(websites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createWebsite = async (req, res) => {
  try {
    const { domain, type } = req.body;
    const website = await PleskService.createWebsite({ domain, type });
    res.status(201).json(website);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const { id } = req.params;
    const stats = await PleskService.getStats(id);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
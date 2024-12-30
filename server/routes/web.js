import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  listWebsites,
  createWebsite,
  getStats,
} from '../controllers/web.js';

const router = express.Router();

router.use(auth);

router.get('/', listWebsites);
router.post('/', createWebsite);
router.get('/:id/stats', getStats);

export default router;
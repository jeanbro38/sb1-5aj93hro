import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  listServers,
  createServer,
  controlServer,
  getServerInfo,
} from '../controllers/games.js';

const router = express.Router();

router.use(auth);

router.get('/', listServers);
router.post('/', createServer);
router.post('/:id/control', controlServer);
router.get('/:id/info', getServerInfo);

export default router;
import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  listVPS,
  createVPS,
  controlVPS,
  createSnapshot,
  getVNCProxy,
} from '../controllers/vps.js';

const router = express.Router();

router.use(auth);

router.get('/', listVPS);
router.post('/', createVPS);
router.post('/:id/control', controlVPS);
router.post('/:id/snapshot', createSnapshot);
router.get('/:id/vnc', getVNCProxy);

export default router;
import authRoutes from './auth.js';
import vpsRoutes from './vps.js';
import gamesRoutes from './games.js';
import webRoutes from './web.js';
import billingRoutes from './billing.js';

export default function setupRoutes(app) {
  app.use('/api/auth', authRoutes);
  app.use('/api/vps', vpsRoutes);
  app.use('/api/games', gamesRoutes);
  app.use('/api/web', webRoutes);
  app.use('/api/billing', billingRoutes);
}
import { Router } from 'express';

import { getDashboardStats } from '../controllers/dashboard.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/stats', requireAdmin, getDashboardStats);

export default router;
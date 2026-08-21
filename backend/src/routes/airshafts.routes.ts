import { Router } from 'express';

import {
  createAirShaft,
  deleteAirShaft,
  getAirShafts,
  updateAirShaft
} from '../controllers/airshafts.controller.js';

import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Public
router.get('/', getAirShafts);

// Admin only
router.post('/', requireAdmin, createAirShaft);

router.patch(
  '/:id',
  requireAdmin,
  updateAirShaft
);

router.delete(
  '/:id',
  requireAdmin,
  deleteAirShaft
);

export default router;
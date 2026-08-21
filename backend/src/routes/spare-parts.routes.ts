import { Router } from 'express';

import {
  createSparePart,
  deleteSparePart,
  getSpareParts,
  updateSparePart
} from '../controllers/spare-parts.controller.js';

import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

/*
 * Public
 */
router.get('/', getSpareParts);

/*
 * Admin
 */
router.post(
  '/',
  requireAdmin,
  createSparePart
);

router.patch(
  '/:id',
  requireAdmin,
  updateSparePart
);

router.delete(
  '/:id',
  requireAdmin,
  deleteSparePart
);

export default router;
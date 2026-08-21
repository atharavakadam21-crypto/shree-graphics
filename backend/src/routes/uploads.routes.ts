import { Router } from 'express';
import multer from 'multer';

import {
  uploadMachineImages,
  uploadAirShaftImages
} from '../controllers/uploads.controller.js';

import {
  requireAdmin
} from '../middleware/auth.middleware.js';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 10
  }
});

router.post(
  '/machine-images',
  requireAdmin,
  upload.array('images', 10),
  uploadMachineImages
);

router.post(
  '/airshaft-images',
  requireAdmin,
  upload.array('images', 10),
  uploadAirShaftImages
);

export default router;
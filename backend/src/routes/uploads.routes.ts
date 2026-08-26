import { Router } from 'express';
import multer from 'multer';
import { uploadMachineImages, uploadAirShaftImages, uploadGalleryMedia } from '../controllers/uploads.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 100 * 1024 * 1024, files: 10 } });
router.post('/machine-images', requireAdmin, upload.array('images', 10), uploadMachineImages);
router.post('/airshaft-images', requireAdmin, upload.array('images', 10), uploadAirShaftImages);
router.post('/gallery-media', requireAdmin, upload.array('media', 10), uploadGalleryMedia);
export default router;
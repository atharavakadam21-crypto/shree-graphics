import { Router } from 'express';
import { createGalleryItem, deleteGalleryItem, getGalleryItems, updateGalleryItem } from '../controllers/gallery.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/', getGalleryItems);
router.post('/', requireAdmin, createGalleryItem);
router.patch('/:id', requireAdmin, updateGalleryItem);
router.delete('/:id', requireAdmin, deleteGalleryItem);
export default router;
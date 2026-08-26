import { Router } from 'express';
import { createGalleryEvent, createGalleryItem, deleteGalleryEvent, deleteGalleryItem, getGalleryEvents, getGalleryItems, updateGalleryEvent, updateGalleryItem } from '../controllers/gallery.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/events', getGalleryEvents);
router.post('/events', requireAdmin, createGalleryEvent);
router.patch('/events/:id', requireAdmin, updateGalleryEvent);
router.delete('/events/:id', requireAdmin, deleteGalleryEvent);
router.get('/', getGalleryItems);
router.post('/', requireAdmin, createGalleryItem);
router.patch('/:id', requireAdmin, updateGalleryItem);
router.delete('/:id', requireAdmin, deleteGalleryItem);
export default router;
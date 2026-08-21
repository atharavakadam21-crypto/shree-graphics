import { Router } from 'express';
import rateLimit from 'express-rate-limit';

import {
  createInquiry,
  getInquiries
} from '../controllers/inquiries.controller.js';

import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

const inquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many inquiry submissions. Please try again later.'
  }
});

router.post('/', inquiryRateLimiter, createInquiry);

router.get('/', requireAdmin, getInquiries);

export default router;
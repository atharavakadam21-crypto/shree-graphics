import { Router } from 'express';
import rateLimit from 'express-rate-limit';

import {
  getCurrentAdmin,
  login,
  logout
} from '../controllers/auth.controller.js';

const router = Router();

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.'
  }
});

router.post('/login', loginRateLimiter, login);

router.post('/logout', logout);

router.get('/me', getCurrentAdmin);

export default router;
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import sparePartsRoutes from './routes/spare-parts.routes.js';
import authRoutes from './routes/auth.routes.js';
import machinesRoutes from './routes/machines.routes.js';
import inquiriesRoutes from './routes/inquiries.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import uploadsRoutes from './routes/uploads.routes.js';
import airshaftsRoutes from './routes/airshafts.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const app: Express = express();
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
app.use(helmet());
app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Backend is running' });
});
app.use('/api/auth', authRoutes);
app.use('/api/machines', machinesRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/spare-parts', sparePartsRoutes);
app.use('/api/airshafts', airshaftsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});
app.use(errorMiddleware);
export default app;
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, {
  Express,
  Request,
  Response
} from 'express';
import helmet from 'helmet';
import sparePartsRoutes from './routes/spare-parts.routes.js';
import authRoutes from './routes/auth.routes.js';
import machinesRoutes from './routes/machines.routes.js';
import inquiriesRoutes from './routes/inquiries.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import uploadsRoutes from './routes/uploads.routes.js';
import airshaftsRoutes from './routes/airshafts.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const app: Express = express();

const frontendUrl =
  process.env.FRONTEND_URL ??
  'http://localhost:3000';

/*
|--------------------------------------------------------------------------
| Security
|--------------------------------------------------------------------------
*/

app.use(helmet());

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin: frontendUrl,
    credentials: true
  })
);

/*
|--------------------------------------------------------------------------
| Body Parsing
|--------------------------------------------------------------------------
*/

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get(
  '/api/health',
  (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Backend is running'
    });
  }
);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/machines',
  machinesRoutes
);

app.use(
  '/api/inquiries',
  inquiriesRoutes
);

app.use(
  '/api/dashboard',
  dashboardRoutes
);

app.use(
  '/api/uploads',
  uploadsRoutes
);

app.use(
  '/api/spare-parts',
  sparePartsRoutes
);
app.use('/api/airshafts', airshaftsRoutes);
/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use(
  (_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  }
);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

export default app;
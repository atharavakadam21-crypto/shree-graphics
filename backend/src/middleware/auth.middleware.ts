import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { AuthenticatedAdmin } from '../types/index.js';

declare global {
  namespace Express {
    interface Request {
      admin?: AuthenticatedAdmin;
    }
  }
}

const getJwtSecret = (): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwtSecret;
};

const isAuthenticatedAdmin = (
  payload: string | JwtPayload
): payload is JwtPayload & AuthenticatedAdmin => {
  if (typeof payload === 'string') {
    return false;
  }

  return (
    typeof payload.adminId === 'string' &&
    typeof payload.email === 'string' &&
    payload.role === 'admin'
  );
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies?.admin_token as string | undefined;

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });

      return;
    }

    let decoded: string | JwtPayload;

    try {
      decoded = jwt.verify(token, getJwtSecret());
    } catch {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired authentication token'
      });

      return;
    }

    if (!isAuthenticatedAdmin(decoded)) {
      res.status(403).json({
        success: false,
        message: 'Admin access required'
      });

      return;
    }

    req.admin = {
      adminId: decoded.adminId,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
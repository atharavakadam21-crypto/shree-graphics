import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { supabase } from '../config/supabase.js';

interface AdminRecord {
  id: string;
  email: string;
  password_hash: string;
  role: 'admin';
  is_active: boolean;
}

interface LoginRequestBody {
  email?: string;
  password?: string;
}

interface JwtPayload {
  adminId: string;
  email: string;
  role: 'admin';
}

const getJwtSecret = (): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwtSecret;
};

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ('none' as const) : ('lax' as const),
  path: '/'
};

export const login = async (
  req: Request<unknown, unknown, LoginRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });

      return;
    }

    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, password_hash, role, is_active')
      .eq('email', email)
      .eq('is_active', true)
      .maybeSingle<AdminRecord>();

    if (error) {
      console.error('Admin lookup failed:', error);

      res.status(500).json({
        success: false,
        message: 'Unable to process login'
      });

      return;
    }

    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });

      return;
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.password_hash
    );

    if (!passwordMatches) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });

      return;
    }

    if (admin.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Admin access required'
      });

      return;
    }

    const payload: JwtPayload = {
      adminId: admin.id,
      email: admin.email,
      role: admin.role
    };

    const token = jwt.sign(payload, getJwtSecret(), {
      expiresIn: '1d'
    });

    res.cookie('admin_token', token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const logout = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    res.clearCookie('admin_token', cookieOptions);

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getCurrentAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.cookies?.admin_token as string | undefined;

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });

      return;
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(
        token,
        getJwtSecret()
      ) as JwtPayload;
    } catch {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired authentication'
      });

      return;
    }

    if (
      !decoded.adminId ||
      !decoded.email ||
      decoded.role !== 'admin'
    ) {
      res.status(401).json({
        success: false,
        message: 'Invalid authentication'
      });

      return;
    }

    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, role, is_active')
      .eq('id', decoded.adminId)
      .eq('email', decoded.email)
      .maybeSingle();

    if (error) {
      console.error('Current admin lookup failed:', error);

      res.status(500).json({
        success: false,
        message: 'Unable to verify authentication'
      });

      return;
    }

    if (!admin || !admin.is_active || admin.role !== 'admin') {
      res.status(401).json({
        success: false,
        message: 'Admin account is inactive or unavailable'
      });

      return;
    }

    res.status(200).json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Get current admin error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
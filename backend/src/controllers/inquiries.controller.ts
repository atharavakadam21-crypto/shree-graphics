import { Request, Response } from 'express';
import { z } from 'zod';

import { supabase } from '../config/supabase.js';

const createInquirySchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('A valid email is required'),
  phone: z.string().trim().nullable().optional(),
  company: z.string().trim().nullable().optional(),
  message: z.string().trim().min(1, 'Message is required'),
  machine_id: z.string().uuid('machine_id must be a valid UUID').nullable().optional()
}).strict();

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  machine_id: string | null;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
  updated_at: string;
}

const inquiryFields = `
  id,
  name,
  email,
  phone,
  company,
  message,
  machine_id,
  status,
  created_at,
  updated_at
`;

const formatValidationErrors = (
  error: z.ZodError
): Array<{
  field: string;
  message: string;
}> => {
  return error.issues.map((issue) => ({
    field: issue.path.join('.') || 'body',
    message: issue.message
  }));
};

export const createInquiry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validation = createInquirySchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid inquiry payload',
        errors: formatValidationErrors(validation.error)
      });

      return;
    }

    const inquiry = validation.data;

    const machineId = inquiry.machine_id ?? null;

    if (machineId !== null) {
      const { data: machine, error: machineError } = await supabase
        .from('machines')
        .select('id')
        .eq('id', machineId)
        .maybeSingle();

      if (machineError) {
        console.error(
          'Failed to verify machine:',
          machineError
        );

        res.status(500).json({
          success: false,
          message: 'Failed to process inquiry'
        });

        return;
      }

      if (!machine) {
        res.status(400).json({
          success: false,
          message: 'The selected machine does not exist'
        });

        return;
      }
    }

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        name: inquiry.name,
        email: inquiry.email.toLowerCase(),
        phone: inquiry.phone ?? null,
        company: inquiry.company ?? null,
        message: inquiry.message,
        machine_id: machineId
      })
      .select(inquiryFields)
      .single();

    if (error) {
      console.error('Failed to create inquiry:', error);

      res.status(500).json({
        success: false,
        message: 'Failed to submit inquiry'
      });

      return;
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: data as Inquiry
    });
  } catch (error) {
    console.error('Create inquiry error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getInquiries = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select(inquiryFields)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch inquiries:', error);

      res.status(500).json({
        success: false,
        message: 'Failed to fetch inquiries'
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: data as Inquiry[]
    });
  } catch (error) {
    console.error('Get inquiries error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
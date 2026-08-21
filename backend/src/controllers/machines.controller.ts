import { Request, Response } from 'express';
import { z } from 'zod';

import { supabase } from '../config/supabase.js';

const machineBaseSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  slug: z.string().trim().min(1, 'Slug is required'),
  short_description: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  specifications: z
    .record(z.string(), z.unknown())
    .optional()
    .default({}),
  images: z
    .array(z.string())
    .optional()
    .default([]),
  featured: z.boolean().optional().default(false),
  is_active: z.boolean().optional().default(true)
}).strict();

const createMachineSchema = machineBaseSchema;

const updateMachineSchema = machineBaseSchema.partial();

interface Machine {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  specifications: Record<string, unknown>;
  images: string[];
  featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const machineFields = `
  id,
  name,
  slug,
  short_description,
  description,
  specifications,
  images,
  featured,
  is_active,
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

export const getMachines = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('machines')
      .select(machineFields)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch machines:', error);

      res.status(500).json({
        success: false,
        message: 'Failed to fetch machines'
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: data as Machine[]
    });
  } catch (error) {
    console.error('Get machines error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createMachine = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validation = createMachineSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid machine payload',
        errors: formatValidationErrors(validation.error)
      });

      return;
    }

    const machine = validation.data;

    const { data: existingMachine, error: existingMachineError } =
      await supabase
        .from('machines')
        .select('id')
        .eq('slug', machine.slug)
        .maybeSingle();

    if (existingMachineError) {
      console.error(
        'Failed to check machine slug:',
        existingMachineError
      );

      res.status(500).json({
        success: false,
        message: 'Failed to create machine'
      });

      return;
    }

    if (existingMachine) {
      res.status(409).json({
        success: false,
        message: 'A machine with this slug already exists'
      });

      return;
    }

    const { data, error } = await supabase
      .from('machines')
      .insert({
        name: machine.name,
        slug: machine.slug,
        short_description: machine.short_description ?? null,
        description: machine.description ?? null,
        specifications: machine.specifications,
        images: machine.images,
        featured: machine.featured,
        is_active: machine.is_active
      })
      .select(machineFields)
      .single();

    if (error) {
      console.error('Failed to create machine:', error);

      res.status(500).json({
        success: false,
        message: 'Failed to create machine'
      });

      return;
    }

    res.status(201).json({
      success: true,
      message: 'Machine created successfully',
      data: data as Machine
    });
  } catch (error) {
    console.error('Create machine error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateMachine = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Machine ID is required'
      });

      return;
    }

    const validation = updateMachineSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid machine payload',
        errors: formatValidationErrors(validation.error)
      });

      return;
    }

    const updates = validation.data;

    if (Object.keys(updates).length === 0) {
      res.status(400).json({
        success: false,
        message: 'No fields provided for update'
      });

      return;
    }

    if (updates.slug !== undefined) {
      const { data: existingMachine, error: slugError } = await supabase
        .from('machines')
        .select('id')
        .eq('slug', updates.slug)
        .neq('id', id)
        .maybeSingle();

      if (slugError) {
        console.error('Failed to check machine slug:', slugError);

        res.status(500).json({
          success: false,
          message: 'Failed to update machine'
        });

        return;
      }

      if (existingMachine) {
        res.status(409).json({
          success: false,
          message: 'A machine with this slug already exists'
        });

        return;
      }
    }

    const { data, error } = await supabase
      .from('machines')
      .update(updates)
      .eq('id', id)
      .select(machineFields)
      .maybeSingle();

    if (error) {
      console.error('Failed to update machine:', error);

      res.status(500).json({
        success: false,
        message: 'Failed to update machine'
      });

      return;
    }

    if (!data) {
      res.status(404).json({
        success: false,
        message: 'Machine not found'
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: 'Machine updated successfully',
      data: data as Machine
    });
  } catch (error) {
    console.error('Update machine error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteMachine = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Machine ID is required'
      });

      return;
    }

    const { data, error } = await supabase
      .from('machines')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      console.error('Failed to delete machine:', error);

      res.status(500).json({
        success: false,
        message: 'Failed to delete machine'
      });

      return;
    }

    if (!data) {
      res.status(404).json({
        success: false,
        message: 'Machine not found'
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: 'Machine deleted successfully'
    });
  } catch (error) {
    console.error('Delete machine error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
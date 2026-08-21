import { Request, Response } from 'express';
import { z } from 'zod';

import { supabase } from '../config/supabase.js';

const sparePartBaseSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),

  slug: z.string().trim().min(1, 'Slug is required'),

  short_description: z
    .string()
    .trim()
    .nullable()
    .optional(),

  description: z
    .string()
    .trim()
    .nullable()
    .optional(),

  category: z
    .string()
    .trim()
    .nullable()
    .optional(),

  machine_compatibility: z
    .array(z.string())
    .optional()
    .default([]),

  specifications: z
    .record(z.string(), z.unknown())
    .optional()
    .default({}),

  images: z
    .array(z.string())
    .optional()
    .default([]),

  featured: z
    .boolean()
    .optional()
    .default(false),

  is_active: z
    .boolean()
    .optional()
    .default(true)
}).strict();

const createSparePartSchema =
  sparePartBaseSchema;

const updateSparePartSchema =
  sparePartBaseSchema.partial();

interface SparePart {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  category: string | null;
  machine_compatibility: string[];
  specifications: Record<string, unknown>;
  images: string[];
  featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const sparePartFields = `
  id,
  name,
  slug,
  short_description,
  description,
  category,
  machine_compatibility,
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

/*
|--------------------------------------------------------------------------
| GET /api/spare-parts
|--------------------------------------------------------------------------
*/

export const getSpareParts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('spare_parts')
      .select(sparePartFields)
      .eq('is_active', true)
      .order('created_at', {
        ascending: false
      });

    if (error) {
      console.error(
        'Failed to fetch spare parts:',
        error
      );

      res.status(500).json({
        success: false,
        message: 'Failed to fetch spare parts'
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: data as SparePart[]
    });
  } catch (error) {
    console.error(
      'Get spare parts error:',
      error
    );

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/*
|--------------------------------------------------------------------------
| POST /api/spare-parts
|--------------------------------------------------------------------------
*/

export const createSparePart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validation =
      createSparePartSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid spare part payload',
        errors: formatValidationErrors(
          validation.error
        )
      });

      return;
    }

    const sparePart = validation.data;

    const {
      data: existingSparePart,
      error: existingSparePartError
    } = await supabase
      .from('spare_parts')
      .select('id')
      .eq('slug', sparePart.slug)
      .maybeSingle();

    if (existingSparePartError) {
      console.error(
        'Failed to check spare part slug:',
        existingSparePartError
      );

      res.status(500).json({
        success: false,
        message: 'Failed to create spare part'
      });

      return;
    }

    if (existingSparePart) {
      res.status(409).json({
        success: false,
        message:
          'A spare part with this slug already exists'
      });

      return;
    }

    const { data, error } = await supabase
      .from('spare_parts')
      .insert({
        name: sparePart.name,
        slug: sparePart.slug,
        short_description:
          sparePart.short_description ?? null,
        description:
          sparePart.description ?? null,
        category:
          sparePart.category ?? null,
        machine_compatibility:
          sparePart.machine_compatibility,
        specifications:
          sparePart.specifications,
        images: sparePart.images,
        featured: sparePart.featured,
        is_active: sparePart.is_active
      })
      .select(sparePartFields)
      .single();

    if (error) {
      console.error(
        'Failed to create spare part:',
        error
      );

      res.status(500).json({
        success: false,
        message: 'Failed to create spare part'
      });

      return;
    }

    res.status(201).json({
      success: true,
      message: 'Spare part created successfully',
      data: data as SparePart
    });
  } catch (error) {
    console.error(
      'Create spare part error:',
      error
    );

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/*
|--------------------------------------------------------------------------
| PATCH /api/spare-parts/:id
|--------------------------------------------------------------------------
*/

export const updateSparePart = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Spare part ID is required'
      });

      return;
    }

    const validation =
      updateSparePartSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid spare part payload',
        errors: formatValidationErrors(
          validation.error
        )
      });

      return;
    }

    const updates = validation.data;

    if (Object.keys(updates).length === 0) {
      res.status(400).json({
        success: false,
        message:
          'No fields provided for update'
      });

      return;
    }

    if (updates.slug !== undefined) {
      const {
        data: existingSparePart,
        error: slugError
      } = await supabase
        .from('spare_parts')
        .select('id')
        .eq('slug', updates.slug)
        .neq('id', id)
        .maybeSingle();

      if (slugError) {
        console.error(
          'Failed to check spare part slug:',
          slugError
        );

        res.status(500).json({
          success: false,
          message: 'Failed to update spare part'
        });

        return;
      }

      if (existingSparePart) {
        res.status(409).json({
          success: false,
          message:
            'A spare part with this slug already exists'
        });

        return;
      }
    }

    const { data, error } = await supabase
      .from('spare_parts')
      .update(updates)
      .eq('id', id)
      .select(sparePartFields)
      .maybeSingle();

    if (error) {
      console.error(
        'Failed to update spare part:',
        error
      );

      res.status(500).json({
        success: false,
        message: 'Failed to update spare part'
      });

      return;
    }

    if (!data) {
      res.status(404).json({
        success: false,
        message: 'Spare part not found'
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: 'Spare part updated successfully',
      data: data as SparePart
    });
  } catch (error) {
    console.error(
      'Update spare part error:',
      error
    );

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE /api/spare-parts/:id
|--------------------------------------------------------------------------
*/

export const deleteSparePart = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Spare part ID is required'
      });

      return;
    }

    const { data, error } = await supabase
      .from('spare_parts')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      console.error(
        'Failed to delete spare part:',
        error
      );

      res.status(500).json({
        success: false,
        message: 'Failed to delete spare part'
      });

      return;
    }

    if (!data) {
      res.status(404).json({
        success: false,
        message: 'Spare part not found'
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: 'Spare part deleted successfully'
    });
  } catch (error) {
    console.error(
      'Delete spare part error:',
      error
    );

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
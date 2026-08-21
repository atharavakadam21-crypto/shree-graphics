import { Request, Response } from 'express';
import { z } from 'zod';

import { supabase } from '../config/supabase.js';

const airShaftBaseSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  slug: z.string().trim().min(1, 'Slug is required'),

  type: z.string().trim().nullable().optional(),

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

const createAirShaftSchema = airShaftBaseSchema;

const updateAirShaftSchema =
  airShaftBaseSchema.partial();

interface AirShaft {
  id: string;
  name: string;
  slug: string;
  type: string | null;
  short_description: string | null;
  description: string | null;
  specifications: Record<string, unknown>;
  images: string[];
  featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const airShaftFields = `
  id,
  name,
  slug,
  type,
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

/**
 * GET /api/airshafts
 *
 * Public endpoint.
 * Returns active air shafts only.
 */
export const getAirShafts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('airshafts')
      .select(airShaftFields)
      .eq('is_active', true)
      .order('created_at', {
        ascending: false
      });

    if (error) {
      console.error(
        'Failed to fetch air shafts:',
        error
      );

      res.status(500).json({
        success: false,
        message: 'Failed to fetch air shafts'
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: data as AirShaft[]
    });
  } catch (error) {
    console.error(
      'Get air shafts error:',
      error
    );

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * POST /api/airshafts
 *
 * Admin only.
 */
export const createAirShaft = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validation =
      createAirShaftSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid air shaft payload',
        errors: formatValidationErrors(
          validation.error
        )
      });

      return;
    }

    const airShaft = validation.data;

    // Check duplicate slug
    const {
      data: existingAirShaft,
      error: existingAirShaftError
    } = await supabase
      .from('airshafts')
      .select('id')
      .eq('slug', airShaft.slug)
      .maybeSingle();

    if (existingAirShaftError) {
      console.error(
        'Failed to check air shaft slug:',
        existingAirShaftError
      );

      res.status(500).json({
        success: false,
        message: 'Failed to create air shaft'
      });

      return;
    }

    if (existingAirShaft) {
      res.status(409).json({
        success: false,
        message:
          'An air shaft with this slug already exists'
      });

      return;
    }

    const { data, error } = await supabase
      .from('airshafts')
      .insert({
        name: airShaft.name,
        slug: airShaft.slug,
        type: airShaft.type ?? null,
        short_description:
          airShaft.short_description ?? null,
        description:
          airShaft.description ?? null,
        specifications:
          airShaft.specifications,
        images: airShaft.images,
        featured: airShaft.featured,
        is_active: airShaft.is_active
      })
      .select(airShaftFields)
      .single();

    if (error) {
      console.error(
        'Failed to create air shaft:',
        error
      );

      res.status(500).json({
        success: false,
        message: 'Failed to create air shaft'
      });

      return;
    }

    res.status(201).json({
      success: true,
      message: 'Air shaft created successfully',
      data: data as AirShaft
    });
  } catch (error) {
    console.error(
      'Create air shaft error:',
      error
    );

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * PATCH /api/airshafts/:id
 *
 * Admin only.
 */
export const updateAirShaft = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Air shaft ID is required'
      });

      return;
    }

    const validation =
      updateAirShaftSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid air shaft payload',
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

    // Check duplicate slug when slug changes
    if (updates.slug !== undefined) {
      const {
        data: existingAirShaft,
        error: slugError
      } = await supabase
        .from('airshafts')
        .select('id')
        .eq('slug', updates.slug)
        .neq('id', id)
        .maybeSingle();

      if (slugError) {
        console.error(
          'Failed to check air shaft slug:',
          slugError
        );

        res.status(500).json({
          success: false,
          message: 'Failed to update air shaft'
        });

        return;
      }

      if (existingAirShaft) {
        res.status(409).json({
          success: false,
          message:
            'An air shaft with this slug already exists'
        });

        return;
      }
    }

    const { data, error } = await supabase
      .from('airshafts')
      .update(updates)
      .eq('id', id)
      .select(airShaftFields)
      .maybeSingle();

    if (error) {
      console.error(
        'Failed to update air shaft:',
        error
      );

      res.status(500).json({
        success: false,
        message: 'Failed to update air shaft'
      });

      return;
    }

    if (!data) {
      res.status(404).json({
        success: false,
        message: 'Air shaft not found'
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: 'Air shaft updated successfully',
      data: data as AirShaft
    });
  } catch (error) {
    console.error(
      'Update air shaft error:',
      error
    );

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * DELETE /api/airshafts/:id
 *
 * Admin only.
 */
export const deleteAirShaft = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Air shaft ID is required'
      });

      return;
    }

    const { data, error } = await supabase
      .from('airshafts')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      console.error(
        'Failed to delete air shaft:',
        error
      );

      res.status(500).json({
        success: false,
        message: 'Failed to delete air shaft'
      });

      return;
    }

    if (!data) {
      res.status(404).json({
        success: false,
        message: 'Air shaft not found'
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: 'Air shaft deleted successfully'
    });
  } catch (error) {
    console.error(
      'Delete air shaft error:',
      error
    );

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
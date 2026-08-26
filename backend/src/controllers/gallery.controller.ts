import { Request, Response } from 'express';
import { z } from 'zod';
import { supabase } from '../config/supabase.js';

const categorySchema = z.enum(['machine', 'airshaft', 'spare_part', 'exhibition']);
const mediaTypeSchema = z.enum(['image', 'video']);

const eventSchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().min(1).max(140),
  description: z.string().trim().max(500).nullable().optional(),
  cover_url: z.string().url().nullable().optional(),
  sort_order: z.number().int().nonnegative().optional().default(0),
  is_active: z.boolean().optional().default(true),
}).strict();

const eventUpdateSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  slug: z.string().trim().min(1).max(140).optional(),
  description: z.string().trim().max(500).nullable().optional(),
  cover_url: z.string().url().nullable().optional(),
  sort_order: z.number().int().nonnegative().optional(),
  is_active: z.boolean().optional(),
}).strict();

const createSchema = z.object({
  category: categorySchema,
  event_id: z.string().uuid().nullable().optional(),
  media_type: mediaTypeSchema,
  media_url: z.string().url(),
  thumbnail_url: z.string().url().nullable().optional(),
  title: z.string().trim().max(160).nullable().optional(),
  sort_order: z.number().int().nonnegative().optional().default(0),
  is_active: z.boolean().optional().default(true),
}).strict().superRefine((value, ctx) => {
  if (value.category === 'exhibition' && !value.event_id) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Exhibition media requires an event',
      path: ['event_id'],
    });
  }
});

// Keep update validation separate: Zod v4 does not allow .partial() on schemas
// containing object-level refinements such as createSchema.superRefine().
const updateSchema = z.object({
  category: categorySchema.optional(),
  event_id: z.string().uuid().nullable().optional(),
  media_type: mediaTypeSchema.optional(),
  media_url: z.string().url().optional(),
  thumbnail_url: z.string().url().nullable().optional(),
  title: z.string().trim().max(160).nullable().optional(),
  sort_order: z.number().int().nonnegative().optional(),
  is_active: z.boolean().optional(),
}).strict();

const itemFields = 'id, category, event_id, media_type, media_url, thumbnail_url, title, sort_order, is_active, created_at, updated_at';
const eventFields = 'id, name, slug, description, cover_url, sort_order, is_active, created_at, updated_at';

export const getGalleryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const eventId = typeof req.query.event_id === 'string' ? req.query.event_id : undefined;
    const admin = req.query.admin === 'true';

    if (category && !categorySchema.safeParse(category).success) {
      res.status(400).json({ success: false, message: 'Invalid gallery category' });
      return;
    }

    let query = supabase
      .from('gallery_items')
      .select(itemFields)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (!admin) query = query.eq('is_active', true);
    if (category) query = query.eq('category', category);
    if (eventId) query = query.eq('event_id', eventId);

    const { data, error } = await query;
    if (error) throw error;
    res.status(200).json({ success: true, data: data ?? [] });
  } catch (error) {
    console.error('Get gallery items error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch gallery items' });
  }
};

export const createGalleryItem = async (req: Request, res: Response): Promise<void> => {
  const validation = createSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ success: false, message: 'Invalid gallery item', errors: validation.error.issues });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .insert(validation.data)
      .select(itemFields)
      .single();
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(500).json({ success: false, message: 'Failed to create gallery item' });
  }
};

export const updateGalleryItem = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const validation = updateSchema.safeParse(req.body);
  if (!validation.success || Object.keys(validation.data ?? {}).length === 0) {
    res.status(400).json({ success: false, message: 'Invalid gallery update' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .update(validation.data)
      .eq('id', req.params.id)
      .select(itemFields)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      res.status(404).json({ success: false, message: 'Gallery item not found' });
      return;
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(500).json({ success: false, message: 'Failed to update gallery item' });
  }
};

export const deleteGalleryItem = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', req.params.id)
      .select('id')
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      res.status(404).json({ success: false, message: 'Gallery item not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete gallery item' });
  }
};

export const getGalleryEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = req.query.admin === 'true';
    let query = supabase
      .from('gallery_events')
      .select(eventFields)
      .order('sort_order')
      .order('created_at', { ascending: false });
    if (!admin) query = query.eq('is_active', true);

    const { data, error } = await query;
    if (error) throw error;
    res.status(200).json({ success: true, data: data ?? [] });
  } catch (error) {
    console.error('Get gallery events error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch exhibition events' });
  }
};

export const createGalleryEvent = async (req: Request, res: Response): Promise<void> => {
  const validation = eventSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ success: false, message: 'Invalid exhibition event', errors: validation.error.issues });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('gallery_events')
      .insert(validation.data)
      .select(eventFields)
      .single();
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('Create gallery event error:', error);
    res.status(500).json({ success: false, message: 'Failed to create exhibition event' });
  }
};

export const updateGalleryEvent = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const validation = eventUpdateSchema.safeParse(req.body);
  if (!validation.success || Object.keys(validation.data ?? {}).length === 0) {
    res.status(400).json({ success: false, message: 'Invalid exhibition event update' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('gallery_events')
      .update(validation.data)
      .eq('id', req.params.id)
      .select(eventFields)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      res.status(404).json({ success: false, message: 'Exhibition event not found' });
      return;
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Update gallery event error:', error);
    res.status(500).json({ success: false, message: 'Failed to update exhibition event' });
  }
};

export const deleteGalleryEvent = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('gallery_events')
      .delete()
      .eq('id', req.params.id)
      .select('id')
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      res.status(404).json({ success: false, message: 'Exhibition event not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Exhibition event deleted successfully' });
  } catch (error) {
    console.error('Delete gallery event error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete exhibition event' });
  }
};

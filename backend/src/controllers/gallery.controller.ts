import { Request, Response } from 'express';
import { z } from 'zod';
import { supabase } from '../config/supabase.js';

const categorySchema = z.enum(['machine', 'airshaft', 'spare_part', 'exhibition']);
const mediaTypeSchema = z.enum(['image', 'video']);

const createSchema = z.object({
  category: categorySchema,
  media_type: mediaTypeSchema,
  media_url: z.string().url(),
  thumbnail_url: z.string().url().nullable().optional(),
  title: z.string().trim().max(160).nullable().optional(),
  sort_order: z.number().int().nonnegative().optional().default(0),
  is_active: z.boolean().optional().default(true)
}).strict();

const updateSchema = createSchema.partial();

const fields = `id, category, media_type, media_url, thumbnail_url, title, sort_order, is_active, created_at, updated_at`;

export const getGalleryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const admin = req.query.admin === 'true';
    if (category && !categorySchema.safeParse(category).success) {
      res.status(400).json({ success: false, message: 'Invalid gallery category' });
      return;
    }
    let query = supabase.from('gallery_items').select(fields).order('sort_order', { ascending: true }).order('created_at', { ascending: false });
    if (!admin) query = query.eq('is_active', true);
    if (category) query = query.eq('category', category);
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
    const { data, error } = await supabase.from('gallery_items').insert(validation.data).select(fields).single();
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
    const { data, error } = await supabase.from('gallery_items').update(validation.data).eq('id', req.params.id).select(fields).maybeSingle();
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
    const { data, error } = await supabase.from('gallery_items').delete().eq('id', req.params.id).select('id').maybeSingle();
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
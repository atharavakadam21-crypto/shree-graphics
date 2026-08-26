import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

const MACHINE_BUCKET_NAME = 'machine-images';
const AIR_SHAFT_BUCKET_NAME = 'airshaft-images';
const GALLERY_BUCKET_NAME = 'gallery-media';
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const GALLERY_TYPES = new Set([...IMAGE_TYPES, 'video/mp4', 'video/webm', 'video/quicktime']);
const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_FILES = 10;

const safeName = (name: string): string => name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'media';
const extension = (name: string): string => name.split('.').pop()?.toLowerCase() ?? 'jpg';

const validateFiles = (files: Express.Multer.File[] | undefined, allowed: Set<string>, label: string): string | null => {
  if (!files?.length) return `No ${label} were uploaded`;
  if (files.length > MAX_FILES) return `Maximum ${MAX_FILES} files can be uploaded at once`;
  for (const file of files) {
    if (!allowed.has(file.mimetype)) return `Unsupported file type: ${file.mimetype}`;
    if (file.size > MAX_FILE_SIZE) return `${file.originalname} exceeds the 100MB limit`;
  }
  return null;
};

const uploadFiles = async (files: Express.Multer.File[], bucket: string, folder: string): Promise<Array<{ url: string; media_type: 'image' | 'video' }>> => {
  const uploaded: Array<{ url: string; media_type: 'image' | 'video' }> = [];
  for (const file of files) {
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName(file.originalname)}.${extension(file.originalname)}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file.buffer, { contentType: file.mimetype, upsert: false });
    if (error) throw new Error(`Failed to upload ${file.originalname}`);
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    uploaded.push({ url: data.publicUrl, media_type: file.mimetype.startsWith('video/') ? 'video' : 'image' });
  }
  return uploaded;
};

export const uploadMachineImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const error = validateFiles(files, IMAGE_TYPES, 'images');
    if (error) { res.status(400).json({ success: false, message: error }); return; }
    const items = await uploadFiles(files!, MACHINE_BUCKET_NAME, 'machines');
    res.status(201).json({ success: true, data: { images: items.map((item) => item.url) } });
  } catch (error) { res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Internal server error' }); }
};

export const uploadAirShaftImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const error = validateFiles(files, IMAGE_TYPES, 'images');
    if (error) { res.status(400).json({ success: false, message: error }); return; }
    const items = await uploadFiles(files!, AIR_SHAFT_BUCKET_NAME, 'airshafts');
    res.status(201).json({ success: true, data: { images: items.map((item) => item.url) } });
  } catch (error) { res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Internal server error' }); }
};

export const uploadGalleryMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const error = validateFiles(files, GALLERY_TYPES, 'media');
    if (error) { res.status(400).json({ success: false, message: error }); return; }
    const data = await uploadFiles(files!, GALLERY_BUCKET_NAME, 'gallery');
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('Gallery media upload error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Internal server error' });
  }
};
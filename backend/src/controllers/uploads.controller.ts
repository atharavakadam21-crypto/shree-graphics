import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

const MACHINE_BUCKET_NAME = 'machine-images';
const AIR_SHAFT_BUCKET_NAME = 'airshaft-images';

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif'
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 10;

const createSafeFileName = (
  originalName: string
): string => {
  return (
    originalName
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'image'
  );
};

const getExtension = (
  originalName: string
): string => {
  return (
    originalName
      .split('.')
      .pop()
      ?.toLowerCase() ?? 'jpg'
  );
};

const validateFiles = (
  files: Express.Multer.File[] | undefined
): string | null => {
  if (!files || files.length === 0) {
    return 'No images were uploaded';
  }

  if (files.length > MAX_FILES) {
    return `Maximum ${MAX_FILES} images can be uploaded at once`;
  }

  for (const file of files) {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      return `Unsupported image type: ${file.mimetype}`;
    }

    if (file.size > MAX_FILE_SIZE) {
      return `${file.originalname} exceeds the 10MB limit`;
    }
  }

  return null;
};

const uploadImages = async (
  files: Express.Multer.File[],
  bucketName: string,
  folderName: string
): Promise<string[]> => {
  const uploadedImages: string[] = [];

  for (const file of files) {
    const extension = getExtension(
      file.originalname
    );

    const safeName = createSafeFileName(
      file.originalname
    );

    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    const filePath =
      `${folderName}/${uniqueName}-${safeName}.${extension}`;

    const { error: uploadError } =
      await supabase.storage
        .from(bucketName)
        .upload(
          filePath,
          file.buffer,
          {
            contentType: file.mimetype,
            upsert: false
          }
        );

    if (uploadError) {
      console.error(
        `Supabase ${folderName} image upload failed:`,
        uploadError
      );

      throw new Error(
        `Failed to upload image: ${file.originalname}`
      );
    }

    const {
      data: publicUrlData
    } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    uploadedImages.push(
      publicUrlData.publicUrl
    );
  }

  return uploadedImages;
};

/**
 * POST /api/uploads/machine-images
 *
 * Admin only.
 */
export const uploadMachineImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as
      | Express.Multer.File[]
      | undefined;

    const validationError =
      validateFiles(files);

    if (validationError) {
      res.status(400).json({
        success: false,
        message: validationError
      });

      return;
    }

    const uploadedImages =
      await uploadImages(
        files!,
        MACHINE_BUCKET_NAME,
        'machines'
      );

    res.status(201).json({
      success: true,
      message:
        'Machine images uploaded successfully',
      data: {
        images: uploadedImages
      }
    });
  } catch (error) {
    console.error(
      'Machine image upload error:',
      error
    );

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Internal server error'
    });
  }
};

/**
 * POST /api/uploads/airshaft-images
 *
 * Admin only.
 */
export const uploadAirShaftImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as
      | Express.Multer.File[]
      | undefined;

    const validationError =
      validateFiles(files);

    if (validationError) {
      res.status(400).json({
        success: false,
        message: validationError
      });

      return;
    }

    const uploadedImages =
      await uploadImages(
        files!,
        AIR_SHAFT_BUCKET_NAME,
        'airshafts'
      );

    res.status(201).json({
      success: true,
      message:
        'Air shaft images uploaded successfully',
      data: {
        images: uploadedImages
      }
    });
  } catch (error) {
    console.error(
      'Air shaft image upload error:',
      error
    );

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Internal server error'
    });
  }
};
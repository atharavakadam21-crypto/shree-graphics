'use client';

import {
  FormEvent,
  useEffect,
  useRef,
  useState
} from 'react';

import { api } from '@/lib/api';
import type { AirShaft } from '@/lib/types';

interface AirShaftFormProps {
  airShaft?: AirShaft | null;
  onCreated: (airShaft: AirShaft) => void;
  onUpdated: (airShaft: AirShaft) => void;
  onCancel: () => void;
}

interface AirShaftFormData {
  name: string;
  slug: string;
  type: string;
  short_description: string;
  description: string;
  specifications: string;
  images: string[];
  featured: boolean;
  is_active: boolean;
}

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif'
];

const createSlug = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const createInitialForm = (
  airShaft?: AirShaft | null
): AirShaftFormData => {
  if (!airShaft) {
    return {
      name: '',
      slug: '',
      type: '',
      short_description: '',
      description: '',
      specifications: JSON.stringify(
        {
          shaft_type: '',
          application: '',
          diameter: '',
          length: '',
          material: ''
        },
        null,
        2
      ),
      images: [],
      featured: false,
      is_active: true
    };
  }

  return {
    name: airShaft.name,
    slug: airShaft.slug,
    type: airShaft.type ?? '',
    short_description:
      airShaft.short_description ?? '',
    description:
      airShaft.description ?? '',
    specifications: JSON.stringify(
      airShaft.specifications ?? {},
      null,
      2
    ),
    images: airShaft.images ?? [],
    featured: airShaft.featured,
    is_active: airShaft.is_active
  };
};

export default function AirShaftForm({
  airShaft,
  onCreated,
  onUpdated,
  onCancel
}: AirShaftFormProps) {
  const isEditing = Boolean(airShaft);

  const [form, setForm] =
    useState<AirShaftFormData>(() =>
      createInitialForm(airShaft)
    );

  const [newFiles, setNewFiles] =
    useState<File[]>([]);

  const [previewUrls, setPreviewUrls] =
    useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isUploading, setIsUploading] =
    useState(false);

  const [error, setError] = useState('');

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(createInitialForm(airShaft));
    setNewFiles([]);
    setPreviewUrls([]);
    setError('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [airShaft]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) =>
        URL.revokeObjectURL(url)
      );
    };
  }, [previewUrls]);

  const updateField = <
    K extends keyof AirShaftFormData
  >(
    field: K,
    value: AirShaftFormData[K]
  ): void => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handleNameChange = (
    value: string
  ): void => {
    setForm((current) => ({
      ...current,
      name: value,
      slug: isEditing
        ? current.slug
        : createSlug(value)
    }));
  };

  const handleFileSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selectedFiles = Array.from(
      event.target.files ?? []
    );

    if (selectedFiles.length === 0) {
      return;
    }

    setError('');

    const currentImageCount =
      form.images.length + newFiles.length;

    if (
      currentImageCount +
        selectedFiles.length >
      MAX_IMAGES
    ) {
      setError(
        `You can have a maximum of ${MAX_IMAGES} images.`
      );

      return;
    }

    for (const file of selectedFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(
          `${file.name} is not a supported image type. Use JPG, PNG, WEBP or AVIF.`
        );

        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(
          `${file.name} exceeds the 10MB file size limit.`
        );

        return;
      }
    }

    const newPreviewUrls =
      selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );

    setNewFiles((current) => [
      ...current,
      ...selectedFiles
    ]);

    setPreviewUrls((current) => [
      ...current,
      ...newPreviewUrls
    ]);

    event.target.value = '';
  };

  const removeExistingImage = (
    index: number
  ): void => {
    setForm((current) => ({
      ...current,
      images: current.images.filter(
        (_, imageIndex) =>
          imageIndex !== index
      )
    }));
  };

  const removeNewImage = (
    index: number
  ): void => {
    const previewUrl = previewUrls[index];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setNewFiles((current) =>
      current.filter(
        (_, fileIndex) =>
          fileIndex !== index
      )
    );

    setPreviewUrls((current) =>
      current.filter(
        (_, previewIndex) =>
          previewIndex !== index
      )
    );
  };

  const uploadImages = async (): Promise<
    string[]
  > => {
    if (newFiles.length === 0) {
      return [];
    }

    const formData = new FormData();

    newFiles.forEach((file) => {
      formData.append('images', file);
    });

    setIsUploading(true);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ??
        'http://localhost:5000';

      const response = await fetch(
        `${apiUrl}/api/uploads/airshaft-images`,
        {
          method: 'POST',
          credentials: 'include',
          body: formData
        }
      );

      let result: {
        success: boolean;
        message?: string;
        data?: {
          images: string[];
        };
      };

      try {
        result = await response.json();
      } catch {
        throw new Error(
          'Invalid response from image upload server.'
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ??
            'Failed to upload images.'
        );
      }

      return result.data?.images ?? [];
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    setError('');

    if (!form.name.trim()) {
      setError(
        'Air shaft name is required.'
      );
      return;
    }

    if (!form.slug.trim()) {
      setError(
        'Air shaft slug is required.'
      );
      return;
    }

    let specifications:
      | Record<string, unknown>;

    try {
      const parsed = JSON.parse(
        form.specifications
      );

      if (
        typeof parsed !== 'object' ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        setError(
          'Specifications must be a JSON object.'
        );
        return;
      }

      specifications =
        parsed as Record<string, unknown>;
    } catch {
      setError(
        'Specifications must contain valid JSON.'
      );
      return;
    }

    try {
      setIsSubmitting(true);

      // Upload newly selected images first.
      const uploadedImages =
        await uploadImages();

      const allImages = [
        ...form.images,
        ...uploadedImages
      ];

      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim(),

        type:
          form.type.trim() || null,

        short_description:
          form.short_description.trim() ||
          null,

        description:
          form.description.trim() || null,

        specifications,

        images: allImages,

        featured: form.featured,

        is_active: form.is_active
      };

      if (airShaft) {
        const response =
          await api.patch<AirShaft>(
            `/api/airshafts/${airShaft.id}`,
            payload
          );

        if (!response.data) {
          throw new Error(
            'Updated air shaft was not returned by the server.'
          );
        }

        onUpdated(response.data);
      } else {
        const response =
          await api.post<AirShaft>(
            '/api/airshafts',
            payload
          );

        if (!response.data) {
          throw new Error(
            'Created air shaft was not returned by the server.'
          );
        }

        onCreated(response.data);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : isEditing
            ? 'Unable to update air shaft.'
            : 'Unable to create air shaft.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalImages =
    form.images.length +
    newFiles.length;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEditing
            ? 'Edit Air Shaft'
            : 'Add Air Shaft'}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? 'Update the air shaft information.'
            : 'Add an air shaft to the Shree Graphics catalogue.'}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* BASIC INFORMATION */}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="airshaft-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Air Shaft Name
            </label>

            <input
              id="airshaft-name"
              type="text"
              value={form.name}
              onChange={(event) =>
                handleNameChange(
                  event.target.value
                )
              }
              disabled={isSubmitting}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label
              htmlFor="airshaft-slug"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Slug
            </label>

            <input
              id="airshaft-slug"
              type="text"
              value={form.slug}
              onChange={(event) =>
                updateField(
                  'slug',
                  event.target.value
                )
              }
              disabled={isSubmitting}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        {/* TYPE */}

        <div>
          <label
            htmlFor="airshaft-type"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Air Shaft Type
          </label>

          <input
            id="airshaft-type"
            type="text"
            value={form.type}
            onChange={(event) =>
              updateField(
                'type',
                event.target.value
              )
            }
            disabled={isSubmitting}
            placeholder="Example: Pneumatic Expanding Air Shaft"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* SHORT DESCRIPTION */}

        <div>
          <label
            htmlFor="airshaft-short-description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Short Description
          </label>

          <input
            id="airshaft-short-description"
            type="text"
            value={form.short_description}
            onChange={(event) =>
              updateField(
                'short_description',
                event.target.value
              )
            }
            disabled={isSubmitting}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* DESCRIPTION */}

        <div>
          <label
            htmlFor="airshaft-description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="airshaft-description"
            value={form.description}
            onChange={(event) =>
              updateField(
                'description',
                event.target.value
              )
            }
            rows={6}
            disabled={isSubmitting}
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* SPECIFICATIONS */}

        <div>
          <label
            htmlFor="airshaft-specifications"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Specifications
          </label>

          <textarea
            id="airshaft-specifications"
            value={form.specifications}
            onChange={(event) =>
              updateField(
                'specifications',
                event.target.value
              )
            }
            rows={10}
            disabled={isSubmitting}
            spellCheck={false}
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          />

          <p className="mt-2 text-xs text-gray-500">
            Use valid JSON.
          </p>
        </div>

        {/* IMAGES */}

        <div>
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Air Shaft Images
              </p>

              <p className="text-xs text-gray-500">
                JPG, PNG, WEBP or AVIF · Maximum
                10MB each
              </p>
            </div>

            <span className="text-xs font-medium text-gray-500">
              {totalImages}/{MAX_IMAGES}
            </span>
          </div>

          {/* IMAGE PREVIEWS */}

          {totalImages > 0 && (
            <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {/* Existing images */}

              {form.images.map(
                (image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                  >
                    <img
                      src={image}
                      alt={`Air shaft image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1.5">
                      <span className="text-[10px] font-medium text-white">
                        Uploaded
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeExistingImage(
                          index
                        )
                      }
                      disabled={isSubmitting}
                      aria-label={`Remove image ${index + 1}`}
                      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-lg text-white opacity-100 transition hover:bg-red-600 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                )
              )}

              {/* New images */}

              {previewUrls.map(
                (previewUrl, index) => (
                  <div
                    key={previewUrl}
                    className="group relative aspect-square overflow-hidden rounded-xl border-2 border-dashed border-cyan-400 bg-gray-100"
                  >
                    <img
                      src={previewUrl}
                      alt={`New air shaft image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-cyan-950/80 px-2 py-1.5">
                      <span className="text-[10px] font-medium text-white">
                        New
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeNewImage(index)
                      }
                      disabled={isSubmitting}
                      aria-label={`Remove new image ${index + 1}`}
                      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-lg text-white opacity-100 transition hover:bg-red-600 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                )
              )}
            </div>
          )}

          {/* UPLOAD BOX */}

          {totalImages < MAX_IMAGES && (
            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              disabled={
                isSubmitting ||
                isUploading
              }
              className="flex min-h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition hover:border-gray-400 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-xl text-white">
                +
              </span>

              <span className="text-sm font-semibold text-gray-900">
                Select Images
              </span>

              <span className="mt-1 text-xs text-gray-500">
                Choose up to{' '}
                {MAX_IMAGES - totalImages}{' '}
                more image
                {MAX_IMAGES -
                  totalImages ===
                1
                  ? ''
                  : 's'}
              </span>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            onChange={handleFileSelection}
            className="hidden"
          />

          <p className="mt-2 text-xs text-gray-500">
            Images are uploaded to Shree Graphics
            Storage when you save the air shaft.
          </p>
        </div>

        {/* FLAGS */}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) =>
                updateField(
                  'featured',
                  event.target.checked
                )
              }
              disabled={isSubmitting}
              className="h-5 w-5"
            />

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Featured
              </p>

              <p className="text-xs text-gray-500">
                Show this air shaft as featured.
              </p>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(event) =>
                updateField(
                  'is_active',
                  event.target.checked
                )
              }
              disabled={isSubmitting}
              className="h-5 w-5"
            />

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Active
              </p>

              <p className="text-xs text-gray-500">
                Make this air shaft visible publicly.
              </p>
            </div>
          </label>
        </div>

        {/* ACTIONS */}

        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={
              isSubmitting ||
              isUploading
            }
            className="min-h-11 rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              isSubmitting ||
              isUploading
            }
            className="min-h-11 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading
              ? 'Uploading images...'
              : isSubmitting
                ? 'Saving...'
                : isEditing
                  ? 'Update Air Shaft'
                  : 'Create Air Shaft'}
          </button>
        </div>
      </form>
    </div>
  );
}
'use client';

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState
} from 'react';

import { api } from '@/lib/api';
import type { Machine } from '@/lib/types';

interface MachineFormProps {
  machine?: Machine | null;
  onCreated: (machine: Machine) => void;
  onUpdated: (machine: Machine) => void;
  onCancel: () => void;
}

interface MachineFormData {
  name: string;
  slug: string;
  short_description: string;
  description: string;
  specifications: string;
  images: string[];
  featured: boolean;
  is_active: boolean;
}

const createInitialForm = (
  machine?: Machine | null
): MachineFormData => {
  if (!machine) {
    return {
      name: '',
      slug: '',
      short_description: '',
      description: '',
      specifications: JSON.stringify(
        {
          type: '',
          application: '',
          speed: '',
          power: ''
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
    name: machine.name,
    slug: machine.slug,
    short_description:
      machine.short_description ?? '',
    description: machine.description ?? '',
    specifications: JSON.stringify(
      machine.specifications ?? {},
      null,
      2
    ),
    images: machine.images ?? [],
    featured: machine.featured,
    is_active: machine.is_active
  };
};

const createSlug = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif'
]);

export default function MachineForm({
  machine,
  onCreated,
  onUpdated,
  onCancel
}: MachineFormProps) {
  const isEditing = Boolean(machine);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const [form, setForm] =
    useState<MachineFormData>(
      () => createInitialForm(machine)
    );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isUploading, setIsUploading] =
    useState(false);

  const [error, setError] = useState('');

  const [uploadError, setUploadError] =
    useState('');

  useEffect(() => {
    setForm(createInitialForm(machine));
    setError('');
    setUploadError('');
  }, [machine]);

  const updateField = <
    K extends keyof MachineFormData
  >(
    field: K,
    value: MachineFormData[K]
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

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = Array.from(
      event.target.files ?? []
    );

    if (files.length === 0) {
      return;
    }

    setUploadError('');

    const remainingSlots =
      MAX_IMAGES - form.images.length;

    if (remainingSlots <= 0) {
      setUploadError(
        `You can upload a maximum of ${MAX_IMAGES} images.`
      );

      event.target.value = '';
      return;
    }

    const selectedFiles =
      files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      setUploadError(
        `Only ${remainingSlots} more image${
          remainingSlots === 1 ? '' : 's'
        } can be uploaded.`
      );
    }

    for (const file of selectedFiles) {
      if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
        setUploadError(
          `${file.name} is not a supported image format. Use JPG, PNG, WEBP or AVIF.`
        );

        event.target.value = '';
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setUploadError(
          `${file.name} is larger than 10MB.`
        );

        event.target.value = '';
        return;
      }
    }

    const uploadData = new FormData();

    selectedFiles.forEach((file) => {
      uploadData.append('images', file);
    });

    try {
      setIsUploading(true);

      const response = await api.postForm<{
        images: string[];
      }>(
        '/api/uploads/machine-images',
        uploadData
      );

      if (!response.data?.images?.length) {
        throw new Error(
          'Images were uploaded but no image URLs were returned.'
        );
      }

      setForm((current) => ({
        ...current,
        images: [
          ...current.images,
          ...response.data!.images
        ]
      }));
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : 'Unable to upload images.'
      );
    } finally {
      setIsUploading(false);

      event.target.value = '';
    }
  };

  const removeImage = (
    indexToRemove: number
  ): void => {
    setForm((current) => ({
      ...current,
      images: current.images.filter(
        (_, index) => index !== indexToRemove
      )
    }));
  };

  const moveImage = (
    index: number,
    direction: 'left' | 'right'
  ): void => {
    setForm((current) => {
      const images = [...current.images];

      const targetIndex =
        direction === 'left'
          ? index - 1
          : index + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= images.length
      ) {
        return current;
      }

      [
        images[index],
        images[targetIndex]
      ] = [
        images[targetIndex],
        images[index]
      ];

      return {
        ...current,
        images
      };
    });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    setError('');

    if (!form.name.trim()) {
      setError('Machine name is required.');
      return;
    }

    if (!form.slug.trim()) {
      setError('Machine slug is required.');
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

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),

      short_description:
        form.short_description.trim() || null,

      description:
        form.description.trim() || null,

      specifications,

      images: form.images,

      featured: form.featured,

      is_active: form.is_active
    };

    try {
      setIsSubmitting(true);

      if (machine) {
        const response =
          await api.patch<Machine>(
            `/api/machines/${machine.id}`,
            payload
          );

        if (!response.data) {
          throw new Error(
            'Updated machine was not returned by the server.'
          );
        }

        onUpdated(response.data);
      } else {
        const response =
          await api.post<Machine>(
            '/api/machines',
            payload
          );

        if (!response.data) {
          throw new Error(
            'Created machine was not returned by the server.'
          );
        }

        onCreated(response.data);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : isEditing
            ? 'Unable to update machine.'
            : 'Unable to create machine.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEditing
            ? 'Edit Machine'
            : 'Add Machine'}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? 'Update the machine information.'
            : 'Add a machine to the Shree Graphics catalogue.'}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* BASIC INFORMATION */}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="machine-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Machine Name
            </label>

            <input
              id="machine-name"
              type="text"
              value={form.name}
              onChange={(event) =>
                handleNameChange(
                  event.target.value
                )
              }
              disabled={
                isSubmitting || isUploading
              }
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label
              htmlFor="machine-slug"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Slug
            </label>

            <input
              id="machine-slug"
              type="text"
              value={form.slug}
              onChange={(event) =>
                updateField(
                  'slug',
                  event.target.value
                )
              }
              disabled={
                isSubmitting || isUploading
              }
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        {/* SHORT DESCRIPTION */}

        <div>
          <label
            htmlFor="machine-short-description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Short Description
          </label>

          <input
            id="machine-short-description"
            type="text"
            value={form.short_description}
            onChange={(event) =>
              updateField(
                'short_description',
                event.target.value
              )
            }
            disabled={
              isSubmitting || isUploading
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* DESCRIPTION */}

        <div>
          <label
            htmlFor="machine-description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="machine-description"
            value={form.description}
            onChange={(event) =>
              updateField(
                'description',
                event.target.value
              )
            }
            rows={5}
            disabled={
              isSubmitting || isUploading
            }
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* SPECIFICATIONS */}

        <div>
          <label
            htmlFor="machine-specifications"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Specifications
          </label>

          <textarea
            id="machine-specifications"
            value={form.specifications}
            onChange={(event) =>
              updateField(
                'specifications',
                event.target.value
              )
            }
            rows={9}
            disabled={
              isSubmitting || isUploading
            }
            spellCheck={false}
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          />

          <p className="mt-2 text-xs text-gray-500">
            Use valid JSON.
          </p>
        </div>

        {/* MACHINE IMAGES */}

        <div>
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Machine Images
              </label>

              <p className="mt-1 text-xs text-gray-500">
                Upload up to {MAX_IMAGES} images.
                JPG, PNG, WEBP or AVIF. Maximum
                10MB each.
              </p>
            </div>

            <span className="shrink-0 font-mono text-xs text-gray-400">
              {form.images.length}/{MAX_IMAGES}
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            onChange={handleImageUpload}
            disabled={
              isSubmitting ||
              isUploading ||
              form.images.length >= MAX_IMAGES
            }
            className="hidden"
          />

          <button
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={
              isSubmitting ||
              isUploading ||
              form.images.length >= MAX_IMAGES
            }
            className="flex min-h-32 w-full flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition hover:border-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="text-3xl text-gray-400">
              {isUploading ? '↑' : '+'}
            </span>

            <span className="mt-2 text-sm font-semibold text-gray-700">
              {isUploading
                ? 'Uploading images...'
                : 'Upload machine images'}
            </span>

            <span className="mt-1 text-xs text-gray-500">
              Click to select one or multiple files
            </span>
          </button>

          {uploadError && (
            <div
              role="alert"
              className="mt-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {uploadError}
            </div>
          )}

          {form.images.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {form.images.map(
                (image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="group relative overflow-hidden border border-gray-200 bg-gray-100"
                  >
                    <div className="aspect-[4/3]">
                      <img
                        src={image}
                        alt={`${form.name || 'Machine'} image ${index + 1}`}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>

                    {index === 0 && (
                      <div className="absolute left-2 top-2 bg-orange-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        Primary
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-1 bg-black/80 p-2 transition-transform group-hover:translate-y-0">
                      <button
                        type="button"
                        onClick={() =>
                          moveImage(
                            index,
                            'left'
                          )
                        }
                        disabled={
                          index === 0 ||
                          isSubmitting ||
                          isUploading
                        }
                        className="min-h-9 min-w-9 border border-white/20 px-2 text-xs text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-30"
                        title="Move left"
                      >
                        ←
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          moveImage(
                            index,
                            'right'
                          )
                        }
                        disabled={
                          index ===
                            form.images.length -
                              1 ||
                          isSubmitting ||
                          isUploading
                        }
                        className="min-h-9 min-w-9 border border-white/20 px-2 text-xs text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-30"
                        title="Move right"
                      >
                        →
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index)
                        }
                        disabled={
                          isSubmitting ||
                          isUploading
                        }
                        className="min-h-9 flex-1 border border-red-400/40 px-2 text-xs font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {form.images.length > 0 && (
            <p className="mt-3 text-xs text-gray-500">
              The first image is used as the primary
              machine image on the public catalogue.
              Use the arrows to reorder images.
            </p>
          )}
        </div>

        {/* OPTIONS */}

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) =>
                updateField(
                  'featured',
                  event.target.checked
                )
              }
              disabled={
                isSubmitting || isUploading
              }
              className="h-4 w-4 rounded border-gray-300"
            />

            <span className="text-sm font-medium text-gray-700">
              Featured machine
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(event) =>
                updateField(
                  'is_active',
                  event.target.checked
                )
              }
              disabled={
                isSubmitting || isUploading
              }
              className="h-4 w-4 rounded border-gray-300"
            />

            <span className="text-sm font-medium text-gray-700">
              Active
            </span>
          </label>
        </div>

        {/* ERROR */}

        {error && (
          <div
            role="alert"
            className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* ACTIONS */}

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={
              isSubmitting || isUploading
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
            {isSubmitting
              ? isEditing
                ? 'Saving...'
                : 'Creating...'
              : isUploading
                ? 'Uploading...'
                : isEditing
                  ? 'Save Changes'
                  : 'Create Machine'}
          </button>
        </div>
      </form>
    </div>
  );
}
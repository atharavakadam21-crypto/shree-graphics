'use client';

import { useEffect, useMemo, useState } from 'react';

import { api } from '@/lib/api';
import type { SparePart } from '@/lib/types';

interface SparePartFormProps {
  sparePart: SparePart | null;
  onCreated: (sparePart: SparePart) => void;
  onUpdated: (sparePart: SparePart) => void;
  onCancel: () => void;
}

interface SpecificationRow {
  key: string;
  value: string;
}

const emptySpecifications = (): SpecificationRow[] => [
  {
    key: '',
    value: ''
  }
];

export default function SparePartForm({
  sparePart,
  onCreated,
  onUpdated,
  onCancel
}: SparePartFormProps) {
  const isEditing = Boolean(sparePart);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] =
    useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const [machineCompatibility, setMachineCompatibility] =
    useState<string[]>([]);

  const [compatibilityInput, setCompatibilityInput] =
    useState('');

  const [specifications, setSpecifications] =
    useState<SpecificationRow[]>(
      emptySpecifications()
    );

  const [images, setImages] = useState<string[]>([]);

  const [featured, setFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isUploading, setIsUploading] =
    useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /*
   * Load existing spare part
   */

  useEffect(() => {
    if (!sparePart) {
      setName('');
      setSlug('');
      setShortDescription('');
      setDescription('');
      setCategory('');
      setMachineCompatibility([]);
      setCompatibilityInput('');
      setSpecifications(emptySpecifications());
      setImages([]);
      setFeatured(false);
      setIsActive(true);
      setError('');
      setSuccess('');

      return;
    }

    setName(sparePart.name);
    setSlug(sparePart.slug);

    setShortDescription(
      sparePart.short_description ?? ''
    );

    setDescription(
      sparePart.description ?? ''
    );

    setCategory(
      sparePart.category ?? ''
    );

    setMachineCompatibility(
      sparePart.machine_compatibility ?? []
    );

    setCompatibilityInput('');

    const existingSpecifications =
      Object.entries(
        sparePart.specifications ?? {}
      ).map(([key, value]) => ({
        key,
        value:
          typeof value === 'string'
            ? value
            : JSON.stringify(value)
      }));

    setSpecifications(
      existingSpecifications.length > 0
        ? existingSpecifications
        : emptySpecifications()
    );

    setImages(sparePart.images ?? []);
    setFeatured(sparePart.featured);
    setIsActive(sparePart.is_active);

    setError('');
    setSuccess('');
  }, [sparePart]);

  /*
   * SEO slug
   */

  const generatedSlug = useMemo(() => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }, [name]);

  const handleGenerateSlug = (): void => {
    setSlug(generatedSlug);
  };

  /*
   * Machine compatibility
   */

  const addCompatibility = (): void => {
    const value = compatibilityInput.trim();

    if (!value) {
      return;
    }

    const exists =
      machineCompatibility.some(
        (item) =>
          item.toLowerCase() ===
          value.toLowerCase()
      );

    if (exists) {
      setCompatibilityInput('');
      return;
    }

    setMachineCompatibility((current) => [
      ...current,
      value
    ]);

    setCompatibilityInput('');
  };

  const removeCompatibility = (
    value: string
  ): void => {
    setMachineCompatibility((current) =>
      current.filter((item) => item !== value)
    );
  };

  const handleCompatibilityKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (
      event.key === 'Enter' ||
      event.key === ','
    ) {
      event.preventDefault();
      addCompatibility();
    }
  };

  /*
   * Specifications
   */

  const addSpecification = (): void => {
    setSpecifications((current) => [
      ...current,
      {
        key: '',
        value: ''
      }
    ]);
  };

  const removeSpecification = (
    index: number
  ): void => {
    setSpecifications((current) =>
      current.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  };

  const updateSpecification = (
    index: number,
    field: keyof SpecificationRow,
    value: string
  ): void => {
    setSpecifications((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value
            }
          : item
      )
    );
  };

  /*
   * Image upload
   */

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = Array.from(
      event.target.files ?? []
    );

    if (files.length === 0) {
      return;
    }

    try {
      setIsUploading(true);
      setError('');
      setSuccess('');

      const formData = new FormData();

      files.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL ??
          'http://localhost:5000'
        }/api/uploads/machine-images`,
        {
          method: 'POST',
          credentials: 'include',
          body: formData
        }
      );

      let result: {
        success?: boolean;
        message?: string;
        images?: string[];
        data?: {
          images?: string[];
        };
      };

      try {
        result = await response.json();
      } catch {
        throw new Error(
          'Invalid response from image upload server.'
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ??
            'Failed to upload images.'
        );
      }

      const uploadedImages =
        result.images ??
        result.data?.images ??
        [];

      if (
        !Array.isArray(uploadedImages) ||
        uploadedImages.length === 0
      ) {
        throw new Error(
          'The server did not return uploaded image URLs.'
        );
      }

      setImages((current) => [
        ...current,
        ...uploadedImages
      ]);

      setSuccess(
        `${uploadedImages.length} image${
          uploadedImages.length === 1
            ? ''
            : 's'
        } uploaded successfully.`
      );
    } catch (error) {
      setError(
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
    image: string
  ): void => {
    setImages((current) =>
      current.filter(
        (item) => item !== image
      )
    );
  };

  /*
   * Build specifications
   */

  const buildSpecifications =
    (): Record<string, unknown> => {
      const result: Record<string, unknown> = {};

      specifications.forEach(
        ({ key, value }) => {
          const cleanKey = key.trim();
          const cleanValue = value.trim();

          if (!cleanKey || !cleanValue) {
            return;
          }

          result[cleanKey] = cleanValue;
        }
      );

      return result;
    };

  /*
   * Submit
   */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError('');
      setSuccess('');

      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        short_description:
          shortDescription.trim() || null,
        description:
          description.trim() || null,
        category:
          category.trim() || null,
        machine_compatibility:
          machineCompatibility,
        specifications:
          buildSpecifications(),
        images,
        featured,
        is_active: isActive
      };

      const response = isEditing
        ? await api.patch<SparePart>(
            `/api/spare-parts/${sparePart!.id}`,
            payload
          )
        : await api.post<SparePart>(
            '/api/spare-parts',
            payload
          );

      if (!response.data) {
        throw new Error(
          'Spare part was not returned by the server.'
        );
      }

      setSuccess(
        isEditing
          ? 'Spare part updated successfully.'
          : 'Spare part created successfully.'
      );

      if (isEditing) {
        onUpdated(response.data);
      } else {
        onCreated(response.data);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to save spare part.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        /*
         * Spare Part Form Theme Override
         *
         * The admin/public stylesheet is applying a light
         * text color to form controls. These rules are scoped
         * only to this form.
         */

        .spare-part-form input,
        .spare-part-form textarea,
        .spare-part-form select {
          color: #111827 !important;
          background-color: #ffffff !important;
          -webkit-text-fill-color: #111827 !important;
        }

        .spare-part-form input::placeholder,
        .spare-part-form textarea::placeholder,
        .spare-part-form select::placeholder {
          color: #9ca3af !important;
          opacity: 1 !important;
          -webkit-text-fill-color: #9ca3af !important;
        }

        .spare-part-form input:focus,
        .spare-part-form textarea:focus,
        .spare-part-form select:focus {
          color: #111827 !important;
          background-color: #ffffff !important;
          -webkit-text-fill-color: #111827 !important;
        }

        .spare-part-form label {
          color: #1f2937 !important;
        }

        .spare-part-form button {
          -webkit-text-fill-color: currentColor;
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        className="spare-part-form overflow-hidden rounded-2xl bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
      >
        {/* ============================================================ */}
        {/* HEADER */}
        {/* ============================================================ */}

        <div className="border-b border-gray-200 px-6 py-5">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
            Admin / Spare Parts
          </p>

          <h2 className="mt-1 text-xl font-bold text-gray-900">
            {isEditing
              ? 'Edit Spare Part'
              : 'Add Spare Part'}
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Add technical information used by the
            public spare parts catalogue.
          </p>
        </div>

        {/* ============================================================ */}
        {/* ALERTS */}
        {/* ============================================================ */}

        {(error || success) && (
          <div className="px-6 pt-5">
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {success && !error && (
              <div
                role="status"
                className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
              >
                {success}
              </div>
            )}
          </div>
        )}

        <div className="space-y-8 p-6">

          {/* ========================================================== */}
          {/* BASIC INFORMATION */}
          {/* ========================================================== */}

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Basic Information
            </h3>

            <div className="mt-4 grid gap-5 md:grid-cols-2">

              {/* Part Name */}
              <div>
                <label
                  htmlFor="spare-part-name"
                  className="text-sm font-medium text-gray-800"
                >
                  Part Name
                </label>

                <input
                  id="spare-part-name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                  placeholder="e.g. Rotary Die Cutting Blade"
                  className="mt-2 min-h-11 w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="spare-part-category"
                  className="text-sm font-medium text-gray-800"
                >
                  Category
                </label>

                <input
                  id="spare-part-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  placeholder="e.g. Die Cutting Components"
                  className="mt-2 min-h-11 w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* SEO Slug */}
              <div className="md:col-span-2">
                <label
                  htmlFor="spare-part-slug"
                  className="text-sm font-medium text-gray-800"
                >
                  SEO Slug
                </label>

                <div className="mt-2 flex gap-2">
                  <input
                    id="spare-part-slug"
                    value={slug}
                    onChange={(event) =>
                      setSlug(event.target.value)
                    }
                    required
                    placeholder="rotary-die-cutting-blade"
                    className="min-h-11 flex-1 border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />

                  <button
                    type="button"
                    onClick={handleGenerateSlug}
                    className="min-h-11 border border-gray-300 bg-white px-4 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
                  >
                    Generate
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Example: /spare-parts/
                  {slug || 'your-part-slug'}
                </p>
              </div>

              {/* Short Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="spare-part-short-description"
                  className="text-sm font-medium text-gray-800"
                >
                  Short Description
                </label>

                <textarea
                  id="spare-part-short-description"
                  value={shortDescription}
                  onChange={(event) =>
                    setShortDescription(
                      event.target.value
                    )
                  }
                  rows={3}
                  placeholder="Short technical description for cards and search results."
                  className="mt-2 w-full resize-y border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* Full Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="spare-part-description"
                  className="text-sm font-medium text-gray-800"
                >
                  Full Description
                </label>

                <textarea
                  id="spare-part-description"
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  rows={7}
                  placeholder="Detailed product and application information."
                  className="mt-2 w-full resize-y border border-gray-300 bg-white px-3 py-2.5 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

            </div>
          </section>

          {/* ========================================================== */}
          {/* MACHINE COMPATIBILITY */}
          {/* ========================================================== */}

          <section className="border-t border-gray-200 pt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Machine Compatibility
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              Add machines that this spare part is
              compatible with. Press Enter after each
              machine.
            </p>

            <div className="mt-4 flex gap-2">
              <input
                value={compatibilityInput}
                onChange={(event) =>
                  setCompatibilityInput(
                    event.target.value
                  )
                }
                onKeyDown={
                  handleCompatibilityKeyDown
                }
                placeholder="e.g. Micro Slitting Machine"
                className="min-h-11 flex-1 border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />

              <button
                type="button"
                onClick={addCompatibility}
                className="min-h-11 border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
              >
                Add
              </button>
            </div>

            {machineCompatibility.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {machineCompatibility.map(
                  (machine) => (
                    <button
                      key={machine}
                      type="button"
                      onClick={() =>
                        removeCompatibility(
                          machine
                        )
                      }
                      className="border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-800 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      {machine}

                      <span className="ml-2 text-gray-400">
                        ×
                      </span>
                    </button>
                  )
                )}
              </div>
            )}
          </section>

          {/* ========================================================== */}
          {/* TECHNICAL SPECIFICATIONS */}
          {/* ========================================================== */}

          <section className="border-t border-gray-200 pt-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                  Technical Specifications
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Add flexible technical key/value
                  specifications.
                </p>
              </div>

              <button
                type="button"
                onClick={addSpecification}
                className="min-h-11 border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
              >
                + Add Specification
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {specifications.map(
                (specification, index) => (
                  <div
                    key={index}
                    className="grid gap-3 sm:grid-cols-[1fr_1.5fr_auto]"
                  >
                    <input
                      value={specification.key}
                      onChange={(event) =>
                        updateSpecification(
                          index,
                          'key',
                          event.target.value
                        )
                      }
                      placeholder="Specification"
                      className="min-h-11 border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />

                    <input
                      value={specification.value}
                      onChange={(event) =>
                        updateSpecification(
                          index,
                          'value',
                          event.target.value
                        )
                      }
                      placeholder="Value"
                      className="min-h-11 border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeSpecification(
                          index
                        )
                      }
                      disabled={
                        specifications.length === 1
                      }
                      className="min-h-11 border border-gray-200 bg-white px-4 text-sm text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
          </section>

          {/* ========================================================== */}
          {/* IMAGES */}
          {/* ========================================================== */}

          <section className="border-t border-gray-200 pt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Product Images
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              Upload clear product or component
              photographs.
            </p>

            <div className="mt-4">
              <label
                htmlFor="spare-part-images"
                className="flex min-h-28 cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 px-6 text-center transition hover:border-orange-400 hover:bg-orange-50/30"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {isUploading
                      ? 'Uploading images...'
                      : 'Choose images'}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG or WEBP
                  </p>
                </div>

                <input
                  id="spare-part-images"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  disabled={isUploading}
                  onChange={(event) =>
                    void handleImageUpload(event)
                  }
                  className="sr-only"
                />
              </label>
            </div>

            {images.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {images.map((image) => (
                  <div
                    key={image}
                    className="group relative aspect-square overflow-hidden border border-gray-200 bg-gray-50"
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-contain p-3"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(image)
                      }
                      className="absolute right-2 top-2 min-h-11 min-w-11 bg-black/75 px-3 text-xs font-semibold text-white opacity-100 transition hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ========================================================== */}
          {/* PUBLISHING */}
          {/* ========================================================== */}

          <section className="border-t border-gray-200 pt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Publishing
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">

              <label className="flex min-h-14 cursor-pointer items-center gap-3 border border-gray-200 bg-white px-4 transition hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) =>
                    setFeatured(
                      event.target.checked
                    )
                  }
                  className="h-4 w-4 accent-orange-500"
                />

                <span>
                  <span className="block text-sm font-medium text-gray-900">
                    Featured
                  </span>

                  <span className="block text-xs text-gray-500">
                    Highlight this spare part on
                    the website.
                  </span>
                </span>
              </label>

              <label className="flex min-h-14 cursor-pointer items-center gap-3 border border-gray-200 bg-white px-4 transition hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(event) =>
                    setIsActive(
                      event.target.checked
                    )
                  }
                  className="h-4 w-4 accent-orange-500"
                />

                <span>
                  <span className="block text-sm font-medium text-gray-900">
                    Active
                  </span>

                  <span className="block text-xs text-gray-500">
                    Make this spare part visible
                    publicly.
                  </span>
                </span>
              </label>

            </div>
          </section>

        </div>

        {/* ============================================================ */}
        {/* ACTIONS */}
        {/* ============================================================ */}

        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-5 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="min-h-11 border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              isSubmitting ||
              isUploading
            }
            className="min-h-11 bg-gray-900 px-6 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? isEditing
                ? 'Updating...'
                : 'Creating...'
              : isEditing
                ? 'Update Spare Part'
                : 'Create Spare Part'}
          </button>

        </div>
      </form>
    </>
  );
}
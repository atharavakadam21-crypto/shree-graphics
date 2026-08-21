'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import type { SparePart } from '@/lib/types';

interface SparePartTableProps {
  refreshKey: number;
  onEdit: (sparePart: SparePart) => void;
}

export default function SparePartTable({
  refreshKey,
  onEdit
}: SparePartTableProps) {
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] =
    useState<string | null>(null);
  const [error, setError] = useState('');

  const loadSpareParts = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError('');

      const response = await api.get<SparePart[]>(
        '/api/spare-parts'
      );

      if (!response.data) {
        throw new Error(
          'Spare parts were not returned by the server.'
        );
      }

      setSpareParts(response.data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to load spare parts.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadSpareParts();
  }, [refreshKey]);

  const handleDelete = async (
    sparePart: SparePart
  ): Promise<void> => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${sparePart.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(sparePart.id);
      setError('');

      await api.delete(
        `/api/spare-parts/${sparePart.id}`
      );

      setSpareParts((current) =>
        current.filter(
          (item) => item.id !== sparePart.id
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to delete spare part.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="space-y-4 p-6">
          {Array.from({ length: 5 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-14 animate-pulse rounded-lg bg-gray-100"
              />
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {spareParts.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            No spare parts found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            There are currently no active spare parts
            in the database.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Spare Part
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Compatibility
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Featured
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {spareParts.map((sparePart) => (
                  <tr
                    key={sparePart.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {sparePart.images?.[0] && (
                          <img
                            src={sparePart.images[0]}
                            alt={sparePart.name}
                            className="h-14 w-14 border border-gray-200 bg-gray-50 object-contain p-1"
                          />
                        )}

                        <div>
                          <p className="font-semibold text-gray-900">
                            {sparePart.name}
                          </p>

                          {sparePart.short_description && (
                            <p className="mt-1 max-w-md truncate text-sm text-gray-500">
                              {sparePart.short_description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {sparePart.category || '—'}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex max-w-xs flex-wrap gap-1">
                        {sparePart.machine_compatibility
                          ?.slice(0, 3)
                          .map((machine) => (
                            <span
                              key={machine}
                              className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                            >
                              {machine}
                            </span>
                          ))}

                        {sparePart.machine_compatibility &&
                          sparePart.machine_compatibility
                            .length > 3 && (
                            <span className="text-xs text-gray-400">
                              +
                              {sparePart
                                .machine_compatibility
                                .length - 3}
                            </span>
                          )}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {sparePart.featured ? (
                        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          No
                        </span>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {sparePart.is_active ? (
                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(sparePart)
                        }
                        disabled={
                          deletingId ===
                          sparePart.id
                        }
                        className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void handleDelete(sparePart)
                        }
                        disabled={
                          deletingId ===
                          sparePart.id
                        }
                        className="ml-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId ===
                        sparePart.id
                          ? 'Deleting...'
                          : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 px-6 py-4">
            <p className="text-sm text-gray-500">
              Showing {spareParts.length}{' '}
              {spareParts.length === 1
                ? 'spare part'
                : 'spare parts'}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
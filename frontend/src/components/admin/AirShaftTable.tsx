'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import type { AirShaft } from '@/lib/types';

interface AirShaftTableProps {
  refreshKey: number;
  onEdit: (airShaft: AirShaft) => void;
}

export default function AirShaftTable({
  refreshKey,
  onEdit
}: AirShaftTableProps) {
  const [airShafts, setAirShafts] =
    useState<AirShaft[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] = useState('');

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const loadAirShafts = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError('');

      const response =
        await api.get<AirShaft[]>(
          '/api/airshafts'
        );

      setAirShafts(
        response.data ?? []
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to load air shafts.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadAirShafts();
  }, [refreshKey]);

  const handleDelete = async (
    airShaft: AirShaft
  ): Promise<void> => {
    const confirmed = window.confirm(
      `Delete "${airShaft.name}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(airShaft.id);
      setError('');

      await api.delete(
        `/api/airshafts/${airShaft.id}`
      );

      setAirShafts((current) =>
        current.filter(
          (item) =>
            item.id !== airShaft.id
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to delete air shaft.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
        <p className="text-sm text-gray-500">
          Loading air shafts...
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <div className="flex flex-col gap-2 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Air Shafts
          </h2>

          <p className="text-sm text-gray-500">
            {airShafts.length}{' '}
            {airShafts.length === 1
              ? 'air shaft'
              : 'air shafts'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadAirShafts()}
          className="min-h-11 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="border-b border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {airShafts.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="text-sm font-medium text-gray-700">
            No air shafts found.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Add your first air shaft using the
            button above.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Air Shaft
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Type
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Featured
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {airShafts.map((airShaft) => (
                  <tr
                    key={airShaft.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {airShaft.images[0] ? (
                            <img
                              src={
                                airShaft.images[0]
                              }
                              alt={airShaft.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[10px] text-gray-400">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900">
                            {airShaft.name}
                          </p>

                          <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                            /{airShaft.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {airShaft.type || '—'}
                    </td>

                    <td className="px-6 py-5">
                      {airShaft.featured ? (
                        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          Featured
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          —
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={
                          airShaft.is_active
                            ? 'inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700'
                            : 'inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600'
                        }
                      >
                        {airShaft.is_active
                          ? 'Active'
                          : 'Inactive'}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onEdit(airShaft)
                          }
                          className="min-h-11 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            void handleDelete(
                              airShaft
                            )
                          }
                          disabled={
                            deletingId ===
                            airShaft.id
                          }
                          className="min-h-11 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId ===
                          airShaft.id
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}

          <div className="divide-y divide-gray-100 md:hidden">
            {airShafts.map((airShaft) => (
              <div
                key={airShaft.id}
                className="p-5"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {airShaft.images[0] ? (
                      <img
                        src={airShaft.images[0]}
                        alt={airShaft.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {airShaft.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {airShaft.type || 'Type not specified'}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {airShaft.featured && (
                        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                          Featured
                        </span>
                      )}

                      <span
                        className={
                          airShaft.is_active
                            ? 'rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700'
                            : 'rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600'
                        }
                      >
                        {airShaft.is_active
                          ? 'Active'
                          : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onEdit(airShaft)
                    }
                    className="min-h-11 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      void handleDelete(
                        airShaft
                      )
                    }
                    disabled={
                      deletingId ===
                      airShaft.id
                    }
                    className="min-h-11 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 disabled:opacity-50"
                  >
                    {deletingId === airShaft.id
                      ? 'Deleting...'
                      : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
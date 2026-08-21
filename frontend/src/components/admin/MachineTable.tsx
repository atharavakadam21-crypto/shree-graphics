'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import type { Machine } from '@/lib/types';

interface MachineTableProps {
  refreshKey: number;
  onEdit: (machine: Machine) => void;
}

export default function MachineTable({
  refreshKey,
  onEdit
}: MachineTableProps) {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(
    null
  );
  const [error, setError] = useState('');

  const loadMachines = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError('');

      const response = await api.get<Machine[]>(
        '/api/machines'
      );

      if (!response.data) {
        throw new Error(
          'Machines were not returned by the server.'
        );
      }

      setMachines(response.data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to load machines.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadMachines();
  }, [refreshKey]);

  const handleDelete = async (
    machine: Machine
  ): Promise<void> => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${machine.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(machine.id);
      setError('');

      await api.delete(
        `/api/machines/${machine.id}`
      );

      setMachines((current) =>
        current.filter(
          (item) => item.id !== machine.id
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to delete machine.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="space-y-4 p-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-14 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
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

      {machines.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            No machines found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            There are currently no active machines in
            the database.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Machine
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Slug
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Featured
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Updated
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {machines.map((machine) => (
                  <tr
                    key={machine.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {machine.name}
                        </p>

                        {machine.short_description && (
                          <p className="mt-1 max-w-md truncate text-sm text-gray-500">
                            {machine.short_description}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {machine.slug}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {machine.featured ? (
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
                      {machine.is_active ? (
                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(
                        machine.updated_at
                      ).toLocaleDateString()}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => onEdit(machine)}
                        disabled={
                          deletingId === machine.id
                        }
                        className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void handleDelete(machine)
                        }
                        disabled={
                          deletingId === machine.id
                        }
                        className="ml-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === machine.id
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
              Showing {machines.length}{' '}
              {machines.length === 1
                ? 'machine'
                : 'machines'}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
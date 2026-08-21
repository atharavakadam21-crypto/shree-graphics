'use client';

import { useState } from 'react';

import MachineForm from '@/components/admin/MachineForm';
import MachineTable from '@/components/admin/MachineTable';
import type { Machine } from '@/lib/types';

export default function AdminMachinesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingMachine, setEditingMachine] =
    useState<Machine | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = (): void => {
    setEditingMachine(null);
    setShowForm(true);
  };

  const handleEdit = (machine: Machine): void => {
    setEditingMachine(machine);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCreated = (_machine: Machine): void => {
    setShowForm(false);
    setEditingMachine(null);
    setRefreshKey((current) => current + 1);
  };

  const handleUpdated = (_machine: Machine): void => {
    setShowForm(false);
    setEditingMachine(null);
    setRefreshKey((current) => current + 1);
  };

  const handleCancel = (): void => {
    setShowForm(false);
    setEditingMachine(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Admin
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Machines
            </h1>

            <p className="mt-2 text-gray-600">
              Manage the machines displayed on the
              Shree Graphics website.
            </p>
          </div>

          {!showForm && (
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Add Machine
            </button>
          )}
        </div>

        {showForm && (
          <div className="mb-8">
            <MachineForm
              machine={editingMachine}
              onCreated={handleCreated}
              onUpdated={handleUpdated}
              onCancel={handleCancel}
            />
          </div>
        )}

        <MachineTable
          refreshKey={refreshKey}
          onEdit={handleEdit}
        />
      </div>
    </main>
  );
}
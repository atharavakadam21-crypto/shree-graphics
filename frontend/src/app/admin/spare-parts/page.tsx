'use client';

import { useState } from 'react';

import SparePartForm from '@/components/admin/SparePartForm';
import SparePartTable from '@/components/admin/SparePartTable';
import type { SparePart } from '@/lib/types';

export default function AdminSparePartsPage() {
  const [showForm, setShowForm] =
    useState(false);

  const [editingSparePart, setEditingSparePart] =
    useState<SparePart | null>(null);

  const [refreshKey, setRefreshKey] =
    useState(0);

  const handleAdd = (): void => {
    setEditingSparePart(null);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleEdit = (
    sparePart: SparePart
  ): void => {
    setEditingSparePart(sparePart);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCreated = (
    _sparePart: SparePart
  ): void => {
    setShowForm(false);
    setEditingSparePart(null);
    setRefreshKey((current) => current + 1);
  };

  const handleUpdated = (
    _sparePart: SparePart
  ): void => {
    setShowForm(false);
    setEditingSparePart(null);
    setRefreshKey((current) => current + 1);
  };

  const handleCancel = (): void => {
    setShowForm(false);
    setEditingSparePart(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Admin / Machinery
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Spare Parts
            </h1>

            <p className="mt-2 max-w-2xl text-gray-600">
              Manage spare parts, components,
              compatibility and technical information
              displayed on the Shree Graphics website.
            </p>
          </div>

          {!showForm && (
            <button
              type="button"
              onClick={handleAdd}
              className="min-h-11 bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              + Add Spare Part
            </button>
          )}
        </div>

        {showForm && (
          <div className="mb-8">
            <SparePartForm
              sparePart={editingSparePart}
              onCreated={handleCreated}
              onUpdated={handleUpdated}
              onCancel={handleCancel}
            />
          </div>
        )}

        <SparePartTable
          refreshKey={refreshKey}
          onEdit={handleEdit}
        />
      </div>
    </main>
  );
}
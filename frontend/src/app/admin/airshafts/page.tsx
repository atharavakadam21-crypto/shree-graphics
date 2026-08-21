'use client';

import { useState } from 'react';

import AirShaftForm from '@/components/admin/AirShaftForm';
import AirShaftTable from '@/components/admin/AirShaftTable';
import type { AirShaft } from '@/lib/types';

export default function AdminAirShaftsPage() {
  const [showForm, setShowForm] =
    useState(false);

  const [editingAirShaft, setEditingAirShaft] =
    useState<AirShaft | null>(null);

  const [refreshKey, setRefreshKey] =
    useState(0);

  const handleAdd = (): void => {
    setEditingAirShaft(null);
    setShowForm(true);
  };

  const handleEdit = (
    airShaft: AirShaft
  ): void => {
    setEditingAirShaft(airShaft);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCreated = (
    _airShaft: AirShaft
  ): void => {
    setShowForm(false);
    setEditingAirShaft(null);
    setRefreshKey(
      (current) => current + 1
    );
  };

  const handleUpdated = (
    _airShaft: AirShaft
  ): void => {
    setShowForm(false);
    setEditingAirShaft(null);
    setRefreshKey(
      (current) => current + 1
    );
  };

  const handleCancel = (): void => {
    setShowForm(false);
    setEditingAirShaft(null);
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
              Air Shafts
            </h1>

            <p className="mt-2 text-gray-600">
              Manage the air shafts displayed on
              the Shree Graphics website.
            </p>
          </div>

          {!showForm && (
            <button
              type="button"
              onClick={handleAdd}
              className="min-h-11 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Add Air Shaft
            </button>
          )}
        </div>

        {showForm && (
          <div className="mb-8">
            <AirShaftForm
              airShaft={editingAirShaft}
              onCreated={handleCreated}
              onUpdated={handleUpdated}
              onCancel={handleCancel}
            />
          </div>
        )}

        <AirShaftTable
          refreshKey={refreshKey}
          onEdit={handleEdit}
        />
      </div>
    </main>
  );
}
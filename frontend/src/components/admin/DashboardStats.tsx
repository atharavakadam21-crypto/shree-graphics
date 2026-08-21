'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';

interface DashboardStatsResponse {
  machines: {
    total: number;
    active: number;
    featured: number;
  };
  inquiries: {
    total: number;
    new: number;
    contacted: number;
    closed: number;
  };
}

interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

function StatCard({
  title,
  value,
  description
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold text-gray-900">
        {value}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default function DashboardStats() {
  const [stats, setStats] =
    useState<DashboardStatsResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError('');

        const response =
          await api.get<DashboardStatsResponse>(
            '/api/dashboard/stats'
          );

        if (!response.data) {
          throw new Error(
            'Dashboard statistics were not returned.'
          );
        }

        setStats(response.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Unable to load dashboard statistics.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
      >
        {error}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Machines
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Machines"
            value={stats.machines.total}
            description="All machines in the database"
          />

          <StatCard
            title="Active Machines"
            value={stats.machines.active}
            description="Currently visible publicly"
          />

          <StatCard
            title="Featured Machines"
            value={stats.machines.featured}
            description="Marked as featured"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Inquiries
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Inquiries"
            value={stats.inquiries.total}
            description="All submitted inquiries"
          />

          <StatCard
            title="New"
            value={stats.inquiries.new}
            description="Awaiting follow-up"
          />

          <StatCard
            title="Contacted"
            value={stats.inquiries.contacted}
            description="Already contacted"
          />

          <StatCard
            title="Closed"
            value={stats.inquiries.closed}
            description="Completed inquiries"
          />
        </div>
      </section>
    </div>
  );
}
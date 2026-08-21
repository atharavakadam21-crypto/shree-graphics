import DashboardStats from '@/components/admin/DashboardStats';

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Overview of your Shree Graphics website.
          </p>
        </div>

        <DashboardStats />
      </div>
    </main>
  );
}
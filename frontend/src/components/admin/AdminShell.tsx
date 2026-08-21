'use client';

import {
  Menu,
  X
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import AdminSidebar from './AdminSidebar';

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({
  children
}: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  /*
   * Login should remain a clean standalone page.
   */
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-800 bg-[#090909] px-4 lg:hidden">
        <button
          type="button"
          aria-label={
            sidebarOpen
              ? 'Close navigation'
              : 'Open navigation'
          }
          onClick={() =>
            setSidebarOpen((open) => !open)
          }
          className="flex h-11 w-11 items-center justify-center border border-gray-800 text-gray-300 transition-colors hover:border-orange-500 hover:text-orange-500"
        >
          {sidebarOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>

        <div className="ml-4">
          <p className="text-xs font-bold tracking-[0.18em] text-white">
            SHREE GRAPHICS
          </p>

          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-gray-600">
            CRM / ADMIN
          </p>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)] lg:min-h-screen">
        {/* Desktop sidebar */}
        <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">
          <AdminSidebar />
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          />
        )}

        {/* Mobile sidebar */}
        <div
          className={[
            'fixed inset-y-0 left-0 z-50 transition-transform duration-200 lg:hidden',
            sidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          ].join(' ')}
        >
          <AdminSidebar
            onNavigate={() =>
              setSidebarOpen(false)
            }
          />
        </div>

        {/* Main content */}
        <main className="min-w-0 flex-1 lg:ml-[280px]">
          {children}
        </main>
      </div>
    </div>
  );
}
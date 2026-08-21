"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  ClipboardList,
  Cog,
  LayoutDashboard,
  LogOut,
  Package,
  Wrench,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
}

const mainNavigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
];

const machineryNavigation: NavItem[] = [
  {
    label: "Machines",
    href: "/admin/machines",
    icon: Cog,
  },
  {
    label: "Spare Parts",
    href: "/admin/spare-parts",
    icon: Package,
  },
  {
    label: "Airshafts",
    href: "/admin/airshafts",
    icon: Wrench,
  },
];

const customerNavigation: NavItem[] = [
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: ClipboardList,
  },
];

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export default function AdminSidebar({
  onNavigate,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string): boolean => {
    if (href === "/admin/dashboard") {
      return pathname === href;
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL ??
          "http://localhost:5000"
        }/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch {
      // Continue to login even if logout request fails.
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  const renderNavigation = (
    items: NavItem[]
  ) => {
    return (
      <div className="space-y-1">
        {items.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={[
                "group flex min-h-11 items-center justify-between border px-3 py-2.5",
                "transition-all duration-200",
                active
                  ? "border-orange-500/40 bg-orange-500/10 text-orange-500"
                  : "border-transparent text-gray-500 hover:border-gray-800 hover:bg-gray-900/50 hover:text-white",
              ].join(" ")}
            >
              <span className="flex items-center gap-3">
                <Icon
                  size={17}
                  strokeWidth={1.7}
                  className={
                    active
                      ? "text-orange-500"
                      : "text-gray-600 transition-colors group-hover:text-gray-300"
                  }
                />

                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </span>

              {active && (
                <ChevronRight
                  size={15}
                  strokeWidth={1.7}
                  className="text-orange-500"
                />
              )}
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <aside className="flex h-full w-[280px] flex-col border-r border-gray-800 bg-[#090909] text-white">

      {/* =====================================================
          BRAND
      ===================================================== */}

      <div className="border-b border-gray-800 px-5 py-6">
        <Link
          href="/admin/dashboard"
          onClick={onNavigate}
          className="group flex items-center gap-3"
        >
          {/* Logo */}
          <div className="relative h-11 w-11 shrink-0 overflow-hidden border border-[#F5820C]/60 bg-[#2E1A6B] transition-colors duration-200 group-hover:border-[#F5820C]">
            <Image
              src="/logo/sg-logo.png"
              alt="Shree Graphics"
              fill
              priority
              sizes="44px"
              className="object-contain"
            />
          </div>

          {/* Brand text */}
          <div className="min-w-0">
            <div className="whitespace-nowrap font-display text-[15px] font-black uppercase tracking-[0.14em] text-white">
              Shree Graphics
            </div>

            <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.25em] text-gray-600">
              CRM / Admin
            </div>
          </div>
        </Link>
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        {/* Overview */}

        <div className="mb-7">
          <p className="mb-3 px-3 font-mono text-[9px] uppercase tracking-[0.2em] text-gray-700">
            Overview
          </p>

          {renderNavigation(mainNavigation)}
        </div>

        {/* Machinery */}

        <div className="mb-7">
          <p className="mb-3 px-3 font-mono text-[9px] uppercase tracking-[0.2em] text-gray-700">
            Machinery
          </p>

          {renderNavigation(machineryNavigation)}
        </div>

        {/* Customer */}

        <div>
          <p className="mb-3 px-3 font-mono text-[9px] uppercase tracking-[0.2em] text-gray-700">
            Customer
          </p>

          {renderNavigation(customerNavigation)}
        </div>
      </nav>

      {/* =====================================================
          SYSTEM STATUS + LOGOUT
      ===================================================== */}

      <div className="border-t border-gray-800 px-4 py-4">

        {/* System status */}

        <div className="mb-4 border border-gray-800 bg-[#0d0d0d] p-3">

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500" />

            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-gray-500">
              System Online
            </span>
          </div>

          <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.12em] text-gray-700">
            Shree Graphics CRM
          </p>
        </div>

        {/* Logout */}

        <button
          type="button"
          onClick={() => void handleLogout()}
          className="flex min-h-11 w-full items-center gap-3 border border-transparent px-3 py-2.5 text-gray-500 transition-colors duration-200 hover:border-red-900/40 hover:bg-red-950/20 hover:text-red-400"
        >
          <LogOut
            size={17}
            strokeWidth={1.7}
          />

          <span className="text-sm font-medium">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
'use client';

import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://shree-graphics-2efz.onrender.com').replace(/\/$/, '');
interface AdminShellProps { children: React.ReactNode; }

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(pathname !== '/admin/login');

  useEffect(() => {
    if (pathname === '/admin/login') { setCheckingAuth(false); return; }
    let cancelled = false;
    const verify = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include', cache: 'no-store' });
        const body = await response.json().catch(() => null);
        if (!response.ok || !body?.success) throw new Error('Unauthorized');
        if (!cancelled) setCheckingAuth(false);
      } catch {
        if (!cancelled) router.replace('/admin/login');
      }
    };
    void verify();
    return () => { cancelled = true; };
  }, [pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;
  if (checkingAuth) return <div className="grid min-h-screen place-items-center bg-[#090909] px-6 text-center"><div><div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#F36A21]/20 border-t-[#F36A21]"/><p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">Verifying admin access</p></div></div>;

  return <div className="min-h-screen bg-gray-100"><header className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-800 bg-[#090909] px-4 lg:hidden"><button type="button" aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setSidebarOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center border border-gray-800 text-gray-300 transition-colors hover:border-orange-500 hover:text-orange-500">{sidebarOpen ? <X size={20} /> : <Menu size={20} />}</button><div className="ml-4"><p className="text-xs font-bold tracking-[0.18em] text-white">SHREE GRAPHICS</p><p className="font-mono text-[8px] uppercase tracking-[0.18em] text-gray-600">CRM / ADMIN</p></div></header><div className="flex min-h-[calc(100vh-4rem)] lg:min-h-screen"><div className="fixed inset-y-0 left-0 z-30 hidden lg:block"><AdminSidebar /></div>{sidebarOpen && <button type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/70 lg:hidden"/>}<div className={['fixed inset-y-0 left-0 z-50 transition-transform duration-200 lg:hidden', sidebarOpen ? 'translate-x-0' : '-translate-x-full'].join(' ')}><AdminSidebar onNavigate={() => setSidebarOpen(false)} /></div><main className="min-w-0 flex-1 lg:ml-[280px]">{children}</main></div></div>;
}

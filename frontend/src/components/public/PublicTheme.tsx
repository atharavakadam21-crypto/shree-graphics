"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function PublicTheme({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return <div className={isAdmin ? "" : "sg-public-theme"}>{children}</div>;
}

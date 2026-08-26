import type { MetadataRoute } from "next";
import type { Machine } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://shreegraphicsltd.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages = ["", "/about", "/products", "/airshafts", "/services", "/spare-parts", "/gallery", "/contact"].map((path) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: "weekly" as const, priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7 }));
  try {
    const response = await fetch(`${API_URL}/api/machines`, { next: { revalidate: 3600 } });
    const result = await response.json() as { success?: boolean; data?: Machine[] };
    if (!response.ok || !result.success || !Array.isArray(result.data)) return staticPages;
    return [...staticPages, ...result.data.filter((machine) => machine.slug && machine.is_active !== false).map((machine) => ({ url: `${SITE_URL}/products/${machine.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 }))];
  } catch { return staticPages; }
}

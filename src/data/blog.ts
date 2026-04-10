import { fetcher } from "@/lib/fetcher";

export interface ApiBlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ApiBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  category: ApiBlogCategory | null;
  tags: string[];
  author_name: string;
  is_featured: boolean;
  reading_time_minutes: number;
  views_count: number;
  published_at: string;
}

export interface ApiBlogDetail extends ApiBlogPost {
  content: string; // HTML body
}

export interface ApiBlogListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiBlogPost[];
}

export const PAGE_SIZE = 9;

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function getBlogs(params?: {
  page?: number;
  search?: string;
  category?: string; // category__slug
}): Promise<ApiBlogListResponse> {
  const q = new URLSearchParams();
  if (params?.page && params.page > 1) q.set("page", String(params.page));
  if (params?.search) q.set("search", params.search);
  if (params?.category) q.set("category__slug", params.category);
  const qs = q.toString();
  return fetcher(`/blog/${qs ? `?${qs}` : ""}`);
}

export async function getBlogPost(slug: string): Promise<ApiBlogDetail | null> {
  try {
    return await fetcher(`/blog/${slug}/`);
  } catch {
    return null;
  }
}

"use client";

import { useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { ApiBlogPost, ApiBlogCategory } from "@/data/blog";
import { formatDate } from "@/data/blog";

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

interface Props {
  posts: ApiBlogPost[];
  categories: ApiBlogCategory[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  currentSearch: string;
  currentCategory: string;
  readLabel: string;
  readTimeLabel: string;
}

export function BlogList({
  posts,
  categories,
  currentPage,
  totalPages,
  currentSearch,
  currentCategory,
  readLabel,
  readTimeLabel,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build a URL preserving existing params, overriding the given ones
  const buildUrl = useCallback(
    (overrides: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, val] of Object.entries(overrides)) {
        if (val) {
          params.set(key, val);
        } else {
          params.delete(key);
        }
      }
      const qs = params.toString();
      return `/blog${qs ? `?${qs}` : ""}`;
    },
    [searchParams],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        router.push(buildUrl({ search: value || undefined, page: undefined }));
      }, 400);
    },
    [router, buildUrl],
  );

  const handleCategoryClick = useCallback(
    (slug: string) => {
      router.push(buildUrl({ category: slug || undefined, page: undefined }));
    },
    [router, buildUrl],
  );

  const featured = posts.filter((p) => p.is_featured);
  const rest = posts.filter((p) => !p.is_featured);

  return (
    <>
      {/* ── Search + filters ────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            defaultValue={currentSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#004E34] focus:ring-2 focus:ring-[#004E34]/10"
          />
        </div>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryClick("")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                !currentCategory
                  ? "bg-[#004E34] text-white"
                  : "border border-gray-200 text-gray-500 hover:border-[#004E34] hover:text-[#004E34]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  currentCategory === cat.slug
                    ? "bg-[#004E34] text-white"
                    : "border border-gray-200 text-gray-500 hover:border-[#004E34] hover:text-[#004E34]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 text-[#6F7A72]">
          <p className="text-lg font-medium">No articles found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {/* ── Featured cards ───────────────────────── */}
      {featured.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {featured.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              readLabel={readLabel}
              readTimeLabel={readTimeLabel}
              large
            />
          ))}
        </div>
      )}

      {/* ── Rest of posts ────────────────────────── */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              readLabel={readLabel}
              readTimeLabel={readTimeLabel}
            />
          ))}
        </div>
      )}

      {/* ── Pagination ───────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <PaginationLink
            href={buildUrl({ page: String(currentPage - 1) })}
            disabled={currentPage <= 1}
            direction="prev"
          />
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={buildUrl({ page: n === 1 ? undefined : String(n) })}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  n === currentPage
                    ? "bg-[#004E34] text-white"
                    : "border border-gray-200 text-[#6F7A72] hover:border-[#004E34] hover:text-[#004E34]"
                }`}
              >
                {n}
              </Link>
            ))}
          </div>
          <PaginationLink
            href={buildUrl({ page: String(currentPage + 1) })}
            disabled={currentPage >= totalPages}
            direction="next"
          />
        </div>
      )}
    </>
  );
}

function PaginationLink({
  href,
  disabled,
  direction,
}: {
  href: string;
  disabled: boolean;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={href}
      aria-disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
        disabled
          ? "pointer-events-none border-gray-100 text-gray-300"
          : "border-gray-200 text-[#1F2937] hover:border-[#004E34] hover:text-[#004E34]"
      }`}
    >
      {isPrev && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      )}
      {isPrev ? "Previous" : "Next"}
      {!isPrev && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )}
    </Link>
  );
}

const COVER_COLORS = [
  "bg-[#004E34]",
  "bg-[#0f2235]",
  "bg-[#1a3a2a]",
  "bg-[#2d1f4e]",
  "bg-[#7c3d1a]",
  "bg-[#1e3a5f]",
];

function BlogCard({
  post,
  readLabel,
  readTimeLabel,
  large = false,
}: {
  post: ApiBlogPost;
  readLabel: string;
  readTimeLabel: string;
  large?: boolean;
}) {
  const fallbackColor =
    COVER_COLORS[post.id % COVER_COLORS.length] ?? "bg-[#004E34]";
  const initials = post.author_name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#004E34]/20 transition-all"
    >
      {/* Cover */}
      <div className={`${large ? "h-48" : "h-36"} overflow-hidden relative`}>
        {post.featured_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featured_image}
            alt={post.featured_image_alt ?? post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className={`${fallbackColor} w-full h-full`} />
        )}
        {post.category && (
          <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/90 text-[#004E34]">
            {post.category.name}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3
          className={`font-bold text-[#1F2937] group-hover:text-[#004E34] transition-colors leading-snug ${large ? "text-lg" : "text-sm"}`}
        >
          {post.title}
        </h3>
        <p className="text-xs text-[#6F7A72] leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#004E34]/10 flex items-center justify-center text-[9px] font-bold text-[#004E34]">
              {initials}
            </div>
            <span className="text-xs text-[#6F7A72]">{post.author_name}</span>
          </div>
          <div className="flex items-center gap-1 text-[#94A3B8]">
            <ClockIcon />
            <span className="text-[11px]">
              {post.reading_time_minutes} {readTimeLabel}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#94A3B8]">
            {formatDate(post.published_at)}
          </span>
          <span className="text-xs font-semibold text-[#004E34] group-hover:gap-1.5 flex items-center gap-1 transition-all">
            {readLabel}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

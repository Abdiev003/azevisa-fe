"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPost, BlogCategory } from "@/data/blog";
import { CATEGORIES, formatDate } from "@/data/blog";

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  "Travel Tips": "bg-emerald-50 text-emerald-700",
  "Visa Guide": "bg-sky-50 text-sky-700",
  News: "bg-amber-50 text-amber-700",
  Azerbaijan: "bg-purple-50 text-purple-700",
  FAQ: "bg-rose-50 text-rose-700",
};

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
  posts: BlogPost[];
  readLabel: string;
  readTimeLabel: string;
}

export function BlogList({ posts, readLabel, readTimeLabel }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">(
    "All",
  );

  const filtered = useMemo(
    () =>
      posts.filter((p) => {
        if (activeCategory !== "All" && p.category !== activeCategory)
          return false;
        if (
          search &&
          !p.title.toLowerCase().includes(search.toLowerCase()) &&
          !p.excerpt.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        return true;
      }),
    [posts, search, activeCategory],
  );

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#004E34] focus:ring-2 focus:ring-[#004E34]/10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-[#004E34] text-white"
                  : "border border-gray-200 text-gray-500 hover:border-[#004E34] hover:text-[#004E34]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
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
    </>
  );
}

function BlogCard({
  post,
  readLabel,
  readTimeLabel,
  large = false,
}: {
  post: BlogPost;
  readLabel: string;
  readTimeLabel: string;
  large?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#004E34]/20 transition-all"
    >
      {/* Cover */}
      <div
        className={`${post.coverColor} ${large ? "h-48" : "h-36"} flex items-end p-4`}
      >
        <span
          className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category]}`}
        >
          {post.category}
        </span>
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
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="text-xs text-[#6F7A72]">{post.author}</span>
          </div>
          <div className="flex items-center gap-1 text-[#94A3B8]">
            <ClockIcon />
            <span className="text-[11px]">
              {post.readTime} {readTimeLabel}
            </span>
          </div>
        </div>

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
    </Link>
  );
}

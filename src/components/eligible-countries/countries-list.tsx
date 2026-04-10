"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { CountryItem, Region } from "@/data/general";
import { SearchIcon } from "@/components/icons";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const PURPOSE_STYLES: Record<string, string> = {
  Tourism: "bg-emerald-50 text-emerald-700",
  Business: "bg-sky-50 text-sky-700",
  Transit: "bg-amber-50 text-amber-600",
};

interface Props {
  countries: CountryItem[];
  regions: Region[];
  totalPages: number;
  currentPage: number;
  currentSearch: string;
  currentRegion: string;
}

export function CountriesList({
  countries,
  regions,
  totalPages,
  currentPage,
  currentSearch,
  currentRegion,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

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
      return `/eligible-countries${qs ? `?${qs}` : ""}`;
    },
    [searchParams],
  );

  const handleSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setActiveLetter(null);
        router.push(buildUrl({ search: value || undefined, page: undefined }));
      }, 400);
    },
    [router, buildUrl],
  );

  const handleRegion = useCallback(
    (slug: string) => {
      setActiveLetter(null);
      router.push(buildUrl({ region: slug || undefined, page: undefined }));
    },
    [router, buildUrl],
  );

  // A-Z filter is client-side on the current page's results
  const filtered = useMemo(() => {
    if (!activeLetter) return countries;
    return countries.filter((c) =>
      c.name.toUpperCase().startsWith(activeLetter),
    );
  }, [countries, activeLetter]);

  const availableLetters = useMemo(
    () => new Set(countries.map((c) => c.name[0]?.toUpperCase())),
    [countries],
  );

  return (
    <>
      {/* Search bar */}
      <div className="flex justify-center px-4 mb-10">
        <div className="relative w-full max-w-lg">
          <span className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2">
            <SearchIcon />
          </span>
          <input
            type="text"
            defaultValue={currentSearch}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search your country..."
            className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#004E34] focus:ring-2 focus:ring-[#004E34]/10 shadow-sm"
          />
        </div>
      </div>

      {/* Region tabs + A-Z sidebar */}
      <div className="max-w-6xl px-4 pb-16 mx-auto lg:px-8">
        <div className="flex gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Region tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => handleRegion("")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !currentRegion
                    ? "bg-[#004E34] text-white"
                    : "border border-gray-200 text-gray-600 hover:border-[#004E34] hover:text-[#004E34]"
                }`}
              >
                All
              </button>
              {regions
                .sort((a, b) => a.order - b.order)
                .map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleRegion(r.slug)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      currentRegion === r.slug
                        ? "bg-[#004E34] text-white"
                        : "border border-gray-200 text-gray-600 hover:border-[#004E34] hover:text-[#004E34]"
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((country) => (
                  <div
                    key={country.id}
                    className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#004E34]/20 transition-all cursor-default"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl leading-none select-none">
                        {country.flag_emoji}
                      </span>
                      <span className="font-semibold text-[#1F2937]">
                        {country.name}
                      </span>
                    </div>
                    {country.available_purposes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {country.available_purposes.map((purpose) => (
                          <span
                            key={purpose}
                            className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${PURPOSE_STYLES[purpose] ?? "bg-gray-100 text-gray-600"}`}
                          >
                            {purpose}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-[#6F7A72]">
                <p className="text-lg font-medium">No countries found</p>
                <p className="mt-1 text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <PaginationLink
                  href={buildUrl({ page: String(currentPage - 1) })}
                  disabled={currentPage <= 1}
                  direction="prev"
                />
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => (
                      <Link
                        key={n}
                        href={buildUrl({
                          page: n === 1 ? undefined : String(n),
                        })}
                        onClick={() => setActiveLetter(null)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                          n === currentPage
                            ? "bg-[#004E34] text-white"
                            : "border border-gray-200 text-[#6F7A72] hover:border-[#004E34] hover:text-[#004E34]"
                        }`}
                      >
                        {n}
                      </Link>
                    ),
                  )}
                </div>
                <PaginationLink
                  href={buildUrl({ page: String(currentPage + 1) })}
                  disabled={currentPage >= totalPages}
                  direction="next"
                />
              </div>
            )}
          </div>

          {/* A-Z Sidebar */}
          <div className="sticky flex-col items-center self-start hidden gap-px lg:flex top-24">
            {ALPHABET.map((letter) => {
              const available = availableLetters.has(letter);
              const active = activeLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() =>
                    available &&
                    setActiveLetter((prev) => (prev === letter ? null : letter))
                  }
                  disabled={!available}
                  className={`w-5 h-5 text-[11px] font-semibold flex items-center justify-center rounded transition-colors ${
                    active
                      ? "bg-[#004E34] text-white rounded-sm"
                      : available
                        ? "text-[#004E34] hover:bg-[#004E34]/10"
                        : "text-gray-300 cursor-default"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>
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

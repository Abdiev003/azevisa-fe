"use client";

import { useMemo, useState } from "react";
import { COUNTRIES, type Region } from "@/data/countries";

type RegionFilter = Region | "All";

const REGIONS: RegionFilter[] = [
  "All",
  "Europe",
  "Asia",
  "Americas",
  "Africa",
  "Oceania",
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const PAGE_SIZE = 9;

const VISA_STYLES: Record<string, string> = {
  Tourism: "bg-emerald-50 text-emerald-700",
  Business: "bg-sky-50 text-sky-700",
  Transit: "bg-amber-50 text-amber-600",
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

export function CountriesList() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<RegionFilter>("All");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () =>
      COUNTRIES.filter((c) => {
        if (region !== "All" && c.region !== region) return false;
        if (activeLetter && !c.name.toUpperCase().startsWith(activeLetter))
          return false;
        if (search && !c.name.toLowerCase().includes(search.toLowerCase()))
          return false;
        return true;
      }).sort((a, b) => a.name.localeCompare(b.name)),
    [search, region, activeLetter],
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const availableLetters = useMemo(
    () =>
      new Set(
        COUNTRIES.filter((c) => {
          if (region !== "All" && c.region !== region) return false;
          if (search && !c.name.toLowerCase().includes(search.toLowerCase()))
            return false;
          return true;
        }).map((c) => c.name[0].toUpperCase()),
      ),
    [region, search],
  );

  function handleRegionChange(r: RegionFilter) {
    setRegion(r);
    setActiveLetter(null);
    setVisibleCount(PAGE_SIZE);
  }

  function handleLetterClick(l: string) {
    setActiveLetter((prev) => (prev === l ? null : l));
    setVisibleCount(PAGE_SIZE);
  }

  function handleSearch(q: string) {
    setSearch(q);
    setActiveLetter(null);
    setVisibleCount(PAGE_SIZE);
  }

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
            value={search}
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
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => handleRegionChange(r)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    region === r
                      ? "bg-[#004E34] text-white"
                      : "border border-gray-200 text-gray-600 hover:border-[#004E34] hover:text-[#004E34]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Grid */}
            {visible.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((country) => (
                  <div
                    key={country.id}
                    className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#004E34]/20 transition-all cursor-default"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl leading-none select-none">
                        {country.flag}
                      </span>
                      <span className="font-semibold text-[#1F2937]">
                        {country.name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {country.visaTypes.map((type) => (
                        <span
                          key={type}
                          className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${VISA_STYLES[type]}`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
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

            {/* Show More */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                  className="px-8 py-2.5 border border-[#004E34] text-[#004E34] text-sm font-medium rounded-lg hover:bg-[#004E34] hover:text-white transition-colors"
                >
                  Show More Countries
                </button>
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
                  onClick={() => available && handleLetterClick(letter)}
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

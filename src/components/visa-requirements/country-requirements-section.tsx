"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { type RequirementsTabsLabels } from "./requirements-tabs";

const PURPOSE_COLORS: Record<string, { bg: string; accent: string }> = {
  tourism: { bg: "bg-[#004E34]", accent: "border-[#004E34] text-[#004E34]" },
  business: { bg: "bg-[#1e3a5f]", accent: "border-[#1e3a5f] text-[#1e3a5f]" },
  transit: { bg: "bg-amber-700", accent: "border-amber-700 text-amber-700" },
  student: { bg: "bg-purple-700", accent: "border-purple-700 text-purple-700" },
  work: { bg: "bg-rose-700", accent: "border-rose-700 text-rose-700" },
};

const DEFAULT_COLORS = { bg: "bg-gray-700", accent: "border-gray-700 text-gray-700" };

interface Country {
  id: number;
  name: string;
  slug: string;
  flag_emoji: string;
}

interface VisaRequirement {
  id: number;
  visa_purpose: {
    id: number;
    name: string;
    slug: string;
    purpose_type: string;
    icon: string;
  };
  title: string;
  description: string;
  documents_required: string;
  additional_notes: string;
}

export default function CountryRequirementsSection({
  labels,
}: {
  labels: RequirementsTabsLabels;
}) {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [requirements, setRequirements] = useState<VisaRequirement[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingReqs, setLoadingReqs] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // Preselect first country on mount
  useEffect(() => {
    fetch(`${BASE_URL}/countries/?page_size=1`)
      .then((r) => r.json())
      .then((data) => {
        const first: Country | undefined = data.results?.[0];
        if (!first) { setLoadingReqs(false); return; }
        setSelectedCountry(first);
        setSearch(first.name);
        return fetch(`${BASE_URL}/countries/visa-requirements/?country=${first.slug}`)
          .then((r) => r.json())
          .then((reqs: VisaRequirement[]) => {
            setRequirements(reqs);
            if (reqs.length > 0) setActiveTab(reqs[0].visa_purpose.slug);
          });
      })
      .catch(() => {})
      .finally(() => setLoadingReqs(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!search || selectedCountry) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoadingCountries(true);
      try {
        const res = await fetch(
          `${BASE_URL}/countries/?search=${encodeURIComponent(search)}&page_size=8`,
        );
        const data = await res.json();
        setCountries(data.results ?? []);
        setShowDropdown(true);
      } catch {
        setCountries([]);
      } finally {
        setLoadingCountries(false);
      }
    }, 300);
  }, [search, selectedCountry, BASE_URL]);

  useEffect(() => {
    if (!selectedCountry) return;
    setLoadingReqs(true);
    fetch(`${BASE_URL}/countries/visa-requirements/?country=${selectedCountry.slug}`)
      .then((r) => r.json())
      .then((data: VisaRequirement[]) => {
        setRequirements(data);
        if (data.length > 0) setActiveTab(data[0].visa_purpose.slug);
      })
      .catch(() => setRequirements([]))
      .finally(() => setLoadingReqs(false));
  }, [selectedCountry, BASE_URL]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function selectCountry(c: Country) {
    setSelectedCountry(c);
    setSearch(c.name);
    setShowDropdown(false);
    setRequirements([]);
    setActiveTab("");
  }

  function clearCountry() {
    setSelectedCountry(null);
    setSearch("");
    setRequirements([]);
    setActiveTab("");
    setCountries([]);
  }

  const activeReq = requirements.find((r) => r.visa_purpose.slug === activeTab);
  const colors =
    activeReq
      ? (PURPOSE_COLORS[activeReq.visa_purpose.purpose_type] ?? DEFAULT_COLORS)
      : DEFAULT_COLORS;

  return (
    <div>
      {/* Country selector */}
      <div className="mb-8" ref={dropdownRef}>
        <label className="block text-sm font-semibold text-[#1F2937] mb-2">
          Filter by your nationality
        </label>
        <div className="relative max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (selectedCountry) setSelectedCountry(null);
            }}
            onFocus={() => {
              if (countries.length > 0 && !selectedCountry) setShowDropdown(true);
            }}
            placeholder="Search your country…"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#004E34]/30 focus:border-[#004E34] pr-10"
          />
          {selectedCountry && (
            <button
              onClick={clearCountry}
              aria-label="Clear country"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm leading-none"
            >
              ✕
            </button>
          )}
          {loadingCountries && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[#004E34]/30 border-t-[#004E34] rounded-full animate-spin" />
          )}
          {showDropdown && countries.length > 0 && (
            <div className="absolute z-20 top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              {countries.map((c) => (
                <button
                  key={c.id}
                  onClick={() => selectCountry(c)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 text-left"
                >
                  <span className="text-lg">{c.flag_emoji}</span>
                  <span className="text-[#1F2937]">{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {selectedCountry && (
          <p className="mt-2 text-xs text-[#6F7A72]">
            Showing requirements for{" "}
            <span className="font-semibold text-[#1F2937]">
              {selectedCountry.flag_emoji} {selectedCountry.name}
            </span>
          </p>
        )}
      </div>

      {/* Loading */}
      {loadingReqs && (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#004E34]/30 border-t-[#004E34] rounded-full animate-spin" />
        </div>
      )}

      {/* No requirements found */}
      {!loadingReqs && selectedCountry && requirements.length === 0 && (
        <div className="text-center py-12 text-[#6F7A72] text-sm">
          No specific visa requirements found for{" "}
          <span className="font-semibold text-[#1F2937]">{selectedCountry.name}</span>.
          <br />
          Please refer to the general requirements listed above.
        </div>
      )}

      {/* Dynamic requirements from API */}
      {!loadingReqs && requirements.length > 0 && (
        <>
          <div className="flex gap-2 flex-wrap mb-8">
            {requirements.map((req) => {
              const c = PURPOSE_COLORS[req.visa_purpose.purpose_type] ?? DEFAULT_COLORS;
              const isActive = activeTab === req.visa_purpose.slug;
              return (
                <button
                  key={req.visa_purpose.slug}
                  onClick={() => setActiveTab(req.visa_purpose.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all cursor-pointer ${
                    isActive
                      ? `${c.accent} bg-white border-current shadow-sm`
                      : "border-gray-200 text-[#6F7A72] hover:border-gray-300 hover:text-[#1F2937]"
                  }`}
                >
                  {req.visa_purpose.name}
                </button>
              );
            })}
          </div>

          {activeReq && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className={`${colors.bg} rounded-2xl p-6 text-white`}>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
                    Selected Category
                  </p>
                  <h3 className="text-xl font-extrabold mb-2">{activeReq.visa_purpose.name}</h3>
                  {activeReq.description && (
                    <p className="text-white/70 text-sm leading-relaxed">{activeReq.description}</p>
                  )}
                </div>

                <Link
                  href="/apply"
                  className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 ${colors.bg}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  {labels.applyNow} — {activeReq.visa_purpose.name}
                </Link>
              </div>

              {/* Right — requirements list */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <p className="text-xs font-bold text-[#6F7A72] uppercase tracking-widest mb-5">
                  {labels.note}s
                </p>
                <ul className="flex flex-col gap-4">
                  {activeReq.documents_required
                    .split("\n")
                    .filter(Boolean)
                    .map((doc, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-[11px] font-bold ${colors.bg}`}
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm text-[#1F2937] leading-relaxed">{doc}</span>
                      </li>
                    ))}
                </ul>
                {activeReq.additional_notes && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">
                      Note
                    </p>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      {activeReq.additional_notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
}

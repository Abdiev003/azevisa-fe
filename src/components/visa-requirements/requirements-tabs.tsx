"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                                 */
/* ------------------------------------------------------------------ */

interface VisaTab {
  id: string;
  name: string;
  badge?: string;
  color: string;
  accent: string;
  details: { validity: string; maxStay: string; entries: string; fee: string };
  requirements: string[];
  applyHref: string;
}

const TABS: VisaTab[] = [
  {
    id: "tourism",
    name: "Tourism eVisa",
    badge: "Most Popular",
    color: "bg-[#004E34]",
    accent: "border-[#004E34] text-[#004E34]",
    details: {
      validity: "90 Days",
      maxStay: "30 Days",
      entries: "Single Entry",
      fee: "From $20",
    },
    requirements: [
      "Valid passport with 6+ months validity",
      "Digital passport photo (3.5×4.5 cm, white background)",
      "Confirmed hotel booking or proof of accommodation",
      "Return or onward flight ticket",
      "Valid email address",
      "Credit or debit card for payment",
    ],
    applyHref: "/apply",
  },
  {
    id: "business",
    name: "Business eVisa",
    color: "bg-[#1e3a5f]",
    accent: "border-[#1e3a5f] text-[#1e3a5f]",
    details: {
      validity: "90 Days",
      maxStay: "30 Days",
      entries: "Multiple Entry",
      fee: "From $30",
    },
    requirements: [
      "Valid passport with 6+ months validity",
      "Digital passport photo (3.5×4.5 cm, white background)",
      "Official business invitation letter from an Azerbaijani company",
      "Company registration documents",
      "Proof of business activities (conference ticket, contract, etc.)",
      "Return or onward flight ticket",
    ],
    applyHref: "/apply",
  },
  {
    id: "transit",
    name: "Transit eVisa",
    color: "bg-amber-700",
    accent: "border-amber-700 text-amber-700",
    details: {
      validity: "30 Days",
      maxStay: "5 Days",
      entries: "Single Entry",
      fee: "From $15",
    },
    requirements: [
      "Valid passport with 6+ months validity",
      "Digital passport photo (3.5×4.5 cm, white background)",
      "Onward journey ticket to final destination",
      "Visa or authorization for destination country (if required)",
      "Proof of transit necessity",
    ],
    applyHref: "/apply",
  },
  {
    id: "student",
    name: "Student eVisa",
    color: "bg-purple-700",
    accent: "border-purple-700 text-purple-700",
    details: {
      validity: "Program Length",
      maxStay: "90+ Days",
      entries: "Multiple Entry",
      fee: "Standard Fee",
    },
    requirements: [
      "Valid passport with 6+ months validity",
      "Digital passport photo (3.5×4.5 cm, white background)",
      "Acceptance letter from an accredited Azerbaijani university or institution",
      "Proof of tuition payment or scholarship letter",
      "Proof of financial means (bank statement)",
      "Health insurance valid in Azerbaijan",
    ],
    applyHref: "/apply",
  },
  {
    id: "work",
    name: "Work Permit",
    color: "bg-rose-700",
    accent: "border-rose-700 text-rose-700",
    details: {
      validity: "1 Year (Renewable)",
      maxStay: "Contract Length",
      entries: "Multiple Entry",
      fee: "Processing Fee",
    },
    requirements: [
      "Valid passport with 6+ months validity",
      "Digital passport photo (3.5×4.5 cm, white background)",
      "Employment contract signed by an Azerbaijani employer",
      "Employer's registration and tax documents",
      "Educational diplomas and professional certificates",
      "Medical certificate confirming fitness to work",
      "Criminal background check from your home country",
    ],
    applyHref: "/apply",
  },
];

/* ------------------------------------------------------------------ */
/*  Detail row component                                                 */
/* ------------------------------------------------------------------ */

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-xs font-semibold text-[#6F7A72] uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-semibold text-[#1F2937]">{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Props                                                                */
/* ------------------------------------------------------------------ */

export interface RequirementsTabsLabels {
  note: string;
  applyNow: string;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                       */
/* ------------------------------------------------------------------ */

export default function RequirementsTabs({
  labels,
}: {
  labels: RequirementsTabsLabels;
}) {
  const [activeId, setActiveId] = useState<string>("tourism");
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];

  return (
    <div>
      {/* Tab strip */}
      <div className="flex gap-2 flex-wrap mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            className={`relative px-4 py-2 rounded-full text-sm font-semibold border transition-all cursor-pointer ${
              activeId === tab.id
                ? `${tab.accent} bg-white border-current shadow-sm`
                : "border-gray-200 text-[#6F7A72] hover:border-gray-300 hover:text-[#1F2937]"
            }`}
          >
            {tab.name}
            {tab.badge && (
              <span className="ml-2 text-[10px] font-bold tracking-wider bg-[#004E34] text-white rounded-full px-2 py-0.5 align-middle">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left — color header + details */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Color card */}
          <div className={`${active.color} rounded-2xl p-6 text-white`}>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
              Selected Category
            </p>
            <h3 className="text-xl font-extrabold mb-3">{active.name}</h3>
            <div className="flex flex-wrap gap-2">
              {active.badge && (
                <span className="text-[10px] font-bold tracking-wider bg-white/20 rounded-full px-3 py-1">
                  {active.badge}
                </span>
              )}
            </div>
          </div>

          {/* Details card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <DetailRow label="Validity" value={active.details.validity} />
            <DetailRow label="Max Stay" value={active.details.maxStay} />
            <DetailRow label="Entry Type" value={active.details.entries} />
            <DetailRow label="Starting Fee" value={active.details.fee} />
          </div>

          {/* Apply button */}
          <Link
            href={active.applyHref}
            className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 ${active.color}`}
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
            {labels.applyNow} — {active.name}
          </Link>
        </div>

        {/* Right — requirements checklist */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs font-bold text-[#6F7A72] uppercase tracking-widest mb-5">
            {labels.note}s
          </p>
          <ul className="flex flex-col gap-4">
            {active.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-[11px] font-bold ${active.color}`}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-[#1F2937] leading-relaxed">
                  {req}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

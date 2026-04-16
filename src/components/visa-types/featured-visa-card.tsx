import Image from "next/image";
import Link from "next/link";
import type { FeaturedVisa } from "@/data/visa-types";
import { KeyIcon, ListIcon, CircleCheckIcon } from "@/components/icons";

export interface CardLabels {
  keyDetails: string;
  requirementsTitle: string;
  processingFees: string;
  validity: string;
  maxStay: string;
  entryType: string;
}

interface Props {
  visa: FeaturedVisa;
  labels: CardLabels;
}

export function FeaturedVisaCard({ visa, labels }: Props) {
  return (
    <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl lg:flex-row">
      {/* ── Image panel ─────────────────────────────── */}
      <div
        className={`relative w-full lg:w-55 xl:w-65 shrink-0 min-h-56 lg:min-h-0 ${visa.imageBg}`}
      >
        {visa.image && (
          <Image
            src={visa.image}
            alt={visa.name}
            fill
            className="object-cover"
          />
        )}
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* badge */}
        {visa.badge && (
          <span className="absolute top-3 left-3 bg-[#92400E] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {visa.badge}
          </span>
        )}

        {/* title at bottom */}
        <p className="absolute text-lg font-bold leading-tight text-white bottom-4 left-4">
          {visa.name}
        </p>
      </div>

      {/* ── Content ─────────────────────────────────── */}
      <div className="flex flex-col flex-1 gap-5 p-6 lg:p-8">
        {/* Description */}
        <p className="text-[#6F7A72] text-sm leading-relaxed">
          {visa.description}
        </p>

        {/* Key Details + Requirements */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Key Details */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <KeyIcon />
              <span className="text-xs font-bold text-[#92400E] uppercase tracking-wide">
                {labels.keyDetails}
              </span>
            </div>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-0.5 text-[#6F7A72] pr-4">
                    {labels.validity}
                  </td>
                  <td className="py-0.5 font-semibold text-[#1F2937] text-right">
                    {visa.details.validity}
                  </td>
                </tr>
                <tr>
                  <td className="py-0.5 text-[#6F7A72] pr-4">
                    {labels.maxStay}
                  </td>
                  <td className="py-0.5 font-semibold text-[#1F2937] text-right">
                    {visa.details.maxStay}
                  </td>
                </tr>
                <tr>
                  <td className="py-0.5 text-[#6F7A72] pr-4">
                    {labels.entryType}
                  </td>
                  <td className="py-0.5 font-semibold text-[#1F2937] text-right">
                    {visa.details.entryType}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Requirements */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <ListIcon />
              <span className="text-xs font-bold text-[#004E34] uppercase tracking-wide">
                {labels.requirementsTitle}
              </span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {visa.requirements.map((req) => (
                <li
                  key={req}
                  className="flex items-start gap-2 text-sm text-[#6F7A72]"
                >
                  <span className="text-[#004E34] mt-0.5 shrink-0">
                    <CircleCheckIcon />
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Processing & Fees */}
        <div className="overflow-hidden border border-gray-100 rounded-xl">
          <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-semibold text-[#1F2937] uppercase tracking-wide">
              {labels.processingFees}
            </p>
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            {visa.fees.map((tier) => (
              <div
                key={tier.label}
                className={`flex flex-col items-center justify-center py-4 px-2 ${
                  tier.highlighted
                    ? "bg-[#004E34] text-white"
                    : "bg-white text-[#1F2937]"
                }`}
              >
                <span
                  className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${
                    tier.highlighted ? "text-white/70" : "text-[#94A3B8]"
                  }`}
                >
                  {tier.label}
                </span>
                <span className="text-2xl font-bold">{tier.price}</span>
                <span
                  className={`text-[11px] mt-0.5 ${
                    tier.highlighted ? "text-white/70" : "text-[#94A3B8]"
                  }`}
                >
                  {tier.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Apply button */}
        <Link
          href="#"
          className="w-full py-3 bg-[#004E34] text-white text-sm font-semibold rounded-lg hover:bg-[#003322] transition-colors flex items-center justify-center"
        >
          {visa.applyLabel}
        </Link>
      </div>
    </div>
  );
}

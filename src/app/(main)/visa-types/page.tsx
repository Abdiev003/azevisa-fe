import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  FEATURED_VISAS,
  SECONDARY_VISAS,
  COMPARISON_ROWS,
} from "@/data/visa-types";
import { FeaturedVisaCard } from "@/components/visa-types/featured-visa-card";

export const metadata: Metadata = {
  title: "Azerbaijan eVisa Types & Fees – Tourist, Business, Transit",
  description:
    "Compare all Azerbaijan eVisa types: tourist, business and transit. View fees, validity periods, processing times and entry requirements. Apply online today.",
  keywords: [
    "Azerbaijan visa types",
    "Azerbaijan tourist visa",
    "Azerbaijan business visa",
    "Azerbaijan transit visa",
    "ASAN Visa fees",
    "eVisa processing time",
  ],
  alternates: { canonical: "/visa-types" },
  openGraph: {
    url: "/visa-types",
    title: "Azerbaijan eVisa Types & Fees – Tourist, Business, Transit",
    description:
      "Compare all Azerbaijan eVisa types — tourist, business and transit. View fees, validity and processing times.",
  },
  twitter: {
    title: "Azerbaijan eVisa Types & Fees – Tourist, Business, Transit",
    description:
      "Compare all Azerbaijan eVisa types — tourist, business and transit. View fees, validity and processing times.",
  },
};

export default async function VisaTypesPage() {
  const t = await getTranslations("VisaTypes");

  /* ── Card internal labels ─────────────────────── */
  const cardLabels = {
    keyDetails: t("card.keyDetails"),
    requirementsTitle: t("card.requirements"),
    processingFees: t("card.processingFees"),
    validity: t("card.validity"),
    maxStay: t("card.maxStay"),
    entryType: t("card.entryType"),
  };

  /* ── Translated featured visas ───────────────── */
  const [tourismMock, businessMock] = FEATURED_VISAS;
  const tourismReqs = t.raw("visas.tourism.requirements") as string[];
  const tourismFees = t.raw("visas.tourism.fees") as Array<{
    label: string;
    time: string;
  }>;
  const businessReqs = t.raw("visas.business.requirements") as string[];
  const businessFees = t.raw("visas.business.fees") as Array<{
    label: string;
    time: string;
  }>;

  const translatedFeaturedVisas = [
    {
      ...tourismMock,
      name: t("visas.tourism.name"),
      badge: t("visas.tourism.badge"),
      description: t("visas.tourism.description"),
      details: {
        validity: t("visas.tourism.validity"),
        maxStay: t("visas.tourism.maxStay"),
        entryType: t("visas.tourism.entryType"),
      },
      requirements: tourismReqs,
      fees: tourismMock.fees.map((f, i) => ({
        ...f,
        label: tourismFees[i]?.label ?? f.label,
        time: tourismFees[i]?.time ?? f.time,
      })),
      applyLabel: t("visas.tourism.applyLabel"),
    },
    {
      ...businessMock,
      name: t("visas.business.name"),
      description: t("visas.business.description"),
      details: {
        validity: t("visas.business.validity"),
        maxStay: t("visas.business.maxStay"),
        entryType: t("visas.business.entryType"),
      },
      requirements: businessReqs,
      fees: businessMock.fees.map((f, i) => ({
        ...f,
        label: businessFees[i]?.label ?? f.label,
        time: businessFees[i]?.time ?? f.time,
      })),
      applyLabel: t("visas.business.applyLabel"),
    },
  ];

  /* ── Translated secondary visas ─────────────── */
  const translatedSecondaryVisas = SECONDARY_VISAS.map((visa) => {
    const id = visa.id as "transit" | "student" | "work";
    return {
      ...visa,
      name: t(`visas.${id}.name`),
      description: t(`visas.${id}.description`),
      priceLabel: t(`visas.${id}.priceLabel`),
    };
  });

  /* ── Translated comparison rows ─────────────── */
  const translatedComparisonRows = COMPARISON_ROWS.map((row) => {
    const id = row.id as
      | "tourism"
      | "business"
      | "transit"
      | "student"
      | "work";
    return {
      ...row,
      name: t(`visas.${id}.name`),
      validity: t(`visas.${id}.validity`),
      maxStay: t(`visas.${id}.maxStay`),
      processingTime: t(`visas.${id}.processingTime`),
    };
  });
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="px-4 pb-10 pt-14 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold text-[#004E34] uppercase tracking-widest mb-3">
            {t("hero.badge")}
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#004E34] mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-[#6F7A72] text-sm leading-relaxed max-w-xl">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ── Featured visa cards ───────────────────────── */}
      <section className="px-4 pb-10 lg:px-8">
        <div className="flex flex-col max-w-6xl gap-6 mx-auto">
          {translatedFeaturedVisas.map((visa) => (
            <FeaturedVisaCard key={visa.id} visa={visa} labels={cardLabels} />
          ))}
        </div>
      </section>

      {/* ── Secondary visa cards ──────────────────────── */}
      <section className="px-4 pb-16 lg:px-8">
        <div className="grid max-w-6xl grid-cols-1 gap-5 mx-auto sm:grid-cols-3">
          {translatedSecondaryVisas.map((visa) => (
            <div
              key={visa.id}
              className="flex flex-col gap-3 p-6 bg-white border border-gray-100 shadow-sm rounded-xl"
            >
              <h3 className="text-base font-bold text-[#1F2937]">
                {visa.name}
              </h3>
              <p className="text-sm text-[#6F7A72] leading-relaxed flex-1">
                {visa.description}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-[#004E34]">
                  {visa.price}
                </span>
                <span className="text-xs text-[#6F7A72]">
                  {visa.priceLabel}
                </span>
              </div>
              <Link
                href="#"
                className="w-full py-2.5 border border-[#004E34] text-[#004E34] text-sm font-semibold rounded-lg hover:bg-[#004E34] hover:text-white transition-colors flex items-center justify-center"
              >
                {t("secondary.details")}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comprehensive Visa Comparison ────────────── */}
      <section className="px-4 py-16 bg-white lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#004E34] text-center mb-10">
            {t("comparison.title")}
          </h2>

          <div className="overflow-x-auto border border-gray-100 shadow-sm rounded-xl">
            <table className="w-full text-sm min-w-160">
              <thead>
                <tr className="bg-[#004E34] text-white">
                  {[
                    t("comparison.col.category"),
                    t("comparison.col.validity"),
                    t("comparison.col.maxStay"),
                    t("comparison.col.priceRange"),
                    t("comparison.col.processingTime"),
                  ].map((col) => (
                    <th
                      key={col}
                      className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {translatedComparisonRows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                  >
                    <td className="px-5 py-4 font-semibold text-[#004E34]">
                      {row.name}
                    </td>
                    <td className="px-5 py-4 text-[#1F2937]">{row.validity}</td>
                    <td className="px-5 py-4 text-[#1F2937]">{row.maxStay}</td>
                    <td className="px-5 py-4 text-[#1F2937]">
                      {row.priceRange}
                    </td>
                    <td className="px-5 py-4 text-[#1F2937]">
                      {row.processingTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="px-4 py-16 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#F5F0E0] rounded-2xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold text-[#1F2937] mb-2">
                {t("cta.title")}
              </h2>
              <p className="text-sm text-[#6F7A72] leading-relaxed">
                {t("cta.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="#"
                className="px-6 py-2.5 bg-[#004E34] text-white text-sm font-semibold rounded-lg hover:bg-[#003322] transition-colors"
              >
                {t("cta.startWizard")}
              </Link>
              <Link
                href="/contact-us"
                className="px-6 py-2.5 border border-[#1F2937] text-[#1F2937] text-sm font-semibold rounded-lg hover:bg-[#1F2937] hover:text-white transition-colors"
              >
                {t("cta.contactSupport")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

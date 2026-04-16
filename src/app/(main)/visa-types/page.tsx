import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getVisaPurposes, getVisaTypes } from "@/data/general";
import type { ProcessingTier, FeaturedVisa } from "@/data/visa-types";
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

const FEATURED_PURPOSE_TYPES = ["tourism", "business"] as const;

const PURPOSE_STATIC: Record<
  string,
  { image?: string; imageBg: string; badge?: string }
> = {
  tourism: {
    image:
      "/AB6AXuC1CHP2C3Iv0QwVQWoVH9139-WbguvSO32lucaHyBovTtiWXTh27SfgsWe7RB9CrCQGfhT8GDftNt_60iXSKXTYOlmspNRaCNlANlau0Xp.png",
    imageBg: "bg-[#1a3a2a]",
  },
  business: {
    imageBg: "bg-[#0f2235]",
  },
};

export default async function VisaTypesPage() {
  const t = await getTranslations("VisaTypes");

  const [purposes, visaTypes] = await Promise.all([
    getVisaPurposes(),
    getVisaTypes(),
  ]);

  /* ── Build fee tiers for a given purpose_type ── */
  function buildFeeTiers(purposeType: string): ProcessingTier[] {
    return visaTypes.map((vt) => {
      const priceEntry = vt.prices.find(
        (p) => p.visa_purpose.purpose_type === purposeType,
      );
      return {
        label: vt.name,
        price: priceEntry ? `$${Number(priceEntry.total_price).toFixed(0)}` : "—",
        time: vt.processing_time_text,
        highlighted: vt.speed_type === "urgent",
      };
    });
  }

  /* ── Standard visa type for validity/maxStay ─── */
  const stdType =
    visaTypes.find((vt) => vt.speed_type === "standard") ?? visaTypes[0];

  /* ── Featured visa cards ─────────────────────── */
  const featuredPurposes = purposes.filter((p) =>
    (FEATURED_PURPOSE_TYPES as readonly string[]).includes(p.purpose_type),
  );

  const translatedFeaturedVisas: FeaturedVisa[] = featuredPurposes.map(
    (purpose) => {
      const id = purpose.purpose_type as "tourism" | "business";
      const staticData = PURPOSE_STATIC[id] ?? { imageBg: "bg-[#1a3a2a]" };
      const requirements = t.raw(`visas.${id}.requirements`) as string[];

      return {
        id: purpose.slug,
        name: purpose.name,
        badge: id === "tourism" ? t("visas.tourism.badge") : undefined,
        image: staticData.image,
        imageBg: staticData.imageBg,
        description: purpose.description,
        details: {
          validity: stdType
            ? `${stdType.validity_days} Days`
            : t(`visas.${id}.validity`),
          maxStay: stdType
            ? `${stdType.max_stay_days} Days`
            : t(`visas.${id}.maxStay`),
          entryType: t(`visas.${id}.entryType`),
        },
        requirements,
        fees: buildFeeTiers(id),
        applyLabel: t(`visas.${id}.applyLabel`),
      };
    },
  );

  /* ── Price range helper for a purpose_type ─────── */
  function getPriceRange(purposeType: string): string {
    const prices = visaTypes
      .flatMap((vt) => vt.prices)
      .filter((p) => p.visa_purpose.purpose_type === purposeType)
      .map((p) => Number(p.total_price))
      .filter((n) => !isNaN(n));
    if (prices.length === 0) return "—";
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `$${min}` : `$${min} – $${max}`;
  }

  /* ── Secondary visa cards ────────────────────── */
  const secondaryPurposes = purposes.filter(
    (p) =>
      !(FEATURED_PURPOSE_TYPES as readonly string[]).includes(p.purpose_type),
  );

  const translatedSecondaryVisas = secondaryPurposes.map((purpose) => {
    const id = purpose.purpose_type as "transit" | "student" | "work";
    return {
      id: purpose.slug,
      name: purpose.name,
      description: purpose.description,
      priceLabel: t(`visas.${id}.priceLabel`),
      price: getPriceRange(purpose.purpose_type),
      disabled: id === "work",
    };
  });

  /* ── Comparison rows ─────────────────────────── */
  const processingRange =
    visaTypes.length >= 2
      ? `${visaTypes[visaTypes.length - 1].processing_time_text} – ${visaTypes[0].processing_time_text}`
      : null;

  const translatedComparisonRows = purposes.map((purpose) => {
    const id = purpose.purpose_type as
      | "tourism"
      | "business"
      | "transit"
      | "student"
      | "work";
    return {
      id: purpose.slug,
      name: purpose.name,
      validity: stdType
        ? `${stdType.validity_days} Days`
        : t(`visas.${id}.validity`),
      maxStay: stdType
        ? `${stdType.max_stay_days} Days`
        : t(`visas.${id}.maxStay`),
      priceRange: getPriceRange(purpose.purpose_type),
      processingTime: processingRange ?? t(`visas.${id}.processingTime`),
    };
  });

  /* ── Card internal labels ─────────────────────── */
  const cardLabels = {
    keyDetails: t("card.keyDetails"),
    requirementsTitle: t("card.requirements"),
    processingFees: t("card.processingFees"),
    validity: t("card.validity"),
    maxStay: t("card.maxStay"),
    entryType: t("card.entryType"),
  };

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
              {visa.disabled ? (
                <span className="w-full py-2.5 border border-gray-300 text-gray-300 text-sm font-semibold rounded-lg flex items-center justify-center cursor-not-allowed">
                  {t("secondary.unavailable")}
                </span>
              ) : (
                <Link
                  href="#"
                  className="w-full py-2.5 border border-[#004E34] text-[#004E34] text-sm font-semibold rounded-lg hover:bg-[#004E34] hover:text-white transition-colors flex items-center justify-center"
                >
                  {t("secondary.details")}
                </Link>
              )}
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
                href="/apply"
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

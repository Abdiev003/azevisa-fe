import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CheckIcon } from "@/components/icons";
import { CountriesList } from "@/components/eligible-countries/countries-list";
import { getCountries, getRegions, COUNTRY_PAGE_SIZE } from "@/data/general";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("EligibleCountries.meta");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    alternates: { canonical: "/eligible-countries" },
    openGraph: {
      url: "/eligible-countries",
      title: t("title"),
      description: t("ogDescription"),
    },
    twitter: {
      title: t("title"),
      description: t("ogDescription"),
    },
  };
}

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string; region?: string }>;
}

export default async function EligibleCountriesPage({
  searchParams,
}: PageProps) {
  const t = await getTranslations("EligibleCountries");
  const { page: pageParam, search, region } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const [regions, data] = await Promise.all([
    getRegions(),
    getCountries({ page: currentPage, search, region }),
  ]);

  const totalPages = Math.ceil(data.count / COUNTRY_PAGE_SIZE);

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-[#F8F9FA] pt-16 pb-10 text-center">
        <div className="max-w-2xl px-4 mx-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#004E34]/30 text-[#004E34] text-xs font-semibold uppercase tracking-widest mb-5">
            {t("hero.badge")}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#004E34] leading-tight mb-4">
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
          </h1>
          <p className="text-[#6F7A72] text-base max-w-xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ── Countries section ─────────────────────────── */}
      <section className="bg-[#F8F9FA]">
        <CountriesList
          countries={data.results}
          regions={regions}
          totalPages={totalPages}
          currentPage={currentPage}
          currentSearch={search ?? ""}
          currentRegion={region ?? ""}
        />
      </section>

      {/* ── Don't see your country ────────────────────── */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            {/* Left */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-3">
                {t("consulate.title")}
              </h2>
              <p className="text-[#6F7A72] text-sm leading-relaxed mb-6">
                {t("consulate.description")}
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                <li className="flex items-center gap-2.5 text-sm text-[#1F2937] font-medium">
                  <CheckIcon />
                  {t("consulate.item1")}
                </li>
                <li className="flex items-center gap-2.5 text-sm text-[#1F2937] font-medium">
                  <CheckIcon />
                  {t("consulate.item2")}
                </li>
              </ul>
              {/* <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-[#4A3A14] text-white text-sm font-semibold rounded-lg hover:bg-[#3D3010] transition-colors"
              >
                {t("consulate.cta")}
              </a> */}
            </div>

            {/* Right — building image */}
            <div className="flex-1 w-full">
              <div className="relative overflow-hidden rounded-3xl h-72 lg:h-96">
                <Image
                  src="/AB6AXuC1CHP2C3Iv0QwVQWoVH9139-WbguvSO32lucaHyBovTtiWXTh27SfgsWe7RB9CrCQGfhT8GDftNt_60iXSKXTYOlmspNRaCNlANlau0Xp.png"
                  alt={t("consulate.imageAlt")}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

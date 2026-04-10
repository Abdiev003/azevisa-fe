import type { Metadata } from "next";
import Image from "next/image";
import { CheckIcon } from "@/components/icons";
import { CountriesList } from "@/components/eligible-countries/countries-list";
import { getCountries, getRegions, COUNTRY_PAGE_SIZE } from "@/data/general";

export const metadata: Metadata = {
  title: "Countries Eligible for Azerbaijan eVisa – 70+ Nations",
  description:
    "Check if your country is eligible for the Azerbaijan electronic visa. Citizens of 70+ nations can apply online for the ASAN Visa without visiting an embassy.",
  keywords: [
    "Azerbaijan eVisa eligible countries",
    "ASAN Visa countries",
    "who can get Azerbaijan visa online",
    "Azerbaijan visa eligible nationalities",
  ],
  alternates: { canonical: "/eligible-countries" },
  openGraph: {
    url: "/eligible-countries",
    title: "Countries Eligible for Azerbaijan eVisa – 70+ Nations",
    description:
      "Check if your country qualifies for the Azerbaijan eVisa. 70+ nations can apply online.",
  },
  twitter: {
    title: "Countries Eligible for Azerbaijan eVisa – 70+ Nations",
    description:
      "Check if your country qualifies for the Azerbaijan eVisa. 70+ nations can apply online.",
  },
};

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string; region?: string }>;
}

export default async function EligibleCountriesPage({
  searchParams,
}: PageProps) {
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
            Global Access
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#004E34] leading-tight mb-4">
            Countries Eligible for
            <br />
            Azerbaijan eVisa
          </h1>
          <p className="text-[#6F7A72] text-base max-w-xl mx-auto">
            Citizens of 70+ countries can apply online. Check if your
            nationality qualifies for our streamlined electronic visa process.
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
                Don&apos;t see your country?
              </h2>
              <p className="text-[#6F7A72] text-sm leading-relaxed mb-6">
                If your country is not on the list for the ASAN Visa (eVisa),
                you may still be able to apply for a traditional visa through an
                Azerbaijani embassy or consulate in your region.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                <li className="flex items-center gap-2.5 text-sm text-[#1F2937] font-medium">
                  <CheckIcon />
                  Check Traditional Visa Requirements
                </li>
                <li className="flex items-center gap-2.5 text-sm text-[#1F2937] font-medium">
                  <CheckIcon />
                  Find Nearest Consulate
                </li>
              </ul>
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-[#4A3A14] text-white text-sm font-semibold rounded-lg hover:bg-[#3D3010] transition-colors"
              >
                View Consulate Directory
              </a>
            </div>

            {/* Right — building image */}
            <div className="flex-1 w-full">
              <div className="relative overflow-hidden rounded-3xl h-72 lg:h-96">
                <Image
                  src="/AB6AXuC1CHP2C3Iv0QwVQWoVH9139-WbguvSO32lucaHyBovTtiWXTh27SfgsWe7RB9CrCQGfhT8GDftNt_60iXSKXTYOlmspNRaCNlANlau0Xp.png"
                  alt="Azerbaijan landmark building"
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

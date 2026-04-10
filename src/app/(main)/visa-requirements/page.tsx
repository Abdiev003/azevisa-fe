import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import RequirementsTabs from "@/components/visa-requirements/requirements-tabs";

export const metadata: Metadata = {
  title: "Azerbaijan eVisa Requirements – Documents & Eligibility",
  description:
    "Check all Azerbaijan eVisa requirements: passport validity, digital photo, accommodation proof and more. Complete requirements for tourist, business, transit, student and work visas.",
  keywords: [
    "Azerbaijan eVisa requirements",
    "Azerbaijan visa documents",
    "ASAN Visa documents needed",
    "Azerbaijan visa eligibility",
    "Azerbaijan tourist visa requirements",
  ],
  alternates: { canonical: "/visa-requirements" },
  openGraph: {
    url: "/visa-requirements",
    title: "Azerbaijan eVisa Requirements – Documents & Eligibility",
    description:
      "All required documents for an Azerbaijan eVisa — passport, photo, accommodation proof and more.",
  },
  twitter: {
    title: "Azerbaijan eVisa Requirements – Documents & Eligibility",
    description:
      "All required documents for an Azerbaijan eVisa — passport, photo, accommodation proof and more.",
  },
};

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                     */
/* ------------------------------------------------------------------ */

function PassportIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M8 18h8" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8.2l-8.2 1.8-.2.7 7.1 2.1 2.1 7.1.7-.2z" />
    </svg>
  );
}

function HotelIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M3 22V3h18v19" />
      <path d="M3 12h18" />
      <path d="M9 22v-4h6v4" />
      <rect x="7" y="4" width="2" height="3" />
      <rect x="15" y="4" width="2" height="3" />
      <rect x="7" y="13" width="2" height="3" />
      <rect x="15" y="13" width="2" height="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Static FAQ/notes accordion (server, no interactivity needed)         */
/* ------------------------------------------------------------------ */

function InfoAccordion({
  items,
}: {
  items: { heading: string; body: string }[];
}) {
  return (
    <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {items.map((item, i) => (
        <details key={i} className="group">
          <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
            <span className="font-semibold text-[#1F2937] text-sm">
              {item.heading}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 shrink-0 text-[#6F7A72] transition-transform group-open:rotate-180"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="px-6 pb-5 text-sm text-[#6F7A72] leading-relaxed border-t border-gray-50 pt-4">
            {item.body}
          </div>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                 */
/* ------------------------------------------------------------------ */

export default async function VisaRequirementsPage() {
  const t = await getTranslations("VisaRequirements");

  const DOCS = [
    { icon: <PassportIcon />, key: "passport" as const },
    { icon: <PhotoIcon />, key: "photo" as const },
    { icon: <MailIcon />, key: "email" as const },
    { icon: <CardIcon />, key: "payment" as const },
    { icon: <PlaneIcon />, key: "travel" as const },
    { icon: <HotelIcon />, key: "accommodation" as const },
  ];

  const STEPS = [
    { icon: <GlobeIcon />, key: "step1" as const, num: "01" },
    { icon: <PassportIcon />, key: "step2" as const, num: "02" },
    { icon: <CardIcon />, key: "step3" as const, num: "03" },
    { icon: <ShieldIcon />, key: "step4" as const, num: "04" },
  ];

  const noteItems = t.raw("notes.items") as { heading: string; body: string }[];

  return (
    <main className="bg-[#F8F9FA] min-h-screen">
      {/* ─── Hero ────────────────────────────────────────── */}
      <section className="bg-[#003322]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-8 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/80">{t("hero.badge")}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-white/60 bg-white/10 px-4 py-1.5 rounded-full mb-5">
              {t("hero.badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              {t("hero.title")}
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Stats strip */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: <ClockIcon />,
                value: t("stats.processing"),
                label: t("stats.processingLabel"),
              },
              {
                icon: <GlobeIcon />,
                value: t("stats.online"),
                label: t("stats.onlineLabel"),
              },
              {
                icon: <ShieldIcon />,
                value: t("stats.validity"),
                label: t("stats.validityLabel"),
              },
            ].map(({ icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 bg-white/10 rounded-xl px-5 py-4"
              >
                <div className="text-white/60">{icon}</div>
                <div>
                  <p className="text-white font-bold text-lg leading-none">
                    {value}
                  </p>
                  <p className="text-white/50 text-xs mt-1">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── General Documents ───────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] mb-2">
            {t("generalDocs.title")}
          </h2>
          <p className="text-[#6F7A72] text-sm sm:text-base">
            {t("generalDocs.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOCS.map(({ icon, key }, i) => (
            <div
              key={key}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-[#004E34]/20 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#004E34]/8 flex items-center justify-center shrink-0 text-[#004E34] group-hover:bg-[#004E34] group-hover:text-white transition-colors">
                  {icon}
                </div>
                <div>
                  <p className="font-bold text-[#1F2937] text-sm mb-1">
                    {t(`generalDocs.${key}.name`)}
                  </p>
                  <p className="text-xs text-[#6F7A72] leading-relaxed">
                    {t(`generalDocs.${key}.desc`)}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#004E34]" />
                <span className="text-[10px] font-bold text-[#004E34] uppercase tracking-wider">
                  Required for all visa types
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Per-Type Requirements Tabs ──────────────────── */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] mb-2">
              {t("tabs.title")}
            </h2>
            <p className="text-[#6F7A72] text-sm sm:text-base">
              {t("tabs.subtitle")}
            </p>
          </div>

          <RequirementsTabs
            labels={{
              note: t("tabs.note"),
              applyNow: t("tabs.applyNow"),
            }}
          />
        </div>
      </section>

      {/* ─── Application Process Steps ───────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] mb-2">
            {t("process.title")}
          </h2>
          <p className="text-[#6F7A72] text-sm sm:text-base">
            {t("process.subtitle")}
          </p>
        </div>

        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-8 left-[calc(12.5%+0.5rem)] right-[calc(12.5%+0.5rem)] h-0.5 bg-gray-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map(({ icon, key, num }, i) => (
              <div
                key={key}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number circle */}
                <div className="relative w-16 h-16 rounded-full bg-[#004E34] flex items-center justify-center text-white mb-5 z-10">
                  {icon}
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-[#004E34] text-[#004E34] text-[10px] font-extrabold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-[#1F2937] text-base mb-2">
                  {t(`process.${key}.title`)}
                </h3>
                <p className="text-sm text-[#6F7A72] leading-relaxed">
                  {t(`process.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Important Information Accordion ─────────────── */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d97706"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
              {t("notes.title")}
            </h2>
          </div>

          <InfoAccordion items={noteItems} />
        </div>
      </section>

      {/* ─── CTA Banner ──────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#004E34] rounded-3xl px-8 py-12 sm:px-14 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {t("cta.title")}
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-md">
              {t("cta.subtitle")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-[#004E34] font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
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
              {t("cta.apply")}
            </Link>
            <Link
              href="/eligible-countries"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold text-sm px-5 py-3.5 rounded-xl border border-white/20 hover:border-white/40 transition-colors"
            >
              {t("cta.checkCountry")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

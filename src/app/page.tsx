import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import FaqAccordion from "@/components/home/faq-accordion";
import { getHomeFAQ } from "@/data/general";

export const metadata: Metadata = {
  title: "Apply for Azerbaijan eVisa Online – Fast & Secure",
  description:
    "Get your Azerbaijan eVisa in 3 hours. Official online application for tourist, business and transit visas. Simple form, secure payment, instant confirmation.",
  keywords: [
    "Azerbaijan eVisa",
    "ASAN Visa",
    "Azerbaijan visa online",
    "apply for Azerbaijan visa",
    "Azerbaijan tourist visa online",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Apply for Azerbaijan eVisa Online – Fast & Secure",
    description:
      "Get your Azerbaijan eVisa in 3 hours. Simple online application for tourist, business and transit visas.",
  },
  twitter: {
    title: "Apply for Azerbaijan eVisa Online – Fast & Secure",
    description:
      "Get your Azerbaijan eVisa in 3 hours. Simple online application for tourist, business and transit visas.",
  },
};

/* ── inline icons ─────────────────────────────────────────── */
function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function MailCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <polyline points="16 19 18 21 22 17" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
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
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#f59e0b"
      stroke="#f59e0b"
      strokeWidth="1"
      className="w-4 h-4"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default async function HomePage() {
  const t = await getTranslations("Home");
  const faqsHome = await getHomeFAQ();

  const testimonials = t.raw("testimonials.items") as {
    quote: string;
    name: string;
    country: string;
  }[];

  const STEPS = [
    {
      num: t("steps.step1.num"),
      title: t("steps.step1.title"),
      desc: t("steps.step1.desc"),
      icon: <DocumentIcon />,
    },
    {
      num: t("steps.step2.num"),
      title: t("steps.step2.title"),
      desc: t("steps.step2.desc"),
      icon: <CreditCardIcon />,
    },
    {
      num: t("steps.step3.num"),
      title: t("steps.step3.title"),
      desc: t("steps.step3.desc"),
      icon: <MailCheckIcon />,
    },
  ];

  const STATS = [
    { value: t("stats.visas"), label: t("stats.visasLabel") },
    { value: t("stats.approval"), label: t("stats.approvalLabel") },
    { value: t("stats.countries"), label: t("stats.countriesLabel") },
    { value: t("stats.years"), label: t("stats.yearsLabel") },
  ];

  return (
    <div className="bg-[#F8F9FA]">
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative flex items-end min-h-135 sm:items-center">
        {/* Background image */}
        <Image
          src="/home-banner.png"
          alt="Baku city skyline at night"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark gradient overlay - heavier on the left for text legibility */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl px-4 py-20 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mb-8 text-base leading-relaxed text-white/75 sm:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-[#C8A84B] hover:bg-[#b8973e] text-white font-bold text-sm px-7 py-3.5 rounded-lg transition-colors"
              >
                {t("hero.applyNow")}
                <ArrowRightIcon />
              </Link>
              <Link
                href="/check-status"
                className="inline-flex items-center gap-2 border border-white/40 hover:border-white/70 text-white font-semibold text-sm px-7 py-3.5 rounded-lg transition-colors"
              >
                {t("hero.checkStatus")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
      <section className="py-16 bg-white sm:py-20">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                {/* Connector line between steps — desktop */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(100%-1rem)] w-8 h-px bg-gray-200 z-0" />
                )}
                <div className="flex flex-col gap-4">
                  {/* Number + icon row */}
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-extrabold leading-none text-gray-100 select-none">
                      {step.num}
                    </span>
                    <div className="w-14 h-14 rounded-xl bg-[#F8F9FA] flex items-center justify-center text-[#004E34]">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1F2937] text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#6F7A72] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ SERVICE TIERS ══════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] text-center mb-3">
            {t("tiers.title")}
          </h2>
          {/* Decorative underline */}
          <div className="flex justify-center mb-10">
            <span className="block w-12 h-1 rounded-full bg-[#C8A84B]" />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 max-w-2xl mx-auto w-full">
            {/* Standard */}
            <div className="relative flex flex-col gap-5 bg-white border border-gray-200 shadow-sm rounded-2xl p-7">
              <div>
                <h3 className="font-bold text-[#1F2937] text-lg mb-1">
                  {t("tiers.standard.name")}
                </h3>
                <p className="text-xs text-[#6F7A72]">
                  {t("tiers.standard.tagline")}
                </p>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-[#1F2937]">
                  {t("tiers.standard.price")}
                </span>
              </div>
              <ul className="flex flex-col gap-2.5">
                <li className="flex items-center gap-2.5 text-sm text-[#1F2937]">
                  <span className="text-[#004E34]">
                    <CheckIcon />
                  </span>
                  {t("tiers.standard.feature1")}
                </li>
                <li className="flex items-center gap-2.5 text-sm text-[#1F2937]">
                  <span className="text-[#004E34]">
                    <CheckIcon />
                  </span>
                  {t("tiers.standard.feature2")}
                </li>
              </ul>
              <Link
                href="/apply"
                className="mt-auto block text-center border border-gray-300 hover:border-[#004E34] hover:text-[#004E34] text-[#1F2937] font-semibold text-sm py-3 rounded-xl transition-colors"
              >
                {t("tiers.standard.cta")}
              </Link>
            </div>

            {/* Urgent — featured */}
            <div className="relative bg-[#004E34] rounded-2xl p-7 flex flex-col gap-5 shadow-lg">
              {/* Most Popular badge */}
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-block text-[10px] font-extrabold tracking-widest uppercase bg-[#C8A84B] text-white px-4 py-1.5 rounded-full whitespace-nowrap">
                {t("tiers.urgent.badge")}
              </span>
              <div>
                <h3 className="mb-1 text-lg font-bold text-white">
                  {t("tiers.urgent.name")}
                </h3>
                <p className="text-xs text-white/60">
                  {t("tiers.urgent.tagline")}
                </p>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-white">
                  {t("tiers.urgent.price")}
                </span>
              </div>
              <ul className="flex flex-col gap-2.5">
                <li className="flex items-center gap-2.5 text-sm text-white">
                  <span className="text-[#C8A84B]">
                    <CheckIcon />
                  </span>
                  {t("tiers.urgent.feature1")}
                </li>
                <li className="flex items-center gap-2.5 text-sm text-white">
                  <span className="text-[#C8A84B]">
                    <CheckIcon />
                  </span>
                  {t("tiers.urgent.feature2")}
                </li>
              </ul>
              <Link
                href="/apply"
                className="mt-auto block text-center bg-[#C8A84B] hover:bg-[#b8973e] text-white font-bold text-sm py-3 rounded-xl transition-colors"
              >
                {t("tiers.urgent.cta")}
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════ STATS BAR ══════════════════════ */}
      <section className="bg-[#004E34] py-12">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="mb-1 text-4xl font-extrabold text-white">
                  {value}
                </p>
                <p className="text-xs font-bold tracking-widest uppercase text-white/50">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ FAQ ══════════════════════ */}
      <section className="py-16 bg-white sm:py-20">
        <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] text-center mb-3">
            {t("faq.title")}
          </h2>
          <div className="flex justify-center mb-10">
            <span className="block w-12 h-1 rounded-full bg-[#C8A84B]" />
          </div>

          <FaqAccordion items={faqsHome} />
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
      <section className="bg-[#F8F9FA] py-16 sm:py-20">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] text-center mb-3">
            {t("testimonials.title")}
          </h2>
          <div className="flex justify-center mb-10">
            <span className="block w-12 h-1 rounded-full bg-[#C8A84B]" />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-6 bg-white border border-gray-100 shadow-sm rounded-2xl"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <StarIcon key={si} />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-[#1F2937] leading-relaxed flex-1">
                  {item.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-[#004E34]/10 flex items-center justify-center text-[#004E34] text-xs font-extrabold shrink-0">
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1F2937] leading-none">
                      {item.name}
                    </p>
                    <p className="text-[10px] font-bold text-[#6F7A72] uppercase tracking-widest mt-1">
                      {item.country}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

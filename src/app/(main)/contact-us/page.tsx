import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-us/contact-form";
import {
  ChevronIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from "@/components/icons";
import { getContactFAQ } from "@/data/general";

export const metadata: Metadata = {
  title: "Contact AzEvisa Support – We're Here to Help 24/7",
  description:
    "Get in touch with the AzEvisa support team for help with your Azerbaijan eVisa application. Available 24/7 by email, phone and live chat.",
  keywords: [
    "Azerbaijan eVisa support",
    "contact AzEvisa",
    "Azerbaijan visa help",
    "eVisa customer service",
  ],
  alternates: { canonical: "/contact-us" },
  openGraph: {
    url: "/contact-us",
    title: "Contact AzEvisa Support – We're Here to Help 24/7",
    description:
      "Get in touch with the AzEvisa support team for help with your Azerbaijan eVisa application.",
  },
  twitter: {
    title: "Contact AzEvisa Support – We're Here to Help 24/7",
    description:
      "Get in touch with the AzEvisa support team for help with your Azerbaijan eVisa application.",
  },
};

const INFO_ICONS = [MailIcon, PhoneIcon];
const INFO_KEYS = ["email", "hours"] as const;

export default async function ContactUsPage() {
  const t = await getTranslations("ContactUs");
  const faqsContact = await getContactFAQ();

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#6F7A72]">
          <Link href="/" className="hover:text-[#004E34] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#004E34]">{t("breadcrumb")}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#003322]">
        <div className="flex flex-col items-center max-w-6xl gap-4 px-6 py-16 mx-auto text-center">
          <span className="text-xs font-bold tracking-widest uppercase text-[#94A3B8] bg-white/10 px-4 py-1.5 rounded-full">
            {t("hero.badge")}
          </span>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-white md:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="text-[#94A3B8] text-sm md:text-base leading-7 max-w-xl">
            {t("hero.subtitle")}
          </p>
        </div>
      </div>

      {/* Info cards */}
      <div className="max-w-6xl px-6 mx-auto -mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {INFO_KEYS.map((key, i) => {
            const Icon = INFO_ICONS[i];
            return (
              <div
                key={key}
                className="flex items-start gap-4 px-5 py-5 bg-white border border-gray-200 shadow-sm rounded-xl"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#004E34]/10 shrink-0">
                  <Icon />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-0.5">
                    {t(`info.${key}.label`)}
                  </p>
                  <p className="text-sm font-semibold text-[#1F2937]">
                    {t(`info.${key}.value`)}
                  </p>
                  <p className="text-xs text-[#6F7A72] mt-0.5">
                    {t(`info.${key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form + FAQ */}
      <div className="grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 mx-auto lg:grid-cols-5">
        {/* Form card — 3/5 */}
        <div className="p-8 bg-white border border-gray-200 shadow-sm lg:col-span-3 rounded-2xl">
          <p className="text-xl font-bold text-[#1F2937] mb-1">
            {t("form.title")}
          </p>
          <p className="text-sm text-[#6F7A72] mb-7">{t("form.subtitle")}</p>
          <ContactForm />
        </div>

        {/* FAQ — 2/5 */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <p className="text-lg font-bold text-[#1F2937]">{t("faq.title")}</p>
          <div className="flex flex-col gap-4">
            {faqsContact.map((faq) => (
              <details
                key={faq.id}
                className="overflow-hidden border border-gray-200 group rounded-xl"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 list-none cursor-pointer select-none">
                  <span className="text-sm font-semibold text-[#1F2937]">
                    {faq.question}
                  </span>
                  <span className="transition-transform shrink-0 group-open:rotate-180">
                    <ChevronIcon />
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-[#6F7A72] leading-6 border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {/* Extra trust block */}
          <div className="mt-2 bg-[#003322] rounded-xl p-6 flex flex-col gap-3">
            <p className="text-sm font-semibold text-white">
              Still have questions?
            </p>
            <p className="text-[#94A3B8] text-xs leading-5">
              Our dedicated support team is available around the clock. You can
              also check our Help Center for instant answers.
            </p>
            <a
              href="mailto:support@azevisa.az"
              className="inline-flex items-center gap-2 mt-1 text-xs font-semibold text-white underline transition-opacity underline-offset-4 hover:opacity-70"
            >
              support@azevisa.az
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

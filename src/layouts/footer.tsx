"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  GlobeIcon,
  MessageIcon,
  ShareIcon,
  ShieldIcon,
} from "@/components/icons";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-[#0F172A] text-[#94A3B8]">
      {/* Main grid */}
      <div className="grid grid-cols-1 gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <span className="text-2xl font-bold text-white">azEvisa</span>
          <p className="text-sm leading-7">{t("brand.description")}</p>
          <div className="flex items-center gap-4 mt-1">
            <button
              aria-label="Website"
              className="transition-opacity hover:opacity-80"
            >
              <GlobeIcon />
            </button>
            <button
              aria-label="Chat"
              className="transition-opacity hover:opacity-80"
            >
              <MessageIcon />
            </button>
            <button
              aria-label="Share"
              className="transition-opacity hover:opacity-80"
            >
              <ShareIcon />
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-5">
          <span className="text-base font-semibold text-white">
            {t("quickLinks.title")}
          </span>
          <ul className="flex flex-col gap-4 text-sm">
            <li>
              <Link
                href="/visa-requirements"
                className="transition-colors hover:text-white"
              >
                {t("quickLinks.visaRequirements")}
              </Link>
            </li>
            <li>
              <Link
                href="/check-status"
                className="transition-colors hover:text-white"
              >
                {t("quickLinks.applicationTracker")}
              </Link>
            </li>
            <li>
              <Link
                href="/eligible-countries"
                className="transition-colors hover:text-white"
              >
                {t("quickLinks.eligibleNationalities")}
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-white">
                {t("quickLinks.travelAdvisory")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-5">
          <span className="text-base font-semibold text-white">
            {t("support.title")}
          </span>
          <ul className="flex flex-col gap-4 text-sm">
            {/* <li>
              <Link href="#" className="transition-colors hover:text-white">
                {t("support.helpCenter")}
              </Link>
            </li> */}
            <li>
              <Link
                href="/contact-us"
                className="transition-colors hover:text-white"
              >
                {t("support.contactUs")}
              </Link>
            </li>
            <li>
              <Link
                href="/refund-policy"
                className="transition-colors hover:text-white"
              >
                {t("support.refundPolicy")}
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-white"
              >
                {t("support.privacyPolicy")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Trust & Security */}
        <div className="flex flex-col gap-5">
          <span className="text-base font-semibold text-white">
            {t("trust.title")}
          </span>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-[#1E293B] rounded-md px-4 py-3">
              <ShieldIcon />
              <span className="text-xs font-semibold tracking-wide text-[#94A3B8] uppercase">
                {t("trust.ssl")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1E293B]">
        <div className="flex flex-col gap-4 px-8 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span>{t("bottom.copyright")}</span>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              {t("bottom.privacyPolicy")}
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-white"
            >
              {t("bottom.termsOfService")}
            </Link>
            <Link
              href="/cookie-policy"
              className="transition-colors hover:text-white"
            >
              {t("bottom.cookiePolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

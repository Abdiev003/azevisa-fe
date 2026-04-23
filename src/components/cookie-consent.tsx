"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useTranslations } from "next-intl";

const CONSENT_STORAGE_KEY = "azevisa-cookie-consent";
const CONSENT_COOKIE_NAME = "cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

type ConsentState = "accepted" | "necessary" | "unset";

function persistConsent(value: Exclude<ConsentState, "unset">) {
  localStorage.setItem(CONSENT_STORAGE_KEY, value);
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax`;
}

export function CookieConsent({ gaId }: { gaId?: string }) {
  const t = useTranslations("CookieConsent");
  const [consent, setConsent] = useState<ConsentState>("unset");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHydrated(true);

      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (saved === "accepted" || saved === "necessary") {
        setConsent(saved);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const analyticsEnabled = useMemo(
    () => hydrated && consent === "accepted" && Boolean(gaId),
    [consent, gaId, hydrated],
  );

  const handleAccept = () => {
    persistConsent("accepted");
    setConsent("accepted");
  };

  const handleNecessaryOnly = () => {
    persistConsent("necessary");
    setConsent("necessary");
  };

  return (
    <>
      {analyticsEnabled ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics-consent"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `,
            }}
          />
        </>
      ) : null}

      {hydrated && consent === "unset" ? (
        <div className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6">
          <div className="mx-auto max-w-5xl rounded-3xl border border-[#D7E1DB] bg-white/95 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur md:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7E8B84]">
                  {t("eyebrow")}
                </p>
                <h2 className="mt-2 text-xl font-bold text-[#004E34]">
                  {t("title")}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#52615A]">
                  {t("description")}{" "}
                  <Link
                    href="/cookie-policy"
                    className="font-semibold text-[#004E34] underline decoration-[#004E34]/30 underline-offset-4"
                  >
                    {t("learnMore")}
                  </Link>
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleNecessaryOnly}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D7E1DB] whitespace-nowrap px-6 text-sm font-semibold text-[#355246] transition hover:border-[#004E34] hover:text-[#004E34]"
                >
                  {t("necessaryOnly")}
                </button>
                <button
                  type="button"
                  onClick={handleAccept}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#004E34] px-6 whitespace-nowrap text-sm font-semibold text-white transition hover:bg-[#006B47]"
                >
                  {t("acceptAll")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import { useTransition } from "react";
import { setLocale } from "@/actions/set-locale";
import { twMerge } from "tailwind-merge";

const locales = ["en", "az", "ru"] as const;
type Locale = (typeof locales)[number];

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(locale: Locale) {
    startTransition(() => {
      setLocale(locale);
    });
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span>/</span>}
          <button
            onClick={() => handleChange(locale)}
            disabled={isPending || currentLocale === locale}
            className={twMerge(
              "cursor-pointer text-[#6F7A72] font-medium text-sm transition-opacity",
              currentLocale === locale
                ? "font-bold"
                : "opacity-60 hover:opacity-100",
            )}
          >
            {locale.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

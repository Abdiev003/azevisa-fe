"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";

const MENU_ITEMS = [
  { id: "home", key: "home", path: "/" },
  { id: "visa-types", key: "visaTypes", path: "/visa-types" },
  {
    id: "eligible-countries",
    key: "eligibleCountries",
    path: "/eligible-countries",
  },
  { id: "check-status", key: "checkStatus", path: "/check-status" },
  { id: "blog", key: "blog", path: "/blog" },
  { id: "contact", key: "contact", path: "/contact-us" },
] as const;

export function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Header.nav");
  const tH = useTranslations("Header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = useMemo(() => {
    const activeItem = MENU_ITEMS.find((item) => item.path === pathname);
    return activeItem ? activeItem.id : null;
  }, [pathname]);

  return (
    <header className="relative flex items-center justify-between w-full px-6 py-4 bg-white">
      {/* Logo + Desktop nav */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-[#004E34] font-bold text-2xl">azEvisa</h1>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-x-6">
            {MENU_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={twMerge(
                    "text-[#6F7A72] text-base font-normal",
                    isActive === item.id
                      ? "text-[#004E34] font-semibold underline underline-offset-8 decoration-[#795900]"
                      : "",
                  )}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop right */}
      <div className="items-center hidden gap-4 xl:flex">
        <LanguageSwitcher currentLocale={locale as "en" | "az" | "ru"} />
        <Button onClick={() => router.push("/apply")}>
          {tH("applyNow")}
        </Button>
      </div>

      {/* Tablet / Mobile right */}
      <div className="flex items-center gap-3 xl:hidden">
        <LanguageSwitcher currentLocale={locale as "en" | "az" | "ru"} />

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="p-2 text-[#004E34]"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile / Tablet dropdown */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-md top-full xl:hidden">
          <nav className="px-6 py-4">
            <ul className="flex flex-col gap-y-5">
              {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={twMerge(
                      "text-[#6F7A72] text-base font-normal",
                      isActive === item.id
                        ? "text-[#004E34] font-semibold"
                        : "",
                    )}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 mt-6">
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/apply");
                }}
                className="w-full"
              >
                {tH("applyNow")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

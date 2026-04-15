"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";
import { User } from "@/data/user";

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

export function Header({
  locale,
  isLoggedIn,
  user,
}: {
  locale: string;
  isLoggedIn: boolean;
  user: User | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Header.nav");
  const tH = useTranslations("Header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const desktopProfileRef = useRef<HTMLDivElement>(null);
  const mobileProfileRef = useRef<HTMLDivElement>(null);

  const isActive = useMemo(() => {
    const activeItem = MENU_ITEMS.find((item) => item.path === pathname);
    return activeItem ? activeItem.id : null;
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const insideDesktop = desktopProfileRef.current?.contains(target);
      const insideMobile = mobileProfileRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {isLoggedIn && user ? (
          <>
            <Button onClick={() => router.push("/apply")}>
              {tH("applyNow")}
            </Button>
            <div ref={desktopProfileRef} className="relative">
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#004E34]/10 hover:bg-[#004E34]/20 transition-colors text-[#004E34]"
                aria-label="Profile menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border border-gray-100 shadow-lg w-44 rounded-xl">
                  <span
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#1F2937] hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                    {user.full_name}
                  </span>
                  <div className="border-t border-gray-100" />
                  <LogoutButton className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </LogoutButton>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-sm font-semibold text-[#004E34] border border-[#004E34] px-4 py-2 rounded-md hover:bg-[#004E34]/5 transition-colors"
            >
              {tH("signIn")}
            </Link>
            <Button onClick={() => router.push("/apply")}>
              {tH("applyNow")}
            </Button>
          </>
        )}
      </div>

      {/* Tablet / Mobile right */}
      <div className="flex items-center gap-3 xl:hidden">
        <LanguageSwitcher currentLocale={locale as "en" | "az" | "ru"} />

        {isLoggedIn && user ? (
          <div ref={mobileProfileRef} className="relative">
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#004E34]/10 hover:bg-[#004E34]/20 transition-colors text-[#004E34]"
              aria-label="Profile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border border-gray-100 shadow-lg w-44 rounded-xl">
                <span
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#1F2937] hover:bg-gray-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  {user.full_name}
                </span>
                <div className="border-t border-gray-100" />
                <LogoutButton className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </LogoutButton>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden sm:block">
            <Link
              href="/login"
              className="text-sm font-semibold text-[#004E34] border border-[#004E34] px-4 py-2 rounded-md hover:bg-[#004E34]/5 transition-colors"
            >
              {tH("signIn")}
            </Link>
          </div>
        )}

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

            <div className="flex flex-col gap-3 mt-6 sm:hidden">
              {isLoggedIn ? (
                <LogoutButton className="w-full py-2.5 text-sm font-semibold text-red-500 border border-red-200 rounded-md hover:bg-red-50 transition-colors">
                  Logout
                </LogoutButton>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-2.5 text-sm font-semibold text-center text-[#004E34] border border-[#004E34] rounded-md hover:bg-[#004E34]/5 transition-colors"
                >
                  {tH("signIn")}
                </Link>
              )}
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

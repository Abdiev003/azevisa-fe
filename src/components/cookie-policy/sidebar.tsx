"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const SECTIONS = [
  { id: "what-are-cookies", label: "What Are Cookies" },
  { id: "how-we-use", label: "How We Use Cookies" },
  { id: "types-of-cookies", label: "Types of Cookies" },
  { id: "third-party", label: "Third-Party Cookies" },
  { id: "cookie-duration", label: "Cookie Duration" },
  { id: "managing-cookies", label: "Managing Cookies" },
  { id: "browser-settings", label: "Browser Settings" },
  { id: "updates", label: "Updates to This Policy" },
  { id: "contact", label: "Contact Us" },
];

export function CookiePolicySidebar() {
  const [active, setActive] = useState<string>("what-are-cookies");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-24">
        <p className="text-xs font-bold tracking-widest uppercase text-[#004E34] mb-4">
          On This Page
        </p>
        <ol className="flex flex-col gap-2">
          {SECTIONS.map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={twMerge(
                  "flex items-center gap-2 text-sm transition-colors",
                  active === id
                    ? "text-[#004E34] font-semibold"
                    : "text-[#6F7A72] hover:text-[#004E34]",
                )}
              >
                <span
                  className={twMerge(
                    "text-xs w-5 shrink-0",
                    active === id
                      ? "text-[#004E34] font-bold"
                      : "text-[#94A3B8]",
                  )}
                >
                  {i + 1}.
                </span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

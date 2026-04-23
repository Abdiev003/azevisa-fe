"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const SECTIONS = [
  { id: "introduction-acceptance", label: "Introduction and Acceptance" },
  { id: "description-of-services", label: "Description of Services" },
  { id: "eligibility", label: "Eligibility" },
  { id: "user-responsibilities", label: "User Responsibilities" },
  { id: "application-process", label: "Application Process" },
  { id: "fees-payment", label: "Fees and Payment" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "prohibited-uses", label: "Prohibited Uses" },
  { id: "disclaimer", label: "Disclaimer of Warranties" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "third-party-links", label: "Third-Party Links and Services" },
  { id: "service-modifications", label: "Modifications to Services" },
  { id: "governing-law", label: "Governing Law" },
  { id: "terms-changes", label: "Changes to These Terms" },
  { id: "contact", label: "Contact Information" },
];

export function TermsOfUseSidebar() {
  const [active, setActive] = useState<string>("introduction-acceptance");

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

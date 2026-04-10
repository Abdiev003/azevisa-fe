"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-100 overflow-hidden shadow-sm bg-white">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span
              className={`font-semibold text-sm transition-colors ${
                open === i ? "text-[#004E34]" : "text-[#1F2937]"
              }`}
            >
              {item.q}
            </span>
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold border transition-colors ${
                open === i
                  ? "border-[#004E34] text-[#004E34] bg-[#004E34]/5"
                  : "border-gray-200 text-gray-400"
              }`}
            >
              {open === i ? "×" : "+"}
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-sm text-[#6F7A72] leading-relaxed border-t border-gray-50 pt-4">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

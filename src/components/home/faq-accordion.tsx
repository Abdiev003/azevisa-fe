"use client";

import { useState } from "react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  category_display: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col overflow-hidden bg-white border border-gray-100 divide-y divide-gray-100 shadow-sm rounded-2xl">
      {items.map((item, i) => (
        <div key={item.id}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex items-center justify-between w-full gap-4 px-6 py-5 text-left transition-colors cursor-pointer hover:bg-gray-50"
          >
            <span
              className={`font-semibold text-sm transition-colors ${
                open === i ? "text-[#004E34]" : "text-[#1F2937]"
              }`}
            >
              {item.question}
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
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

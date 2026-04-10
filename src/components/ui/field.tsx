import { twMerge } from "tailwind-merge";

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#1F2937]">{label}</label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}

export function inputClass(hasError?: boolean) {
  return twMerge(
    "w-full rounded-lg border px-4 py-2.5 text-sm text-[#1F2937] outline-none transition-colors placeholder:text-[#94A3B8]",
    "focus:border-[#004E34] focus:ring-2 focus:ring-[#004E34]/10",
    hasError
      ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
      : "border-gray-200 bg-white",
  );
}

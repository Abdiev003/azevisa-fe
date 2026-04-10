"use client";

import { twMerge } from "tailwind-merge";

export function Button({
  children,
  onClick,
  disabled = false,
  className,
}: Readonly<{
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "px-6 py-2 bg-[#004E34] text-base font-semibold cursor-pointer text-white rounded-md hover:bg-[#003322] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors",
        className,
      )}
    >
      {children}
    </button>
  );
}

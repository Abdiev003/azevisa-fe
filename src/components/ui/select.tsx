import * as React from "react";
import { twMerge } from "tailwind-merge";
import { inputClass } from "@/components/ui/field";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={twMerge(inputClass(hasError), "bg-white", className)}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { inputClass } from "@/components/ui/field";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(inputClass(hasError), className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

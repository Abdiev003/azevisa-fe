import * as React from "react";
import { twMerge } from "tailwind-merge";
import { inputClass } from "@/components/ui/field";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={twMerge(inputClass(hasError), "resize-none", className)}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

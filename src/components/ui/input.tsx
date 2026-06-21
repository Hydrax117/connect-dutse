import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[#1C1917]">
            {label}
            {props.required && (
              <span className="ml-1 text-[#B91C1C]" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={[
            "h-12 w-full rounded-[12px] border bg-white px-4 text-sm text-[#1C1917]",
            "transition-colors duration-150 placeholder:text-[#A8A29E]",
            "focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D] focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-[#B91C1C] focus:ring-[#B91C1C]" : "border-[#E7E5E4]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-[#B91C1C]">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-[#57534E]">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

import * as React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-[#14532D] text-white hover:bg-[#166534] focus-visible:ring-[#14532D]",
  secondary:
    "border border-[#14532D] text-[#14532D] bg-transparent hover:bg-[#f0fdf4] focus-visible:ring-[#14532D]",
  ghost: "text-[#57534E] bg-transparent hover:bg-[#F3EEE4] focus-visible:ring-[#57534E]",
  danger: "bg-[#B91C1C] text-white hover:bg-[#991B1B] focus-visible:ring-[#B91C1C]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled ?? loading}
      aria-busy={loading}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-[12px] font-medium",
        "transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none",
        "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

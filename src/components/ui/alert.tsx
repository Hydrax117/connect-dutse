import * as React from "react";

type AlertVariant = "error" | "success" | "warning" | "info";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
}

const styles: Record<AlertVariant, { wrapper: string; icon: string }> = {
  error: { wrapper: "bg-red-50 border-red-200 text-[#B91C1C]", icon: "✕" },
  success: { wrapper: "bg-green-50 border-green-200 text-[#15803D]", icon: "✓" },
  warning: { wrapper: "bg-amber-50 border-amber-200 text-[#B45309]", icon: "!" },
  info: { wrapper: "bg-blue-50 border-blue-200 text-blue-700", icon: "i" },
};

export function Alert({ variant = "info", title, children }: AlertProps) {
  const s = styles[variant];
  return (
    <div role="alert" className={`flex gap-3 rounded-[12px] border p-4 text-sm ${s.wrapper}`}>
      <span className="mt-0.5 shrink-0 font-bold" aria-hidden="true">
        {s.icon}
      </span>
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <p>{children}</p>
      </div>
    </div>
  );
}

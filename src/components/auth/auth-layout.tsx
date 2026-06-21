import type { ReactNode } from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF7F2] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-[#14532D]">Connect Dutse</span>
          </Link>
        </div>

        {/* Card */}
        <div
          className="rounded-[16px] bg-white p-8"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
        >
          <h1 className="mb-1 text-2xl font-bold text-[#1C1917]">{title}</h1>
          {subtitle && <p className="mb-6 text-sm text-[#57534E]">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

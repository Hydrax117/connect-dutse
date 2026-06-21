import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const metadata: Metadata = {
  title: { default: "Connect Dutse", template: "%s | Connect Dutse" },
  description: "Find trusted services and products near you in Dutse, Jigawa State, Nigeria.",
  keywords: ["marketplace", "dutse", "jigawa", "nigeria", "buy", "sell", "services"],
  openGraph: {
    title: "Connect Dutse",
    description: "Find trusted services and products near you in Dutse.",
    type: "website",
    locale: "en_NG",
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      {" "}
      <body className="flex min-h-full flex-col antialiased">
        {" "}
        <Providers>{children}</Providers>{" "}
      </body>{" "}
    </html>
  );
}

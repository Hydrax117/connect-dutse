import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
/** * Merges Tailwind CSS class names intelligently. * Combines clsx for conditional classes and tailwind-merge to resolve conflicts. */ export function cn(
  ...inputs: ClassValue[]
) {
  return twMerge(clsx(inputs));
}
/** * Formats a price number to Nigerian Naira currency string. */ export function formatPrice(
  amount: number,
): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
/** * Generates a URL-friendly slug from a string. */ export function slugify(
  text: string,
): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
/** * Truncates a string to a given length and appends ellipsis. */ export function truncate(
  text: string,
  maxLength: number,
): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}
/** * Returns a relative time string (e.g. "2 days ago"). */ export function timeAgo(
  date: Date | string,
): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

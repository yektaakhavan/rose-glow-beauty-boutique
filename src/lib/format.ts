const numberFormatter = new Intl.NumberFormat("fa-IR");

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** Prices are stored in Toman. */
export function formatPrice(value: number): string {
  return `${numberFormatter.format(value)} تومان`;
}

export function formatPercent(value: number): string {
  return `${numberFormatter.format(value)}٪`;
}

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** Convert Persian / Arabic-Indic digits to ASCII digits (for form inputs). */
export function normalizeDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
}

export function formatRating(value: number): string {
  return new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(value);
}

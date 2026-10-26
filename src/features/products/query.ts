import { getBrand } from "@/data/catalog";
import type { CategorySlug, NeedSlug, Product } from "@/types/catalog";
import { getBaseStock, getMinPrice, getRatingSummary, isOnSale } from "./selectors";

export type SortKey = "newest" | "price-asc" | "price-desc" | "bestselling" | "rating";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "bestselling", label: "پرفروش‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "rating", label: "بیشترین امتیاز (نمونه)" },
];

export const PAGE_SIZE = 12;

export interface ProductQuery {
  q: string;
  categories: string[];
  brands: string[];
  need?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock: boolean;
  onSale: boolean;
  minRating?: number;
  sort: SortKey;
  page: number;
}

export const DEFAULT_QUERY: ProductQuery = {
  q: "",
  categories: [],
  brands: [],
  inStock: false,
  onSale: false,
  sort: "bestselling",
  page: 1,
};

/** Normalise Persian/Arabic variants of letters so search is forgiving. */
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u200c\u200f\u064B-\u065F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesSearch(product: Product, q: string): boolean {
  const query = normalizeText(q);
  if (!query) return true;
  const brand = getBrand(product.brandId);
  const haystack = normalizeText(
    [product.name, product.productType, brand?.name ?? "", brand?.latin ?? "", product.shortDescription].join(" "),
  );
  return query.split(" ").every((term) => haystack.includes(term));
}

/** Available stock = base stock minus units consumed by local demo orders. */
export type StockLookup = (product: Product) => number;

export function filterProducts(
  list: Product[],
  query: ProductQuery,
  stockOf: StockLookup = (p) => getBaseStock(p),
): Product[] {
  return list.filter((p) => {
    if (!matchesSearch(p, query.q)) return false;
    if (query.categories.length && !query.categories.includes(p.category)) return false;
    if (query.brands.length && !query.brands.includes(p.brandId)) return false;
    if (query.need && !p.needs.includes(query.need as NeedSlug)) return false;
    const price = getMinPrice(p);
    if (query.minPrice !== undefined && price < query.minPrice) return false;
    if (query.maxPrice !== undefined && price > query.maxPrice) return false;
    if (query.inStock && stockOf(p) <= 0) return false;
    if (query.onSale && !isOnSale(p)) return false;
    if (query.minRating !== undefined && getRatingSummary(p).average < query.minRating) return false;
    return true;
  });
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "price-asc":
      return sorted.sort((a, b) => getMinPrice(a) - getMinPrice(b));
    case "price-desc":
      return sorted.sort((a, b) => getMinPrice(b) - getMinPrice(a));
    case "rating":
      return sorted.sort((a, b) => getRatingSummary(b).average - getRatingSummary(a).average || b.soldCount - a.soldCount);
    case "bestselling":
    default:
      return sorted.sort((a, b) => b.soldCount - a.soldCount);
  }
}

export function queryProducts(list: Product[], query: ProductQuery, stockOf?: StockLookup) {
  const filtered = sortProducts(filterProducts(list, query, stockOf), query.sort);
  const visible = filtered.slice(0, query.page * PAGE_SIZE);
  return { total: filtered.length, items: visible, hasMore: visible.length < filtered.length };
}

// ───────── URL search params <-> query ─────────

export interface ShopSearch {
  q?: string;
  cat?: string;
  brand?: string;
  need?: string;
  min?: number;
  max?: number;
  stock?: boolean;
  sale?: boolean;
  rating?: number;
  sort?: SortKey;
  page?: number;
}

const SORT_KEYS = new Set<SortKey>(SORT_OPTIONS.map((o) => o.value));

function asNumber(v: unknown): number | undefined {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : undefined;
}

function asString(v: unknown): string | undefined {
  if (typeof v === "number") return String(v);
  return typeof v === "string" && v.trim() !== "" ? v : undefined;
}

function asBool(v: unknown): boolean | undefined {
  return v === true || v === "true" || v === 1 || v === "1" ? true : undefined;
}

/** Tolerant search-param parser: unknown or malformed values are dropped, never thrown. */
export function parseShopSearch(raw: Record<string, unknown>): ShopSearch {
  const sort = asString(raw.sort);
  const page = asNumber(raw.page);
  return {
    q: asString(raw.q),
    cat: asString(raw.cat),
    brand: asString(raw.brand),
    need: asString(raw.need),
    min: asNumber(raw.min),
    max: asNumber(raw.max),
    stock: asBool(raw.stock),
    sale: asBool(raw.sale),
    rating: asNumber(raw.rating),
    sort: sort && SORT_KEYS.has(sort as SortKey) ? (sort as SortKey) : undefined,
    page: page && page > 1 ? Math.floor(page) : undefined,
  };
}

export function searchToQuery(search: ShopSearch, fixedCategory?: CategorySlug): ProductQuery {
  const categories = fixedCategory ? [fixedCategory] : (search.cat?.split(",").filter(Boolean) ?? []);
  return {
    q: search.q ?? "",
    categories,
    brands: search.brand?.split(",").filter(Boolean) ?? [],
    need: search.need,
    minPrice: search.min,
    maxPrice: search.max,
    inStock: !!search.stock,
    onSale: !!search.sale,
    minRating: search.rating,
    sort: search.sort ?? "bestselling",
    page: Math.max(1, Math.min(50, search.page ?? 1)),
  };
}

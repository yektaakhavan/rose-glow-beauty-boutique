import { products } from "@/data/products";
import { getSampleReviews } from "@/data/reviews";
import type { Product, ProductVariant, RatingSummary } from "@/types/catalog";

const bySlug = new Map(products.map((p) => [p.slug, p]));
const byId = new Map(products.map((p) => [p.id, p]));

export function getProductBySlug(slug: string): Product | undefined {
  return bySlug.get(slug);
}

export function getProductById(id: string): Product | undefined {
  return byId.get(id);
}

export function getVariant(product: Product, variantId?: string | null): ProductVariant | undefined {
  if (!product.variants) return undefined;
  return product.variants.options.find((v) => v.id === variantId);
}

/** The variant selected by default: first one in stock, otherwise the first one. */
export function getDefaultVariant(product: Product): ProductVariant | undefined {
  if (!product.variants) return undefined;
  return product.variants.options.find((v) => v.stock > 0) ?? product.variants.options[0];
}

export interface PriceInfo {
  price: number;
  compareAtPrice?: number;
  discountPercent: number;
}

export function getPriceInfo(product: Product, variantId?: string | null): PriceInfo {
  const variant = getVariant(product, variantId) ?? getDefaultVariant(product);
  const price = variant?.price ?? product.price;
  const compareAtPrice = variant ? variant.compareAtPrice : product.compareAtPrice;
  const discountPercent =
    compareAtPrice && compareAtPrice > price ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;
  return { price, compareAtPrice: discountPercent > 0 ? compareAtPrice : undefined, discountPercent };
}

/** Base stock from catalog data (before local demo orders are subtracted). */
export function getBaseStock(product: Product, variantId?: string | null): number {
  if (product.variants) {
    if (variantId) return getVariant(product, variantId)?.stock ?? 0;
    return product.variants.options.reduce((sum, v) => sum + v.stock, 0);
  }
  return product.stock;
}

export function isOnSale(product: Product): boolean {
  if (product.variants) return product.variants.options.some((v) => v.compareAtPrice && v.compareAtPrice > v.price);
  return !!product.compareAtPrice && product.compareAtPrice > product.price;
}

/** Lowest price across variants — used for filtering and "from" labels. */
export function getMinPrice(product: Product): number {
  if (product.variants) return Math.min(...product.variants.options.map((v) => v.price));
  return product.price;
}

export function getRatingSummary(product: Product): RatingSummary {
  const reviews = getSampleReviews(product.id, product.category);
  if (reviews.length === 0) return { average: 0, count: 0 };
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return { average: Math.round((total / reviews.length) * 10) / 10, count: reviews.length };
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, limit);
}

export function getComplementaryProducts(product: Product): Product[] {
  return (product.complementary ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((p): p is Product => !!p);
}

export function getBestSellers(limit = 8): Product[] {
  return [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

export function getOnSale(limit?: number): Product[] {
  const list = products
    .filter(isOnSale)
    .sort((a, b) => getPriceInfo(b).discountPercent - getPriceInfo(a).discountPercent);
  return limit ? list.slice(0, limit) : list;
}

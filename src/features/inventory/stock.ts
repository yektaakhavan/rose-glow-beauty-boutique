import type { Product } from "@/types/catalog";
import { lineKey } from "@/features/cart/pricing";
import { getBaseStock } from "@/features/products/selectors";

/** Units consumed by demo orders, keyed by cart line key (product[::variant]). */
export type ConsumedStock = Record<string, number>;

/**
 * Available stock for a product / variant after subtracting units already
 * "sold" through demo orders placed in this browser.
 */
export function getAvailableStock(product: Product, variantId: string | undefined, consumed: ConsumedStock): number {
  if (product.variants) {
    if (!variantId) {
      return product.variants.options.reduce(
        (sum, v) => sum + Math.max(0, v.stock - (consumed[lineKey(product.id, v.id)] ?? 0)),
        0,
      );
    }
    return Math.max(0, getBaseStock(product, variantId) - (consumed[lineKey(product.id, variantId)] ?? 0));
  }
  return Math.max(0, getBaseStock(product) - (consumed[lineKey(product.id)] ?? 0));
}

export type StockStatus = "out" | "low" | "in";

export const LOW_STOCK_THRESHOLD = 3;

export function getStockStatus(available: number): StockStatus {
  if (available <= 0) return "out";
  if (available <= LOW_STOCK_THRESHOLD) return "low";
  return "in";
}

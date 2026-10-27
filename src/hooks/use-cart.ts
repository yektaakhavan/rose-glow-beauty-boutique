import { useMemo } from "react";
import { buildCartLines, computeTotals, DEFAULT_SHIPPING, type ShippingMethod } from "@/features/cart/pricing";
import { getAvailableStock } from "@/features/inventory/stock";
import type { Product } from "@/types/catalog";
import { useCartStore } from "@/store/cart";
import { useOrdersStore } from "@/store/orders";

export function useCartLines() {
  const items = useCartStore((s) => s.items);
  return useMemo(() => buildCartLines(items), [items]);
}

export function useCartSummary(method: ShippingMethod = DEFAULT_SHIPPING) {
  const lines = useCartLines();
  const totals = useMemo(() => computeTotals(lines, method), [lines, method]);
  return { lines, totals };
}

export function useCartCount() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
}

export function useAvailableStock(product: Product, variantId?: string) {
  const consumed = useOrdersStore((s) => s.consumed);
  return getAvailableStock(product, variantId, consumed);
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { lineKey, MAX_QTY_PER_LINE, type CartItem } from "@/features/cart/pricing";
import { getAvailableStock } from "@/features/inventory/stock";
import { getProductById } from "@/features/products/selectors";
import { browserStorage, STORAGE_KEYS } from "@/lib/storage";
import { useOrdersStore } from "./orders";

export type AddToCartResult =
  | { ok: true; quantity: number; capped: boolean }
  | { ok: false; reason: "not-found" | "out-of-stock" | "limit" };

interface CartState {
  items: CartItem[];
  /** Adds quantity to a line, never exceeding available stock or the per-line limit. */
  add: (productId: string, variantId: string | undefined, quantity?: number) => AddToCartResult;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

/** Maximum units a customer may hold in one line right now. */
export function maxQuantityFor(productId: string, variantId: string | undefined): number {
  const product = getProductById(productId);
  if (!product) return 0;
  const available = getAvailableStock(product, variantId, useOrdersStore.getState().consumed);
  return Math.min(MAX_QTY_PER_LINE, available);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (productId, variantId, quantity = 1) => {
        const product = getProductById(productId);
        if (!product) return { ok: false, reason: "not-found" };
        if (product.variants && !variantId) return { ok: false, reason: "not-found" };
        const max = maxQuantityFor(productId, variantId);
        if (max <= 0) return { ok: false, reason: "out-of-stock" };
        const key = lineKey(productId, variantId);
        const items = get().items;
        const existing = items.find((i) => lineKey(i.productId, i.variantId) === key);
        const current = existing?.quantity ?? 0;
        if (current >= max) return { ok: false, reason: "limit" };
        const next = Math.min(max, current + Math.max(1, Math.floor(quantity)));
        set({
          items: existing
            ? items.map((i) => (lineKey(i.productId, i.variantId) === key ? { ...i, quantity: next } : i))
            : [...items, { productId, variantId, quantity: next }],
        });
        return { ok: true, quantity: next, capped: next < current + quantity };
      },
      setQuantity: (key, quantity) => {
        set({
          items: get().items.map((i) => {
            if (lineKey(i.productId, i.variantId) !== key) return i;
            const max = Math.max(1, maxQuantityFor(i.productId, i.variantId));
            return { ...i, quantity: Math.max(1, Math.min(max, Math.floor(quantity))) };
          }),
        });
      },
      remove: (key) => set({ items: get().items.filter((i) => lineKey(i.productId, i.variantId) !== key) }),
      clear: () => set({ items: [] }),
    }),
    { name: STORAGE_KEYS.cart, storage: browserStorage, skipHydration: true, version: 1 },
  ),
);

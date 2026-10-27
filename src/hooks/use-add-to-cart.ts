import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { toast } from "sonner";
import { lineKey } from "@/features/cart/pricing";
import { getVariant } from "@/features/products/selectors";
import { formatNumber } from "@/lib/format";
import type { Product } from "@/types/catalog";
import { useCartStore } from "@/store/cart";
import { useOrdersStore } from "@/store/orders";
import { getBaseStock } from "@/features/products/selectors";

/** First variant that still has stock after demo orders. */
export function firstAvailableVariantId(product: Product, consumed: Record<string, number>): string | undefined {
  return product.variants?.options.find(
    (v) => getBaseStock(product, v.id) - (consumed[lineKey(product.id, v.id)] ?? 0) > 0,
  )?.id;
}

/** Adds to cart with toast feedback. Products with variants default to the first available option. */
export function useAddToCart() {
  const add = useCartStore((s) => s.add);
  const navigate = useNavigate();

  return useCallback(
    (product: Product, variantId?: string, quantity = 1): boolean => {
      const vid =
        variantId ?? (product.variants ? firstAvailableVariantId(product, useOrdersStore.getState().consumed) : undefined);
      if (product.variants && !vid) {
        toast.error("این محصول در حال حاضر ناموجود است.");
        return false;
      }
      const result = add(product.id, vid, quantity);
      const variantName = vid ? getVariant(product, vid)?.name : undefined;
      if (result.ok) {
        toast.success("به سبد خرید اضافه شد", {
          description: `${product.name}${variantName ? ` — ${variantName}` : ""} · تعداد در سبد: ${formatNumber(result.quantity)}${
            result.capped ? " (حداکثر موجودی)" : ""
          }`,
          action: { label: "مشاهده سبد", onClick: () => void navigate({ to: "/cart" }) },
        });
        return true;
      }
      if (result.reason === "limit") {
        toast.info("حداکثر تعداد قابل سفارش این محصول در سبد شماست.");
      } else {
        toast.error("این گزینه در حال حاضر ناموجود است.");
      }
      return false;
    },
    [add, navigate],
  );
}

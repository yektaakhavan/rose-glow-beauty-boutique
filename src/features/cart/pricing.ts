import type { Product } from "@/types/catalog";
import { getPriceInfo, getProductById, getVariant } from "@/features/products/selectors";

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export type ShippingMethodId = "post" | "tipax" | "courier";

export interface ShippingMethod {
  id: ShippingMethodId;
  name: string;
  description: string;
  eta: string;
  cost: number;
  /** Only available for Tehran addresses */
  tehranOnly?: boolean;
}

/** Orders whose subtotal reaches this amount (Toman) get free standard post. */
export const FREE_SHIPPING_THRESHOLD = 1_500_000;
export const MAX_QTY_PER_LINE = 10;

export const SHIPPING_METHODS: ShippingMethod[] = [
  { id: "post", name: "پست پیشتاز", description: "ارسال به سراسر کشور", eta: "۳ تا ۵ روز کاری", cost: 75_000 },
  { id: "tipax", name: "تیپاکس", description: "ارسال سریع به مراکز استان‌ها", eta: "۱ تا ۳ روز کاری", cost: 110_000 },
  {
    id: "courier",
    name: "پیک تهران",
    description: "فقط برای آدرس‌های شهر تهران",
    eta: "همان روز یا روز بعد",
    cost: 60_000,
    tehranOnly: true,
  },
];

export interface CartLine {
  key: string;
  product: Product;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  unitCompareAt?: number;
  lineTotal: number;
  lineSavings: number;
}

export function lineKey(productId: string, variantId?: string) {
  return variantId ? `${productId}::${variantId}` : productId;
}

export function buildCartLines(items: CartItem[]): CartLine[] {
  const lines: CartLine[] = [];
  for (const item of items) {
    const product = getProductById(item.productId);
    if (!product) continue;
    const variant = getVariant(product, item.variantId);
    const { price, compareAtPrice } = getPriceInfo(product, item.variantId);
    const quantity = Math.max(1, Math.min(MAX_QTY_PER_LINE, Math.floor(item.quantity)));
    lines.push({
      key: lineKey(item.productId, item.variantId),
      product,
      variantId: item.variantId,
      variantName: variant?.name,
      quantity,
      unitPrice: price,
      unitCompareAt: compareAtPrice,
      lineTotal: price * quantity,
      lineSavings: compareAtPrice ? (compareAtPrice - price) * quantity : 0,
    });
  }
  return lines;
}

export function getShippingCost(method: ShippingMethod, subtotal: number): number {
  if (subtotal <= 0) return 0;
  if (method.id === "post" && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return method.cost;
}

export function isTehran(city: string): boolean {
  return city.trim().replace(/\s+/g, "") === "تهران" || city.trim().toLowerCase() === "tehran";
}

export function availableShippingMethods(city: string): ShippingMethod[] {
  return SHIPPING_METHODS.filter((m) => !m.tehranOnly || isTehran(city));
}

export interface CartTotals {
  itemCount: number;
  /** Sum of list (pre-discount) prices */
  originalSubtotal: number;
  /** Product discounts */
  savings: number;
  /** What the customer pays for products */
  subtotal: number;
  shipping: number;
  total: number;
  remainingForFreeShipping: number;
}

export function computeTotals(lines: CartLine[], method: ShippingMethod = SHIPPING_METHODS[0]): CartTotals {
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const savings = lines.reduce((s, l) => s + l.lineSavings, 0);
  const itemCount = lines.reduce((s, l) => s + l.quantity, 0);
  const shipping = getShippingCost(method, subtotal);
  return {
    itemCount,
    originalSubtotal: subtotal + savings,
    savings,
    subtotal,
    shipping,
    total: subtotal + shipping,
    remainingForFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
  };
}

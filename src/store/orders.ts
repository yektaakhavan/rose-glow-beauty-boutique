import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getBrand } from "@/data/catalog";
import type { CartLine, CartTotals, ShippingMethodId } from "@/features/cart/pricing";
import type { ConsumedStock } from "@/features/inventory/stock";
import { browserStorage, STORAGE_KEYS } from "@/lib/storage";

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  processing: "در حال پردازش",
  shipped: "ارسال‌شده",
  delivered: "تحویل‌شده",
  cancelled: "لغوشده",
};

export interface OrderLine {
  key: string;
  productId: string;
  slug: string;
  name: string;
  brandName: string;
  image: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
}

export interface OrderAddress {
  province: string;
  city: string;
  address: string;
  postalCode: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: OrderCustomer;
  address: OrderAddress;
  shippingMethodId: ShippingMethodId;
  shippingName: string;
  notes?: string;
  lines: OrderLine[];
  totals: CartTotals;
  /** Always true in this build: no payment or fulfilment happens. */
  demo: true;
}

export interface PlaceOrderInput {
  customer: OrderCustomer;
  address: OrderAddress;
  shippingMethodId: ShippingMethodId;
  shippingName: string;
  notes?: string;
  lines: CartLine[];
  totals: CartTotals;
}

interface OrdersState {
  orders: Order[];
  consumed: ConsumedStock;
  placeOrder: (input: PlaceOrderInput) => Order;
}

function createOrderId(existing: Order[]): string {
  const n = 10_241 + existing.length;
  const suffix = Math.floor(Math.random() * 90 + 10);
  return `RZ-${n}${suffix}`;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      consumed: {},
      placeOrder: (input) => {
        const { orders, consumed } = get();
        const order: Order = {
          id: createOrderId(orders),
          createdAt: new Date().toISOString(),
          status: "processing",
          customer: input.customer,
          address: input.address,
          shippingMethodId: input.shippingMethodId,
          shippingName: input.shippingName,
          notes: input.notes,
          lines: input.lines.map((l) => ({
            key: l.key,
            productId: l.product.id,
            slug: l.product.slug,
            name: l.product.name,
            brandName: getBrand(l.product.brandId)?.name ?? "",
            image: l.product.images[0] ?? "",
            variantName: l.variantName,
            quantity: l.quantity,
            unitPrice: l.unitPrice,
            lineTotal: l.lineTotal,
          })),
          totals: input.totals,
          demo: true,
        };
        const nextConsumed = { ...consumed };
        for (const l of input.lines) nextConsumed[l.key] = (nextConsumed[l.key] ?? 0) + l.quantity;
        set({ orders: [order, ...orders], consumed: nextConsumed });
        return order;
      },
    }),
    { name: STORAGE_KEYS.orders, storage: browserStorage, skipHydration: true, version: 1 },
  ),
);

import { createJSONStorage, type StateStorage } from "zustand/middleware";

/**
 * Browser-only persistence for the demo store. On the server (SSR) every read
 * returns null so the first client render matches the server HTML; stores are
 * rehydrated explicitly after mount (see useHydrateStores).
 *
 * To move to a real API later, replace this storage (or the store actions)
 * with network calls — components only talk to the stores.
 */
const memory: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const browserStorage = createJSONStorage(() =>
  typeof window === "undefined" ? memory : window.localStorage,
);

export const STORAGE_KEYS = {
  cart: "rozhan.cart.v1",
  wishlist: "rozhan.wishlist.v1",
  orders: "rozhan.orders.v1",
  account: "rozhan.account.v1",
  newsletter: "rozhan.newsletter.v1",
} as const;

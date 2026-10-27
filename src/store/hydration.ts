import { useEffect } from "react";
import { create } from "zustand";
import { useAccountStore } from "./account";
import { useCartStore } from "./cart";
import { useOrdersStore } from "./orders";
import { useWishlistStore } from "./wishlist";

const useHydrationStore = create<{ hydrated: boolean }>(() => ({ hydrated: false }));

/** Call once in the app shell: reads saved cart/wishlist/orders after mount. */
export function useHydrateStores() {
  useEffect(() => {
    void Promise.all([
      useOrdersStore.persist.rehydrate(),
      useCartStore.persist.rehydrate(),
      useWishlistStore.persist.rehydrate(),
      useAccountStore.persist.rehydrate(),
    ]).finally(() => useHydrationStore.setState({ hydrated: true }));
  }, []);
}

/** False during SSR and the first client render; true once saved data is loaded. */
export function useStoresHydrated() {
  return useHydrationStore((s) => s.hydrated);
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { browserStorage, STORAGE_KEYS } from "@/lib/storage";

interface WishlistState {
  ids: string[];
  /** Returns true when the product is now in the wishlist. */
  toggle: (productId: string) => boolean;
  remove: (productId: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        const has = get().ids.includes(productId);
        set({ ids: has ? get().ids.filter((id) => id !== productId) : [productId, ...get().ids] });
        return !has;
      },
      remove: (productId) => set({ ids: get().ids.filter((id) => id !== productId) }),
    }),
    { name: STORAGE_KEYS.wishlist, storage: browserStorage, skipHydration: true, version: 1 },
  ),
);

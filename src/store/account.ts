import { create } from "zustand";
import { persist } from "zustand/middleware";
import { browserStorage, STORAGE_KEYS } from "@/lib/storage";
import type { OrderAddress } from "./orders";

/**
 * Demo profile kept only in this browser. There is no login, no password and
 * nothing is sent to a server.
 */
export interface Profile {
  fullName: string;
  email: string;
  phone: string;
}

export interface SavedAddress extends OrderAddress {
  id: string;
  label: string;
}

interface AccountState {
  profile: Profile | null;
  addresses: SavedAddress[];
  newsletterEmail: string | null;
  saveProfile: (profile: Profile) => void;
  addAddress: (address: Omit<SavedAddress, "id">) => void;
  removeAddress: (id: string) => void;
  subscribe: (email: string) => void;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      profile: null,
      addresses: [],
      newsletterEmail: null,
      saveProfile: (profile) => set({ profile }),
      addAddress: (address) =>
        set({ addresses: [...get().addresses, { ...address, id: `addr-${Date.now().toString(36)}` }] }),
      removeAddress: (id) => set({ addresses: get().addresses.filter((a) => a.id !== id) }),
      subscribe: (email) => set({ newsletterEmail: email }),
    }),
    { name: STORAGE_KEYS.account, storage: browserStorage, skipHydration: true, version: 1 },
  ),
);

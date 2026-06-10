import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TenantState = {
  id: string;
  name: string;
  slug?: string;
};

type TenantStore = {
  tenant: TenantState | null;
  setTenant: (tenant: TenantState) => void;
  clearTenant: () => void;
};

export const useTenantStore = create<TenantStore>()(
  persist(
    (set) => ({
      tenant: null,
      setTenant: (tenant) => set({ tenant }),
      clearTenant: () => set({ tenant: null }),
    }),
    { name: "ordella-admin-tenant" },
  ),
);

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TenantTheme } from "@/lib/tenant";

export type TenantState = {
  id: string;
  name: string;
  slug?: string;
  portalType: TenantTheme;
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
    { name: "ordella-tenant" },
  ),
);

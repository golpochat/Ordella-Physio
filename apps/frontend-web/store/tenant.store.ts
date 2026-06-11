import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TenantTheme } from "@/lib/tenant";

export type TenantLocalizationPrefs = {
  timezone: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: "EU" | "US";
};

export type TenantState = {
  id: string;
  name: string;
  slug?: string;
  portalType: TenantTheme;
  timezone?: string;
  currency?: string;
  localization?: TenantLocalizationPrefs;
};

type TenantStore = {
  tenant: TenantState | null;
  setTenant: (tenant: TenantState) => void;
  setTenantLocalization: (localization: TenantLocalizationPrefs) => void;
  clearTenant: () => void;
};

export const useTenantStore = create<TenantStore>()(
  persist(
    (set) => ({
      tenant: null,
      setTenant: (tenant) => set({ tenant }),
      setTenantLocalization: (localization) =>
        set((state) =>
          state.tenant
            ? {
                tenant: {
                  ...state.tenant,
                  timezone: localization.timezone,
                  currency: localization.currency,
                  localization,
                },
              }
            : state,
        ),
      clearTenant: () => set({ tenant: null }),
    }),
    { name: "ordella-tenant" },
  ),
);

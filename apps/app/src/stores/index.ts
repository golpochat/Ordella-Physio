import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/schemas";

interface AuthState {
  user: User | null;
  tenantId: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, tenantId: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tenantId: null,
      isAuthenticated: false,
      setAuth: (user, tenantId) => set({ user, tenantId, isAuthenticated: true }),
      clearAuth: () => set({ user: null, tenantId: null, isAuthenticated: false }),
    }),
    { name: "ordella-auth" },
  ),
);

interface TenantState {
  name: string | null;
  timezone: string;
  currency: string;
  setTenantProfile: (profile: { name?: string; timezone?: string; currency?: string }) => void;
}

export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      name: null,
      timezone: "UTC",
      currency: "USD",
      setTenantProfile: (profile) => set((state) => ({ ...state, ...profile })),
    }),
    { name: "ordella-tenant" },
  ),
);

type Theme = "light" | "dark" | "system";

interface UiState {
  theme: Theme;
  sidebarCollapsed: boolean;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: "system",
      sidebarCollapsed: false,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
    }),
    { name: "ordella-ui" },
  ),
);

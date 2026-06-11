import { create } from "zustand";
import { persist } from "zustand/middleware";

type UiState = {
  sidebarCollapsed: boolean;
  mobileNavOpen: boolean;
  messagingPanelOpen: boolean;
  notificationPanelOpen: boolean;
  theme: "light" | "dark" | "system";
  correlationId: string | null;
  tenantSuspended: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setMobileNavOpen: (open: boolean) => void;
  setMessagingPanelOpen: (open: boolean) => void;
  setNotificationPanelOpen: (open: boolean) => void;
  setTheme: (theme: UiState["theme"]) => void;
  setCorrelationId: (correlationId: string | null) => void;
  setTenantSuspended: (tenantSuspended: boolean) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileNavOpen: false,
      messagingPanelOpen: false,
      notificationPanelOpen: false,
      theme: "system",
      correlationId: null,
      tenantSuspended: false,
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
      setMessagingPanelOpen: (messagingPanelOpen) => set({ messagingPanelOpen }),
      setNotificationPanelOpen: (notificationPanelOpen) => set({ notificationPanelOpen }),
      setTheme: (theme) => set({ theme }),
      setCorrelationId: (correlationId) => set({ correlationId }),
      setTenantSuspended: (tenantSuspended) => set({ tenantSuspended }),
    }),
    { name: "ordella-ui", partialize: (state) => ({ theme: state.theme, sidebarCollapsed: state.sidebarCollapsed }) },
  ),
);

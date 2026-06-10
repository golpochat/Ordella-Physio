"use client";

import { useUiStore } from "@/store/ui.store";

export function useSidebar() {
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const mobileOpen = useUiStore((state) => state.mobileNavOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setSidebarCollapsed = useUiStore((state) => state.setSidebarCollapsed);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);

  return {
    collapsed,
    mobileOpen,
    toggleSidebar,
    setSidebarCollapsed,
    setMobileNavOpen,
  };
}

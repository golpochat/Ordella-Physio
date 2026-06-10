"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ToastProviderWrapper } from "@/components/ui/toast";
import { setTenantIdProvider } from "@/lib/api/client";
import { useAuthStore, useUiStore } from "@/stores";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const tenantId = useAuthStore((state) => state.tenantId);
  const theme = useUiStore((state) => state.theme);

  useEffect(() => {
    setTenantIdProvider(() => useAuthStore.getState().tenantId);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (tenantId) {
      setTenantIdProvider(() => tenantId);
    }
  }, [tenantId]);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProviderWrapper>{children}</ToastProviderWrapper>
    </QueryClientProvider>
  );
}

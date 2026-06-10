"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, Toaster } from "@ordella/ui";
import { useEffect, useState, type ReactNode } from "react";
import { configureApiClient } from "@/lib/api-client";
import { createCorrelationId } from "@/lib/helpers";
import { I18nProvider } from "@/components/i18n-provider";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";
import { useUiStore } from "@/store/ui.store";
import { useAuth } from "@/hooks/useAuth";

type ProvidersProps = {
  children: ReactNode;
};

function ApiClientBootstrap() {
  const { refresh, logout } = useAuth();
  const accessToken = useAuthStore((state) => state.accessToken);
  const tenantId = useTenantStore((state) => state.tenant?.id);
  const correlationId = useUiStore((state) => state.correlationId);

  useEffect(() => {
    configureApiClient({
      getAccessToken: () => accessToken,
      getTenantId: () => tenantId ?? null,
      refreshAccessToken: refresh,
      onUnauthorized: () => void logout(),
    });
  }, [accessToken, tenantId, refresh, logout]);

  useEffect(() => {
    if (!correlationId) {
      useUiStore.getState().setCorrelationId(createCorrelationId());
    }
  }, [correlationId]);

  return null;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <ApiClientBootstrap />
          {children}
          <Toaster />
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

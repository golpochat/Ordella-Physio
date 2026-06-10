import { useEffect } from "react";
import { QueryClient, QueryClientProvider, onlineManager } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { I18nextProvider } from "react-i18next";
import { configureApiClient } from "@/lib/api-client";
import i18n from "@/i18n";
import { useAuthStore } from "@/store/auth.store";
import { useUiStore } from "@/store/ui.store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 1000 * 60 * 30,
      retry: 2,
      refetchOnReconnect: true,
    },
  },
});

onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => {
    setOnline(Boolean(state.isConnected && state.isInternetReachable !== false));
  }),
);

function ApiClientBootstrap({ children }: { children: React.ReactNode }) {
  const loadStoredTokens = useAuthStore((state) => state.loadStoredTokens);
  const setHydrated = useAuthStore((state) => state.setHydrated);

  useEffect(() => {
    loadStoredTokens().finally(() => setHydrated(true));
  }, [loadStoredTokens, setHydrated]);

  useEffect(() => {
    configureApiClient({
      getAccessToken: async () => useAuthStore.getState().accessToken,
      refreshAccessToken: () => useAuthStore.getState().refreshSession(),
      getTenantId: () => useAuthStore.getState().user?.tenantId ?? null,
      onUnauthorized: () => {
        useAuthStore.getState().clearSession();
      },
    });
  }, []);

  return <>{children}</>;
}

function I18nBootstrap({ children }: { children: React.ReactNode }) {
  const language = useUiStore((state) => state.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return <>{children}</>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ApiClientBootstrap>
          <I18nBootstrap>{children}</I18nBootstrap>
        </ApiClientBootstrap>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

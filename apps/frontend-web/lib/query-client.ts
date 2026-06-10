import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage, isAuthError } from "@/lib/api-error";

function handleGlobalQueryError(error: unknown): void {
  if (isAuthError(error)) {
    return;
  }

  toast.error(getApiErrorMessage(error));
}

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (failureCount, error) => {
        if (isAuthError(error)) {
          return false;
        }
        return failureCount < 1;
      },
    },
    mutations: {
      onError: (error) => {
        handleGlobalQueryError(error);
      },
    },
  },
};

export function createAppQueryClient(): QueryClient {
  return new QueryClient({
    ...queryClientConfig,
    defaultOptions: {
      ...queryClientConfig.defaultOptions,
      queries: {
        ...queryClientConfig.defaultOptions?.queries,
        throwOnError: false,
      },
      mutations: queryClientConfig.defaultOptions?.mutations,
    },
  });
}

import { MutationCache, QueryClient, type QueryClientConfig } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage, isAuthError, isRateLimitError } from "@/lib/api-error";

const API_ERROR_TOAST_ID = "global-api-error";

function shouldShowMutationError(
  error: unknown,
  mutation: { meta?: Record<string, unknown> },
): boolean {
  if (mutation.meta?.silent) {
    return false;
  }

  if (isAuthError(error) || isRateLimitError(error)) {
    return false;
  }

  return true;
}

function handleGlobalMutationError(error: unknown): void {
  toast.error(getApiErrorMessage(error), { id: API_ERROR_TOAST_ID });
}

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (failureCount, error) => {
        if (isAuthError(error) || isRateLimitError(error)) {
          return false;
        }
        return failureCount < 1;
      },
    },
  },
};

export function createAppQueryClient(): QueryClient {
  return new QueryClient({
    ...queryClientConfig,
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        if (!shouldShowMutationError(error, mutation)) {
          return;
        }

        handleGlobalMutationError(error);
      },
    }),
    defaultOptions: {
      ...queryClientConfig.defaultOptions,
      queries: {
        ...queryClientConfig.defaultOptions?.queries,
        throwOnError: false,
      },
    },
  });
}

import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getClientApiBaseUrl, HEADER_TENANT_ID } from "@/lib/constants";

let tenantIdProvider: (() => string | null) | null = null;

export function setTenantIdProvider(provider: () => string | null) {
  tenantIdProvider = provider;
}

export const apiClient = axios.create({
  baseURL: getClientApiBaseUrl(),
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const tenantId = tenantIdProvider?.();
  if (tenantId) {
    config.headers[HEADER_TENANT_ID] = tenantId;
  }
  return config;
});

let refreshPromise: Promise<void> | null = null;

async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = fetch("/api/auth/refresh", { method: "POST", credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Refresh failed");
        }
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config;
    if (error.response?.status === 401 && original && !original.headers["x-retry"]) {
      try {
        await refreshSession();
        original.headers["x-retry"] = "true";
        return apiClient.request(original);
      } catch {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export function parseApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message ?? error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Unexpected error";
}

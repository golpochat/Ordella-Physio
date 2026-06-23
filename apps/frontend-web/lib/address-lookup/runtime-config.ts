import type { AddressLookupProvider } from "@/lib/address-lookup/types";

export type RuntimeAddressLookupState = {
  enabled: boolean;
  provider: AddressLookupProvider;
  integrationId: string | null;
  apiKey: string | null;
  metadata: Record<string, unknown>;
};

type RuntimeCacheEntry = {
  expiresAt: number;
  value: RuntimeAddressLookupState | null;
};

const RUNTIME_CACHE_TTL_MS = 60_000;
let runtimeCache: RuntimeCacheEntry | null = null;

function runtimeEnv(name: string): string {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

function gatewayBaseUrl(): string {
  return (
    runtimeEnv("API_GATEWAY_INTERNAL_URL") ||
    runtimeEnv("NEXT_PUBLIC_API_GATEWAY_URL") ||
    "http://localhost:3049"
  );
}

function envFallbackState(): RuntimeAddressLookupState | null {
  const provider = runtimeEnv("ADDRESS_LOOKUP_PROVIDER").toLowerCase();
  const apiKey = runtimeEnv("ADDRESS_LOOKUP_API_KEY");

  if (provider === "postcoder" && apiKey) {
    return {
      enabled: true,
      provider: "postcoder",
      integrationId: null,
      apiKey,
      metadata: {},
    };
  }

  if (provider === "ideal_postcodes" && apiKey) {
    return {
      enabled: true,
      provider: "ideal_postcodes",
      integrationId: null,
      apiKey,
      metadata: {},
    };
  }

  return null;
}

async function fetchPlatformRuntimeState(): Promise<RuntimeAddressLookupState | null> {
  try {
    const response = await fetch(
      `${gatewayBaseUrl()}/auth/internal/platform/integrations/address-lookup/active`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return envFallbackState();
    }

    const payload = (await response.json()) as {
      enabled?: boolean;
      provider?: string;
      integrationId?: string | null;
      apiKey?: string | null;
      metadata?: Record<string, unknown>;
    };

    if (!payload.enabled || !payload.apiKey || payload.provider === "none") {
      return null;
    }

    const provider =
      payload.provider === "postcoder"
        ? "postcoder"
        : payload.provider === "ideal_postcodes"
          ? "ideal_postcodes"
          : null;

    if (!provider) {
      return null;
    }

    return {
      enabled: true,
      provider,
      integrationId: payload.integrationId ?? null,
      apiKey: payload.apiKey,
      metadata: payload.metadata ?? {},
    };
  } catch {
    return envFallbackState();
  }
}

export async function resolveRuntimeAddressLookupState(): Promise<RuntimeAddressLookupState | null> {
  const now = Date.now();
  if (runtimeCache && runtimeCache.expiresAt > now) {
    return runtimeCache.value;
  }

  const value = await fetchPlatformRuntimeState();
  runtimeCache = {
    value,
    expiresAt: now + RUNTIME_CACHE_TTL_MS,
  };

  return value;
}

export function clearRuntimeAddressLookupCache(): void {
  runtimeCache = null;
}

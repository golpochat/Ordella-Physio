import type { PostalAddress } from "@/lib/postal-address";

const RESOLVE_CACHE_TTL_MS = 30 * 60 * 1000;

type ResolveCacheEntry = {
  address: PostalAddress;
  expiresAt: number;
};

const resolveCache = new Map<string, ResolveCacheEntry>();

export function resolveCacheKey(
  suggestionId: string,
  country: string,
  searchQuery?: string,
): string {
  const normalizedCountry = country.trim().toUpperCase();
  const normalizedQuery = searchQuery?.trim().toLowerCase() ?? "";
  return `${normalizedCountry}:${suggestionId.trim()}:${normalizedQuery}`;
}

export function getCachedResolvedAddress(
  suggestionId: string,
  country: string,
  searchQuery?: string,
): PostalAddress | null {
  const key = resolveCacheKey(suggestionId, country, searchQuery);
  const entry = resolveCache.get(key);
  if (!entry) {
    return null;
  }

  if (entry.expiresAt <= Date.now()) {
    resolveCache.delete(key);
    return null;
  }

  return entry.address;
}

export function setCachedResolvedAddress(
  suggestionId: string,
  country: string,
  address: PostalAddress,
  searchQuery?: string,
): void {
  const key = resolveCacheKey(suggestionId, country, searchQuery);
  resolveCache.set(key, {
    address,
    expiresAt: Date.now() + RESOLVE_CACHE_TTL_MS,
  });
}

export function clearResolvedAddressCache(): void {
  resolveCache.clear();
}

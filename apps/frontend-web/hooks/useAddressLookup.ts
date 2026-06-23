"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAddressSearchMinLength,
  shouldRunAddressSearch,
} from "@/lib/address-lookup/search-policy";
import type { AddressLookupConfig, AddressLookupSuggestion } from "@/lib/address-lookup/types";

type AddressSuggestResponse = {
  suggestions: AddressLookupSuggestion[];
  enabled: boolean;
  degraded?: boolean;
  error?: string;
  errorCode?: number | string;
  minLength?: number;
};

export function useAddressLookupConfig() {
  return useQuery<AddressLookupConfig>({
    queryKey: ["address-lookup-config"],
    queryFn: async () => {
      const response = await fetch("/api/address/config", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Unable to load address lookup config");
      }
      return response.json() as Promise<AddressLookupConfig>;
    },
    staleTime: 5 * 60_000,
  });
}

export function useAddressSuggestions(query: string, country: string, open: boolean) {
  const configQuery = useAddressLookupConfig();
  const trimmed = query.trim();
  const enabled =
    open &&
    Boolean(configQuery.data?.enabled) &&
    shouldRunAddressSearch(trimmed, country) &&
    /^[A-Za-z]{2}$/.test(country.trim());

  return useQuery<AddressSuggestResponse>({
    queryKey: ["address-suggest", country.toUpperCase(), trimmed],
    queryFn: async () => {
      const params = new URLSearchParams({
        q: trimmed,
        country: country.toUpperCase(),
      });
      const response = await fetch(`/api/address/suggest?${params.toString()}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Address lookup failed");
      }
      return response.json() as Promise<AddressSuggestResponse>;
    },
    enabled,
    staleTime: 60_000,
  });
}

export function useAddressSearchMinLength(query: string, country: string): number {
  return getAddressSearchMinLength(query, country);
}

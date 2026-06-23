import { getIdealPostcodesCapabilities, searchIdealPostcodesAddresses } from "@/lib/address-lookup/ideal-postcodes";

import { getPostcoderCapabilities, searchPostcoderAddresses } from "@/lib/address-lookup/postcoder";

import { resolveRuntimeAddressLookupState } from "@/lib/address-lookup/runtime-config";
import {
  getCachedResolvedAddress,
  setCachedResolvedAddress,
} from "@/lib/address-lookup/resolve-cache";

import {

  ADDRESS_LOOKUP_MIN_STREET_LENGTH,

  getAddressSearchMinLength,

  shouldRunAddressSearch,

} from "@/lib/address-lookup/search-policy";

import type { AddressLookupConfig, AddressLookupProvider, AddressLookupSuggestion } from "@/lib/address-lookup/types";

import type { PostalAddress } from "@/lib/postal-address";



export {

  ADDRESS_LOOKUP_DEBOUNCE_MS,

  ADDRESS_LOOKUP_EIRCODE_LENGTH,

  ADDRESS_LOOKUP_MIN_STREET_LENGTH,

  getAddressSearchMinLength,

  shouldRunAddressSearch,

} from "@/lib/address-lookup/search-policy";

export { AddressLookupError } from "@/lib/address-lookup/errors";
export { clearRuntimeAddressLookupCache } from "@/lib/address-lookup/runtime-config";
export { reloadAddressLookupRuntimeCache } from "@/lib/address-lookup/reload-runtime-cache";
export {
  getCachedResolvedAddress,
  setCachedResolvedAddress,
  clearResolvedAddressCache,
} from "@/lib/address-lookup/resolve-cache";



const MIN_QUERY_LENGTH = ADDRESS_LOOKUP_MIN_STREET_LENGTH;



function toPublicConfig(

  enabled: boolean,

  provider: AddressLookupProvider,

  options?: { eircodeEnabled?: boolean; resolveOnSelect?: boolean },

): AddressLookupConfig {

  return {

    enabled,

    provider: enabled ? provider : "none",

    minQueryLength: MIN_QUERY_LENGTH,

    debounceMs: 400,

    ...(options?.eircodeEnabled !== undefined ? { eircodeEnabled: options.eircodeEnabled } : {}),

    ...(options?.resolveOnSelect !== undefined ? { resolveOnSelect: options.resolveOnSelect } : {}),

  };

}



export async function getAddressLookupConfig(): Promise<AddressLookupConfig> {

  const runtime = await resolveRuntimeAddressLookupState();

  if (!runtime?.enabled || !runtime.apiKey) {

    return toPublicConfig(false, "none");

  }



  return toPublicConfig(true, runtime.provider, {

    resolveOnSelect: runtime.provider === "ideal_postcodes",

  });

}



export async function getAddressLookupConfigWithCapabilities(): Promise<AddressLookupConfig> {

  const runtime = await resolveRuntimeAddressLookupState();

  if (!runtime?.enabled || !runtime.apiKey) {

    return toPublicConfig(false, "none");

  }



  if (runtime.provider === "postcoder") {

    const { eircodeEnabled } = await getPostcoderCapabilities(runtime.apiKey);

    return toPublicConfig(true, runtime.provider, { eircodeEnabled });

  }



  if (runtime.provider === "ideal_postcodes") {

    const { eircodeEnabled } = await getIdealPostcodesCapabilities(runtime.apiKey, "IE");

    return toPublicConfig(true, runtime.provider, { eircodeEnabled, resolveOnSelect: true });

  }



  return toPublicConfig(true, runtime.provider);

}



export async function suggestAddresses(

  query: string,

  country: string,

): Promise<AddressLookupSuggestion[]> {

  const runtime = await resolveRuntimeAddressLookupState();

  const trimmedQuery = query.trim();



  if (!runtime?.enabled || !runtime.apiKey || !shouldRunAddressSearch(trimmedQuery, country)) {

    return [];

  }



  const normalizedCountry = country.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(normalizedCountry)) {

    return [];

  }



  switch (runtime.provider) {

    case "postcoder":

      return searchPostcoderAddresses(runtime.apiKey, trimmedQuery, normalizedCountry);

    case "ideal_postcodes":

      return searchIdealPostcodesAddresses(runtime.apiKey, trimmedQuery, normalizedCountry);

    default:

      return [];

  }

}



export async function resolveAddressSuggestion(
  suggestionId: string,
  country: string,
  searchQuery?: string,
): Promise<PostalAddress> {
  const cached = getCachedResolvedAddress(suggestionId, country, searchQuery);
  if (cached) {
    return cached;
  }

  const runtime = await resolveRuntimeAddressLookupState();
  const normalizedCountry = country.trim().toUpperCase();

  if (!runtime?.enabled || !runtime.apiKey) {
    throw new Error("Address lookup is not enabled.");
  }

  if (!/^[A-Z]{2}$/.test(normalizedCountry)) {
    throw new Error("Invalid country code.");
  }

  let address: PostalAddress;

  switch (runtime.provider) {
    case "ideal_postcodes": {
      const { resolveIdealPostcodesAddress } = await import("@/lib/address-lookup/ideal-postcodes");
      address = await resolveIdealPostcodesAddress(
        runtime.apiKey,
        suggestionId,
        normalizedCountry,
        searchQuery,
      );
      break;
    }
    default:
      throw new Error("Address resolution is not supported for the active provider.");
  }

  setCachedResolvedAddress(suggestionId, normalizedCountry, address, searchQuery);
  return address;
}



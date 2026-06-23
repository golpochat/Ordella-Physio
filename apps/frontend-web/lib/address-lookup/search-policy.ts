import { looksLikeEircode } from "@/lib/address-lookup/eircode-query";

/** Wait for a typing pause before calling the provider (ms). */
export const ADDRESS_LOOKUP_DEBOUNCE_MS = 400;

/** Default minimum for street / partial address searches. */
export const ADDRESS_LOOKUP_MIN_STREET_LENGTH = 5;

/** Eircodes are 7 characters without the space. */
export const ADDRESS_LOOKUP_EIRCODE_LENGTH = 7;

export function getAddressSearchMinLength(query: string, country: string): number {
  const trimmed = query.trim();
  const compact = trimmed.replace(/\s+/g, "");

  if (country.toUpperCase() === "IE") {
    if (looksLikeEircode(trimmed)) {
      return ADDRESS_LOOKUP_EIRCODE_LENGTH;
    }

    // User is likely typing an Eircode (e.g. D14…) — wait for the full code.
    if (/^[A-Za-z]\d/.test(compact)) {
      return ADDRESS_LOOKUP_EIRCODE_LENGTH;
    }
  }

  return ADDRESS_LOOKUP_MIN_STREET_LENGTH;
}

export function shouldRunAddressSearch(query: string, country: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) {
    return false;
  }

  return trimmed.length >= getAddressSearchMinLength(trimmed, country);
}

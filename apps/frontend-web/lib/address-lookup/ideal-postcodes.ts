import { AddressLookupError } from "@/lib/address-lookup/errors";
import { looksLikeEircode } from "@/lib/address-lookup/eircode-query";
import { normalizePostalCode, type PostalAddress } from "@/lib/postal-address";
import type { AddressLookupSuggestion } from "@/lib/address-lookup/types";

type IdealPostcodesResponse<T> = {
  code?: number;
  message?: string;
  result?: T;
};

type IdealSuggestionHit = {
  id: string;
  suggestion: string;
};

type IdealNativeAddress = {
  line_1?: string;
  line_2?: string;
  line_3?: string;
  eircode?: string;
  post_county?: string;
  post_town?: string;
  primary_locality?: string;
  secondary_locality?: string;
  tertiary_locality?: string;
  country_iso_2?: string;
};

type IdealResolvedAddress = {
  line_1?: string;
  line_2?: string;
  line_3?: string;
  post_town?: string;
  county?: string;
  postcode?: string;
  country_iso_2?: string;
  native?: IdealNativeAddress;
};

const IDEAL_POSTCODES_BASE_URL = "https://api.ideal-postcodes.co.uk/v1";

function contextForCountry(country: string): string | null {
  switch (country.trim().toUpperCase()) {
    case "IE":
      return "irl";
    case "GB":
    case "UK":
      return "gbr";
    default:
      return null;
  }
}

function messageForIdealPostcodesError(code: number | undefined, fallback?: string): string {
  switch (code) {
    case 4020:
      return "Address lookup credits exhausted. Enter your address manually or contact your administrator.";
    case 4021:
      return "Address lookup rate limit reached. Try again shortly or enter your address manually.";
    case 4040:
      return "No matching address found.";
    default:
      return fallback ?? "Address lookup is temporarily unavailable. Enter your address manually.";
  }
}

async function parseIdealPostcodesResponse<T>(response: Response): Promise<T> {
  const body = (await response.json()) as IdealPostcodesResponse<T>;

  if (!response.ok || (body.code !== undefined && body.code !== 2000)) {
    throw new AddressLookupError(body.code ?? response.status, messageForIdealPostcodesError(body.code, body.message));
  }

  if (!body.result) {
    throw new AddressLookupError(body.code ?? "empty", messageForIdealPostcodesError(body.code));
  }

  return body.result;
}

function cityFromNative(native: IdealNativeAddress): string {
  return (
    native.post_town?.trim() ||
    native.primary_locality?.trim() ||
    native.tertiary_locality?.trim() ||
    native.secondary_locality?.trim() ||
    ""
  );
}

function mapNativeToPostalAddress(native: IdealNativeAddress, country: string): PostalAddress {
  const isoCountry = native.country_iso_2?.toUpperCase() || country.toUpperCase();

  return {
    line1: native.line_1?.trim() ?? "",
    line2: [native.line_2, native.line_3].map((part) => part?.trim()).filter(Boolean).join(", "),
    city: cityFromNative(native),
    region: native.post_county?.trim() ?? "",
    postalCode: normalizePostalCode(native.eircode?.trim() ?? "", isoCountry),
    country: isoCountry,
  };
}

function mergePostalAddress(primary: PostalAddress, fallback: PostalAddress): PostalAddress {
  return {
    line1: primary.line1 || fallback.line1,
    line2: primary.line2 || fallback.line2,
    city: primary.city || fallback.city,
    region: primary.region || fallback.region,
    postalCode: primary.postalCode || fallback.postalCode,
    country: primary.country || fallback.country,
  };
}

function enrichIrishAddressFromSearchQuery(
  address: PostalAddress,
  country: string,
  searchQuery?: string,
): PostalAddress {
  if (country.toUpperCase() !== "IE" || !searchQuery?.trim()) {
    return address;
  }

  const trimmedQuery = searchQuery.trim();

  if (!address.postalCode && looksLikeEircode(trimmedQuery)) {
    address = {
      ...address,
      postalCode: normalizePostalCode(trimmedQuery, "IE"),
    };
  }

  return address;
}

function mapResolvedToPostalAddress(result: IdealResolvedAddress, country: string): PostalAddress {
  const isoCountry =
    result.native?.country_iso_2?.toUpperCase() ||
    result.country_iso_2?.toUpperCase() ||
    country.toUpperCase();

  const topLevel: PostalAddress = {
    line1: result.line_1?.trim() ?? "",
    line2: result.line_2?.trim() ?? "",
    city: result.post_town?.trim() ?? "",
    region: result.county?.trim() ?? "",
    postalCode: normalizePostalCode(result.postcode?.trim() ?? "", isoCountry),
    country: isoCountry,
  };

  if (!result.native) {
    return topLevel;
  }

  const fromNative = mapNativeToPostalAddress(result.native, isoCountry);
  return mergePostalAddress(fromNative, topLevel);
}

function buildSuggestUrl(apiKey: string, query: string, country: string): string {
  const params = new URLSearchParams({
    api_key: apiKey,
    query: query.trim(),
    limit: "8",
  });

  const context = contextForCountry(country);
  if (context) {
    params.set("context", context);
  }

  if (country.toUpperCase() === "IE") {
    params.set("language", "en");
  }

  return `${IDEAL_POSTCODES_BASE_URL}/autocomplete/addresses?${params.toString()}`;
}

export async function searchIdealPostcodesAddresses(
  apiKey: string,
  query: string,
  country: string,
): Promise<AddressLookupSuggestion[]> {
  const normalizedCountry = country.trim().toUpperCase();
  const context = contextForCountry(normalizedCountry);

  if (!context) {
    return [];
  }

  const response = await fetch(buildSuggestUrl(apiKey, query, normalizedCountry), {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  const result = await parseIdealPostcodesResponse<{ hits?: IdealSuggestionHit[] }>(response);
  const hits = result.hits ?? [];

  return hits.map((hit) => ({
    id: hit.id,
    label: hit.suggestion,
    resolveRequired: true,
  }));
}

export async function resolveIdealPostcodesAddress(
  apiKey: string,
  suggestionId: string,
  country: string,
  searchQuery?: string,
): Promise<PostalAddress> {
  const normalizedCountry = country.trim().toUpperCase();
  const encodedId = encodeURIComponent(suggestionId.trim());
  const url = `${IDEAL_POSTCODES_BASE_URL}/autocomplete/addresses/${encodedId}/gbr?api_key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  const result = await parseIdealPostcodesResponse<IdealResolvedAddress>(response);
  const mapped = mapResolvedToPostalAddress(result, normalizedCountry);
  return enrichIrishAddressFromSearchQuery(mapped, normalizedCountry, searchQuery);
}

export async function getIdealPostcodesCapabilities(
  _apiKey: string,
  country: string,
): Promise<{ eircodeEnabled: boolean }> {
  return { eircodeEnabled: country.trim().toUpperCase() === "IE" };
}

export function idealPostcodesSupportsCountry(country: string): boolean {
  return contextForCountry(country) !== null;
}

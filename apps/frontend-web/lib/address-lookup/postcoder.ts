import { AddressLookupError, messageForPostcoderError } from "@/lib/address-lookup/errors";
import { eircodeSearchVariants, looksLikeEircode } from "@/lib/address-lookup/eircode-query";
import { normalizePostalCode } from "@/lib/postal-address";
import type { AddressLookupSuggestion } from "@/lib/address-lookup/types";

type PostcoderRow = {
  summaryline?: string;
  addressline1?: string;
  addressline2?: string;
  posttown?: string;
  county?: string;
  postcode?: string;
};

type PostcoderErrorBody = {
  errorcode?: number | string;
  errormessage?: string;
};

type PostcoderStatus = {
  eircode?: string;
};

const POSTCODER_BASE_URL = "https://ws.postcoder.com/pcw";

let cachedCapabilities: { eircodeEnabled: boolean; fetchedAt: number } | null = null;

export async function getPostcoderCapabilities(apiKey: string): Promise<{ eircodeEnabled: boolean }> {
  const now = Date.now();
  if (cachedCapabilities && now - cachedCapabilities.fetchedAt < 5 * 60_000) {
    return cachedCapabilities;
  }

  try {
    const response = await fetch(
      `${POSTCODER_BASE_URL}/${encodeURIComponent(apiKey)}/status?format=json`,
      { cache: "no-store", headers: { Accept: "application/json" } },
    );
    if (!response.ok) {
      return { eircodeEnabled: false };
    }

    const status = (await response.json()) as PostcoderStatus;
    const eircodeEnabled = Boolean(status.eircode && status.eircode !== "No Access");
    cachedCapabilities = { eircodeEnabled, fetchedAt: now };
    return { eircodeEnabled };
  } catch {
    return { eircodeEnabled: false };
  }
}

function mapRows(rows: PostcoderRow[], country: string): AddressLookupSuggestion[] {
  return rows.slice(0, 8).map((row, index) => {
    const line1 = row.addressline1?.trim() ?? "";
    const line2 = row.addressline2?.trim() ?? "";
    const city = row.posttown?.trim() ?? "";
    const region = row.county?.trim() ?? "";
    const postalCode = normalizePostalCode(row.postcode?.trim() ?? "", country);

    return {
      id: `${country}-${postalCode}-${line1}-${index}`,
      label: row.summaryline?.trim() || [line1, city, postalCode].filter(Boolean).join(", "),
      address: {
        line1,
        line2,
        city,
        region,
        postalCode,
        country: country.toUpperCase(),
      },
    };
  });
}

async function fetchPostcoderRows(
  apiKey: string,
  query: string,
  countryCode: string,
): Promise<PostcoderRow[]> {
  const encodedQuery = encodeURIComponent(query.trim());
  const url = `${POSTCODER_BASE_URL}/${encodeURIComponent(apiKey)}/address/${countryCode}/${encodedQuery}?format=json&lines=2&identifier=ordella-web&addtags=addressline1,addressline2,posttown,county,postcode,summaryline`;

  const response = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  const body = (await response.json()) as PostcoderRow[] | PostcoderErrorBody;

  if (!response.ok || !Array.isArray(body)) {
    const errorBody = body as PostcoderErrorBody;
    const code = errorBody.errorcode ?? response.status;
    const message = messageForPostcoderError(code, errorBody.errormessage);
    throw new AddressLookupError(code, message);
  }

  return body;
}

export async function searchPostcoderAddresses(
  apiKey: string,
  query: string,
  country: string,
): Promise<AddressLookupSuggestion[]> {
  const countryCode = country.trim().toLowerCase();
  const trimmedQuery = query.trim();
  const searchTerms =
    countryCode === "ie" && looksLikeEircode(trimmedQuery)
      ? eircodeSearchVariants(trimmedQuery)
      : [trimmedQuery];

  if (countryCode === "ie" && looksLikeEircode(trimmedQuery)) {
    const { eircodeEnabled } = await getPostcoderCapabilities(apiKey);
    if (!eircodeEnabled) {
      throw new AddressLookupError(
        9001,
        messageForPostcoderError(9001),
      );
    }
  }

  let lastError: AddressLookupError | null = null;

  for (const term of searchTerms) {
    try {
      const rows = await fetchPostcoderRows(apiKey, term, countryCode);
      if (rows.length > 0) {
        return mapRows(rows, country);
      }
    } catch (error) {
      if (error instanceof AddressLookupError) {
        lastError = error;
        if (Number(error.code) === 9001) {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  if (lastError) {
    throw lastError;
  }

  return [];
}

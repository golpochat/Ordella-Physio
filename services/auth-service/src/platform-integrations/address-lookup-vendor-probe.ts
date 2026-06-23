import type { AddressLookupVendor } from "@/platform-integrations/platform-integration.types";

export type AddressLookupProbeResult = {
  connected: boolean;
  message: string;
  suggestionCount: number;
  testedAt: string;
};

const TEST_QUERY = "Main Street Dublin";
const TEST_COUNTRY = "IE";

function failure(message: string, testedAt: string): AddressLookupProbeResult {
  return { connected: false, message, suggestionCount: 0, testedAt };
}

function success(message: string, suggestionCount: number, testedAt: string): AddressLookupProbeResult {
  return { connected: true, message, suggestionCount, testedAt };
}

async function probeIdealPostcodes(apiKey: string): Promise<AddressLookupProbeResult> {
  const testedAt = new Date().toISOString();

  try {
    const params = new URLSearchParams({
      api_key: apiKey.trim(),
      query: TEST_QUERY,
      context: "irl",
      limit: "1",
    });

    const response = await fetch(
      `https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses?${params.toString()}`,
      { cache: "no-store", headers: { Accept: "application/json" } },
    );

    const body = (await response.json()) as {
      code?: number;
      message?: string;
      result?: { hits?: unknown[] };
    };

    if (!response.ok || (body.code !== undefined && body.code !== 2000)) {
      return failure(
        body.message ?? "Ideal Postcodes rejected the API key.",
        testedAt,
      );
    }

    const suggestionCount = body.result?.hits?.length ?? 0;

    return success(
      suggestionCount > 0
        ? `${suggestionCount} test suggestion returned.`
        : "API accepted the key.",
      suggestionCount,
      testedAt,
    );
  } catch {
    return failure("Unable to reach Ideal Postcodes.", testedAt);
  }
}

async function probePostcoder(apiKey: string): Promise<AddressLookupProbeResult> {
  const testedAt = new Date().toISOString();

  try {
    const encodedKey = encodeURIComponent(apiKey.trim());
    const encodedQuery = encodeURIComponent(TEST_QUERY);
    const url = `https://ws.postcoder.com/pcw/${encodedKey}/address/${TEST_COUNTRY}/${encodedQuery}?format=json&lines=1`;

    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    const rawBody = await response.text();
    let body: unknown[] | { errorcode?: number | string; errormessage?: string };

    try {
      body = JSON.parse(rawBody) as typeof body;
    } catch {
      const message = rawBody.trim() || "Postcoder rejected the API key.";
      return failure(message, testedAt);
    }

    if (!response.ok || !Array.isArray(body)) {
      const errorBody = body as { errorcode?: number | string; errormessage?: string };
      return failure(
        errorBody.errormessage ?? "Postcoder rejected the API key.",
        testedAt,
      );
    }

    const suggestionCount = body.length;

    return success(
      suggestionCount > 0
        ? `${suggestionCount} test suggestion returned.`
        : "API accepted the key.",
      suggestionCount,
      testedAt,
    );
  } catch {
    return failure("Unable to reach Postcoder.", testedAt);
  }
}

export async function probeAddressLookupVendor(
  vendor: AddressLookupVendor,
  apiKey: string,
): Promise<AddressLookupProbeResult> {
  switch (vendor) {
    case "ideal_postcodes":
      return probeIdealPostcodes(apiKey);
    case "postcoder":
      return probePostcoder(apiKey);
    default:
      return failure(`Unsupported vendor: ${vendor}`, new Date().toISOString());
  }
}

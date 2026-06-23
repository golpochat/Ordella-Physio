import { NextResponse } from "next/server";

import {
  AddressLookupError,
  getAddressLookupConfig,
  getAddressSearchMinLength,
  shouldRunAddressSearch,
  suggestAddresses,
} from "@/lib/address-lookup";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const config = await getAddressLookupConfig();
  if (!config.enabled) {
    return NextResponse.json({ suggestions: [], enabled: false });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const country = searchParams.get("country")?.trim().toUpperCase() ?? "";

  if (!shouldRunAddressSearch(query, country)) {
    const minLength = getAddressSearchMinLength(query, country);
    return NextResponse.json({ suggestions: [], enabled: true, minLength });
  }

  if (!/^[A-Z]{2}$/.test(country)) {
    return NextResponse.json({ error: "Invalid country code" }, { status: 400 });
  }

  if (query.length > 120) {
    return NextResponse.json({ error: "Query too long" }, { status: 400 });
  }

  try {
    const suggestions = await suggestAddresses(query, country);
    return NextResponse.json({ suggestions, enabled: true });
  } catch (error) {
    if (error instanceof AddressLookupError) {
      return NextResponse.json({
        suggestions: [],
        enabled: true,
        error: error.message,
        errorCode: error.code,
      });
    }

    return NextResponse.json({ suggestions: [], enabled: true, degraded: true });
  }
}

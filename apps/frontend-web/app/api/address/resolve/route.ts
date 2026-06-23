import { NextResponse } from "next/server";

import {
  AddressLookupError,
  getAddressLookupConfig,
  resolveAddressSuggestion,
} from "@/lib/address-lookup";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const config = await getAddressLookupConfig();
  if (!config.enabled || !config.resolveOnSelect) {
    return NextResponse.json({ error: "Address resolve is not available" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const suggestionId = searchParams.get("id")?.trim() ?? "";
  const country = searchParams.get("country")?.trim().toUpperCase() ?? "";
  const searchQuery = searchParams.get("q")?.trim() ?? undefined;

  if (!suggestionId) {
    return NextResponse.json({ error: "Suggestion id is required" }, { status: 400 });
  }

  if (!/^[A-Z]{2}$/.test(country)) {
    return NextResponse.json({ error: "Invalid country code" }, { status: 400 });
  }

  try {
    const address = await resolveAddressSuggestion(suggestionId, country, searchQuery);
    return NextResponse.json({ address, enabled: true });
  } catch (error) {
    if (error instanceof AddressLookupError) {
      return NextResponse.json(
        {
          enabled: true,
          error: error.message,
          errorCode: error.code,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ error: "Unable to resolve address" }, { status: 500 });
  }
}


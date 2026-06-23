import { NextResponse } from "next/server";

import { clearRuntimeAddressLookupCache } from "@/lib/address-lookup/runtime-config";

export const dynamic = "force-dynamic";

/** Bust the server-side active-vendor cache after super-admin integration changes. */
export async function POST() {
  clearRuntimeAddressLookupCache();
  return NextResponse.json({ reloaded: true });
}

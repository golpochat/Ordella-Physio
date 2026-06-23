import { NextResponse } from "next/server";

import { getAddressLookupConfigWithCapabilities } from "@/lib/address-lookup";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getAddressLookupConfigWithCapabilities());
}

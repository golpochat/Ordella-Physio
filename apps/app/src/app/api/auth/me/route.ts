import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_TENANT_ID,
  getGatewayUrl,
  HEADER_TENANT_ID,
} from "@/lib/constants";
import { userSchema } from "@/lib/schemas";

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN)?.value;
  const tenantId = cookieStore.get(COOKIE_TENANT_ID)?.value;

  if (!accessToken || !tenantId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const upstream = await fetch(`${getGatewayUrl()}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      [HEADER_TENANT_ID]: tenantId,
    },
    cache: "no-store",
  });

  const payload = await upstream.json();
  if (!upstream.ok) {
    return NextResponse.json(payload, { status: upstream.status });
  }

  return NextResponse.json(userSchema.parse(payload));
}

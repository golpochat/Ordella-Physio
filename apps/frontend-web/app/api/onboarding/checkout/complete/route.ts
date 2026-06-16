import { NextResponse } from "next/server";

import { getOnboardingCheckoutCompleteUrl } from "@/lib/auth/bff-auth";
import { TENANT_HEADER } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.text();
  const authorization = request.headers.get("authorization");
  const tenantId = request.headers.get(TENANT_HEADER);

  const upstream = await fetch(getOnboardingCheckoutCompleteUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authorization ? { Authorization: authorization } : {}),
      ...(tenantId ? { [TENANT_HEADER]: tenantId } : {}),
    },
    body,
    cache: "no-store",
  });

  const payload = await upstream.json().catch(() => null);
  return NextResponse.json(payload ?? { error: { message: "Unable to complete checkout" } }, {
    status: upstream.status,
  });
}

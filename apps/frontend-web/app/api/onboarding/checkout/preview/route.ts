import { NextResponse } from "next/server";

import { getOnboardingCheckoutPreviewUrl } from "@/lib/auth/bff-auth";
import { csrfForbiddenResponse, validateOnboardingBffCsrf } from "@/lib/auth/bff-csrf";

export async function POST(request: Request) {
  if (!validateOnboardingBffCsrf(request)) {
    return csrfForbiddenResponse();
  }

  const body = await request.text();
  const upstream = await fetch(getOnboardingCheckoutPreviewUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    cache: "no-store",
  });

  const payload = await upstream.json().catch(() => null);
  return NextResponse.json(payload ?? { error: { message: "Unable to preview checkout" } }, {
    status: upstream.status,
  });
}

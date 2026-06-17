import { NextResponse } from "next/server";

import { getOnboardingRegisterUrl } from "@/lib/auth/bff-auth";
import { buildOnboardingUpstreamHeaders } from "@/lib/auth/onboarding-upstream";
import { csrfForbiddenResponse, validateOnboardingBffCsrf } from "@/lib/auth/bff-csrf";
import { buildOnboardingAuthResponse, type OnboardingAuthUpstreamData } from "@/lib/auth/onboarding-bff";

export async function POST(request: Request) {
  if (!validateOnboardingBffCsrf(request)) {
    return csrfForbiddenResponse();
  }

  const body = await request.text();
  const upstream = await fetch(getOnboardingRegisterUrl(), {
    method: "POST",
    headers: buildOnboardingUpstreamHeaders({ "Content-Type": "application/json" }),
    body,
    cache: "no-store",
  });

  const payload = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return NextResponse.json(payload ?? { error: { message: "Unable to register workspace" } }, {
      status: upstream.status,
    });
  }

  const data = (payload as { data?: OnboardingAuthUpstreamData })?.data;
  if (!data?.accessToken || !data.refreshToken || !data.user) {
    return NextResponse.json({ error: { message: "Invalid onboarding response" } }, { status: 502 });
  }

  return await buildOnboardingAuthResponse(data);
}

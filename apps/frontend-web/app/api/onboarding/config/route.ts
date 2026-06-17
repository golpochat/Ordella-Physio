import { NextResponse } from "next/server";

import { getOnboardingConfigUrl } from "@/lib/auth/bff-auth";
import { buildOnboardingUpstreamHeaders } from "@/lib/auth/onboarding-upstream";

export async function GET() {
  const upstream = await fetch(getOnboardingConfigUrl(), {
    cache: "no-store",
    headers: buildOnboardingUpstreamHeaders(),
  });
  const payload = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return NextResponse.json(payload ?? { error: { message: "Unable to load onboarding config" } }, {
      status: upstream.status,
    });
  }

  return NextResponse.json(payload);
}

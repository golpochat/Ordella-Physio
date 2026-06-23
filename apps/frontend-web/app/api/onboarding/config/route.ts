import { NextResponse } from "next/server";

import { getOnboardingConfigUrl } from "@/lib/auth/bff-auth";
import { buildOnboardingUpstreamHeaders } from "@/lib/auth/onboarding-upstream";
import { getDefaultOnboardingConfig } from "@/lib/onboarding-default-config";

export async function GET() {
  try {
    const upstream = await fetch(getOnboardingConfigUrl(), {
      cache: "no-store",
      headers: buildOnboardingUpstreamHeaders(),
    });
    const payload = await upstream.json().catch(() => null);

    if (upstream.ok) {
      return NextResponse.json(payload);
    }

    if (upstream.status === 502 || upstream.status === 503 || upstream.status === 404) {
      return NextResponse.json({ data: getDefaultOnboardingConfig() });
    }

    return NextResponse.json(payload ?? { error: { message: "Unable to load onboarding config" } }, {
      status: upstream.status,
    });
  } catch {
    return NextResponse.json({ data: getDefaultOnboardingConfig() });
  }
}

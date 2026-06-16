import { NextResponse } from "next/server";

import {
  getSecureCookieOptions,
  REFRESH_COOKIE_NAME,
  REFRESH_MAX_AGE_SECONDS,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/cookie-names";
import { signSessionPayload } from "@/lib/auth/session-signing";
import type { SessionCookiePayload } from "@/lib/auth/session";

type OnboardingUpstreamUser = {
  id: string;
  email: string;
  tenantId: string;
  role?: string;
  roles?: string[];
  permissions?: string[];
};

export type OnboardingAuthUpstreamData = {
  accessToken: string;
  refreshToken: string;
  user: OnboardingUpstreamUser;
  tenant: {
    id: string;
    name: string;
    slug: string;
    status?: string;
    trialStart?: string | null;
    trialEnd?: string | null;
    subscriptionPlan?: string | null;
  };
  intent?: string;
  billingCycle?: string;
  plan?: string;
};

export async function buildOnboardingAuthResponse(data: OnboardingAuthUpstreamData) {
  const response = NextResponse.json({
    data: {
      accessToken: data.accessToken,
      user: data.user,
      tenant: data.tenant,
      intent: data.intent,
      billingCycle: data.billingCycle,
      plan: data.plan,
    },
  });

  response.cookies.set(
    REFRESH_COOKIE_NAME,
    data.refreshToken,
    getSecureCookieOptions(REFRESH_MAX_AGE_SECONDS),
  );

  const sessionPayload: SessionCookiePayload = {
    user: {
      id: data.user.id,
      role: data.user.roles?.[0] ?? data.user.role ?? "ADMIN",
      tenantId: data.user.tenantId,
      roles: data.user.roles,
    },
  };

  response.cookies.set(
    SESSION_COOKIE_NAME,
    await signSessionPayload(sessionPayload),
    getSecureCookieOptions(SESSION_MAX_AGE_SECONDS),
  );

  return response;
}

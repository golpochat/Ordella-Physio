import { NextResponse } from "next/server";

import { getAuthLoginUrl } from "@/lib/auth/bff-auth";
import { buildAuthUpstreamHeaders } from "@/lib/auth/bff-upstream-headers";
import { parseAuthUpstreamPayload } from "@/lib/auth/parse-auth-upstream";
import {
  getSecureCookieOptions,
  REFRESH_COOKIE_NAME,
  REFRESH_MAX_AGE_SECONDS,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/cookie-names";
import { signSessionPayload } from "@/lib/auth/session-signing";
import { buildSessionUser } from "@/lib/auth/build-session-user";
import type { SessionCookiePayload } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = await request.text();
  const loginUrl = getAuthLoginUrl();

  const upstream = await fetch(loginUrl, {
    method: "POST",
    headers: buildAuthUpstreamHeaders({ bodyText: body, incomingHeaders: request.headers }),
    body,
    cache: "no-store",
  });

  const payload = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return NextResponse.json(payload ?? { error: { message: "Login failed" } }, {
      status: upstream.status,
    });
  }

  const parsed = parseAuthUpstreamPayload(payload);
  if (!parsed) {
    return NextResponse.json({ error: { message: "Invalid login response" } }, { status: 502 });
  }

  if ("requiresTenantSelection" in parsed && parsed.requiresTenantSelection) {
    return NextResponse.json({ data: parsed });
  }

  if ("mfaRequired" in parsed && parsed.mfaRequired) {
    return NextResponse.json({ data: parsed });
  }

  if (!("accessToken" in parsed)) {
    return NextResponse.json({ error: { message: "Invalid login response" } }, { status: 502 });
  }

  const tenantIdFromHeader = request.headers.get("x-tenant-id");
  const sessionUser = buildSessionUser(parsed.user, tenantIdFromHeader ?? parsed.user.tenantId);

  const response = NextResponse.json({
    data: {
      accessToken: parsed.accessToken,
      user: {
        ...parsed.user,
        permissions: sessionUser.permissions,
        resolvedPermissions: sessionUser.resolvedPermissions,
        effectiveRole: sessionUser.effectiveRole,
      },
    },
  });

  const sessionPayload: SessionCookiePayload = {
    user: sessionUser,
  };

  response.cookies.set(
    REFRESH_COOKIE_NAME,
    parsed.refreshToken,
    getSecureCookieOptions(REFRESH_MAX_AGE_SECONDS),
  );

  response.cookies.set(
    SESSION_COOKIE_NAME,
    await signSessionPayload(sessionPayload),
    getSecureCookieOptions(SESSION_MAX_AGE_SECONDS),
  );

  return response;
}

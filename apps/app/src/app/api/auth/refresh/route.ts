import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  COOKIE_TENANT_ID,
  getGatewayUrl,
  HEADER_TENANT_ID,
} from "@/lib/constants";
import { authResponseSchema } from "@/lib/schemas";

const secure = process.env.NODE_ENV === "production";

export async function POST() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get(COOKIE_REFRESH_TOKEN)?.value;
  const tenantId = cookieStore.get(COOKIE_TENANT_ID)?.value;

  if (!refreshToken || !tenantId) {
    return NextResponse.json({ message: "Missing refresh session" }, { status: 401 });
  }

  const upstream = await fetch(`${getGatewayUrl()}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [HEADER_TENANT_ID]: tenantId,
    },
    body: JSON.stringify({ refreshToken }),
  });

  const payload = await upstream.json();
  if (!upstream.ok) {
    return NextResponse.json(payload, { status: upstream.status });
  }

  const tokens = authResponseSchema.pick({ accessToken: true, refreshToken: true, expiresIn: true }).parse(payload);
  const response = NextResponse.json(tokens);

  response.cookies.set(COOKIE_ACCESS_TOKEN, tokens.accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: tokens.expiresIn,
  });
  response.cookies.set(COOKIE_REFRESH_TOKEN, tokens.refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

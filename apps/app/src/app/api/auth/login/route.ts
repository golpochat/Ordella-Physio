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

function setAuthCookies(
  response: NextResponse,
  tokens: { accessToken: string; refreshToken: string; expiresIn: number },
  tenantId: string,
) {
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
  response.cookies.set(COOKIE_TENANT_ID, tenantId, {
    httpOnly: false,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { email: string; password: string; tenantId: string };

  const upstream = await fetch(`${getGatewayUrl()}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [HEADER_TENANT_ID]: body.tenantId,
    },
    body: JSON.stringify({ email: body.email, password: body.password }),
  });

  const payload = await upstream.json();
  if (!upstream.ok) {
    return NextResponse.json(payload, { status: upstream.status });
  }

  const auth = authResponseSchema.parse(payload);
  const response = NextResponse.json(auth);
  setAuthCookies(response, auth, body.tenantId);
  return response;
}

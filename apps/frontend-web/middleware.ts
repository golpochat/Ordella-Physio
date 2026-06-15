import { randomBytes } from "node:crypto";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getSession,
  hasValidTenant,
  isGuardedPortalPath,
  isPublicMiddlewarePath,
  resolveAllowedPortalPrefix,
  resolveMiddlewarePortalHome,
} from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/rate-limit/store";
import { buildContentSecurityPolicy } from "@/lib/security/csp";
import { NONCE_HEADER } from "@/lib/security/nonce";

const RATE_LIMIT = Number(process.env.API_RATE_LIMIT ?? 120);
const WINDOW_MS = 60 * 1000;
const RATE_LIMIT_DISABLED = process.env.DISABLE_API_RATE_LIMIT === "true";

const RATE_LIMIT_EXEMPT_PREFIXES = ["/api/next-auth/", "/api/health", "/api/csrf"];

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.ip ?? "unknown";
}

function isExemptApiPath(pathname: string): boolean {
  return RATE_LIMIT_EXEMPT_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function applyStaticCacheHeaders(response: NextResponse) {
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return response;
}

function applyPageSecurityHeaders(request: NextRequest): NextResponse {
  const nonce = randomBytes(16).toString("base64");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(NONCE_HEADER, nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set(
    "Content-Security-Policy",
    buildContentSecurityPolicy({
      nonce,
      reportUri: process.env.CSP_REPORT_URI,
    }),
  );

  return response;
}

function rateLimitResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { message: "Too many requests" },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    },
  );
}

function redirectToLogin(request: NextRequest, reason?: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";

  if (reason) {
    url.searchParams.set("reason", reason);
  }

  return NextResponse.redirect(url);
}

function redirectToPortalHome(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return NextResponse.redirect(url);
}

function enforcePortalRbac(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isGuardedPortalPath(pathname) || isPublicMiddlewarePath(pathname)) {
    return null;
  }

  const session = getSession(request);

  if (!session?.user) {
    return redirectToLogin(request);
  }

  const { role, roles } = session.user;

  if (!hasValidTenant(session)) {
    return redirectToLogin(request, "missing-tenant");
  }

  const allowedPrefix = resolveAllowedPortalPrefix(role, roles);
  if (!allowedPrefix) {
    return redirectToLogin(request);
  }

  if (!pathname.startsWith(allowedPrefix)) {
    return redirectToPortalHome(request, resolveMiddlewarePortalHome(role, roles));
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    if (!RATE_LIMIT_DISABLED && !isExemptApiPath(pathname)) {
      const ip = getClientIp(request);

      if (ip !== "unknown") {
        const result = await checkRateLimit(`api:${ip}`, RATE_LIMIT, WINDOW_MS);
        if (result.limited) {
          return rateLimitResponse(result.retryAfterSeconds);
        }
      }
    }

    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/fonts/") ||
    pathname.startsWith("/images/")
  ) {
    return applyStaticCacheHeaders(NextResponse.next());
  }

  const portalGuard = enforcePortalRbac(request);
  if (portalGuard) {
    return portalGuard;
  }

  return applyPageSecurityHeaders(request);
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|fonts/|images/|.*\\.woff2$).*)",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT = Number(process.env.API_RATE_LIMIT ?? 120);
const WINDOW_MS = 60 * 1000;
const RATE_LIMIT_DISABLED = process.env.DISABLE_API_RATE_LIMIT === "true";

const RATE_LIMIT_EXEMPT_PREFIXES = ["/api/next-auth/", "/api/health"];

const ipHits = new Map<string, number[]>();

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

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const hits = ipHits.get(key) ?? [];
  const recent = hits.filter((timestamp) => now - timestamp < WINDOW_MS);

  recent.push(now);
  ipHits.set(key, recent);

  if (ipHits.size > 10000) {
    ipHits.clear();
  }

  return recent.length > RATE_LIMIT;
}

function applyStaticCacheHeaders(response: NextResponse) {
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return response;
}

function rateLimitResponse() {
  return NextResponse.json({ message: "Too many requests" }, { status: 429 });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    if (!RATE_LIMIT_DISABLED && !isExemptApiPath(pathname)) {
      const ip = getClientIp(request);

      // Standalone Docker / local dev often has no client IP — skip shared "unknown" bucket.
      if (ip !== "unknown" && isRateLimited(ip)) {
        return rateLimitResponse();
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/_next/static/:path*", "/fonts/:path*", "/images/:path*"],
};

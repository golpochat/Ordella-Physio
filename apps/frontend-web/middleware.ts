import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT = 20;
const WINDOW_MS = 60 * 1000;

const ipHits = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.ip ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = ipHits.get(ip) ?? [];
  const recent = hits.filter((timestamp) => now - timestamp < WINDOW_MS);

  recent.push(now);
  ipHits.set(ip, recent);

  if (ipHits.size > 10000) {
    ipHits.clear();
  }

  return recent.length > RATE_LIMIT;
}

function applyStaticCacheHeaders(response: NextResponse) {
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return new NextResponse("Too many requests", { status: 429 });
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

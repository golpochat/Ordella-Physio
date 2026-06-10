import { type NextRequest, NextResponse } from "next/server";
import { proxyToGateway } from "./gateway-proxy";
import type { ApiServiceKey } from "./constants";

export function createProxyRouteHandlers(service: ApiServiceKey, feature: string) {
  async function handler(request: NextRequest) {
    try {
      return await proxyToGateway(request, service);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Proxy request failed";
      console.error(`[${feature} proxy]`, error);
      return NextResponse.json({ message, feature }, { status: 502 });
    }
  }
  return {
    GET: handler,
    POST: handler,
    PUT: handler,
    PATCH: handler,
    DELETE: handler,
  };
}

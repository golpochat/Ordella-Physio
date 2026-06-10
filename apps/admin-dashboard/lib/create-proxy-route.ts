import { type NextRequest } from "next/server";
import { notImplementedResponse, proxyToGateway } from "./gateway-proxy";
import type { ApiServiceKey } from "./constants";

export function createProxyRouteHandlers(service: ApiServiceKey, feature: string) {
  async function handler(request: NextRequest) {
    return proxyToGateway(request, service).catch(() => notImplementedResponse(feature));
  }

  return {
    GET: handler,
    POST: handler,
    PUT: handler,
    PATCH: handler,
    DELETE: handler,
  };
}

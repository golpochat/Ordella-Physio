import { type NextRequest } from "next/server";
import { enforceBffPortalIsolation } from "@/lib/auth/bff-rbac";
import { proxyToGateway } from "@/lib/gateway-proxy";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const denied = await enforceBffPortalIsolation(request, request.nextUrl.pathname);
  if (denied) {
    return denied;
  }

  return proxyToGateway(request, "messaging", "", { streaming: true });
}

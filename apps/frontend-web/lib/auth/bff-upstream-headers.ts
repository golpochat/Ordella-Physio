import { TENANT_HEADER } from "@/lib/constants";
import { getDefaultTenantId } from "@/lib/tenant-config";

type BuildAuthUpstreamHeadersOptions = {
  bodyText?: string;
  incomingHeaders?: Headers;
  authorization?: string | null;
};

function resolveTenantId(bodyText?: string, incomingHeaders?: Headers): string | undefined {
  if (bodyText) {
    try {
      const parsed = JSON.parse(bodyText) as { tenantId?: string };
      if (parsed.tenantId?.trim()) {
        return parsed.tenantId.trim();
      }
    } catch {
      // ignore malformed JSON
    }
  }

  const fromRequest = incomingHeaders?.get(TENANT_HEADER)?.trim();
  if (fromRequest) {
    return fromRequest;
  }

  return getDefaultTenantId();
}

export function buildAuthUpstreamHeaders(
  options: BuildAuthUpstreamHeadersOptions = {},
): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const tenantId = resolveTenantId(options.bodyText, options.incomingHeaders);
  if (tenantId) {
    headers[TENANT_HEADER] = tenantId;
  }

  const authorization =
    options.authorization ?? options.incomingHeaders?.get("authorization") ?? undefined;
  if (authorization) {
    headers.Authorization = authorization;
  }

  return headers;
}

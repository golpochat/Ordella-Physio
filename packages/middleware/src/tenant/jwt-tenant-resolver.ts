import { verifyToken, type AccessTokenPayload } from "@ordella/security";
import { TENANT_HEADER, USER_ROLE_HEADER } from "../common/constants";
import type { OrdellaRequest } from "../common/types";
import { getHeaderValue } from "../utils";

export function applyJwtTenantContext(request: OrdellaRequest): void {
  if (getHeaderValue(request, USER_ROLE_HEADER) ?? request.authContext?.role) {
    return;
  }

  const authorization = request.headers.authorization;
  if (typeof authorization !== "string" || !authorization.startsWith("Bearer ")) {
    return;
  }

  const secret = process.env.JWT_ACCESS_SECRET ?? process.env.JWT_SECRET;
  if (!secret) {
    return;
  }

  try {
    const payload = verifyToken<AccessTokenPayload>(authorization.slice("Bearer ".length).trim(), {
      algorithm: "HS256",
      secret,
    });

    request.headers[USER_ROLE_HEADER] = payload.role;

    if (payload.role === "SYSTEM") {
      request.isSystem = true;
      request.tenantId = undefined;
      delete request.headers[TENANT_HEADER];
      delete request.headers[TENANT_HEADER.toLowerCase()];
      request.authContext = {
        userId: payload.userId ?? payload.sub,
        role: payload.role,
        isSystem: true,
        ...(payload.email ? { email: payload.email } : {}),
      };
      return;
    }

    const tenantId = getHeaderValue(request, TENANT_HEADER) ?? payload.tenantId;
    if (tenantId) {
      request.headers[TENANT_HEADER] = tenantId;
      request.tenantId = tenantId;
    }
  } catch {
    // Route guards will reject invalid tokens.
  }
}

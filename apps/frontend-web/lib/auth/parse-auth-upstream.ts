type AuthUpstreamUser = {
  id: string;
  email: string;
  tenantId: string;
  role?: string;
  roles?: string[];
  permissions?: string[];
  firstName?: string;
  lastName?: string;
};

export type AuthUpstreamTokens = {
  accessToken: string;
  refreshToken: string;
  user: AuthUpstreamUser;
};

export type AuthUpstreamMfa = {
  mfaRequired: true;
  userId: string;
  tenantId: string;
};

export type AuthUpstreamTenantSelection = {
  requiresTenantSelection: true;
  tenants: unknown[];
};

export type ParsedAuthUpstream =
  | AuthUpstreamTokens
  | AuthUpstreamMfa
  | AuthUpstreamTenantSelection;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function unwrapAuthPayload(payload: unknown): unknown {
  if (!isRecord(payload)) {
    return null;
  }

  if ("data" in payload && payload.data !== undefined) {
    return payload.data;
  }

  return payload;
}

function isMfaPayload(value: unknown): value is AuthUpstreamMfa {
  return isRecord(value) && value.mfaRequired === true && typeof value.userId === "string";
}

function isTenantSelectionPayload(value: unknown): value is AuthUpstreamTenantSelection {
  return (
    isRecord(value) &&
    value.requiresTenantSelection === true &&
    Array.isArray(value.tenants)
  );
}

function isTokensPayload(value: unknown): value is AuthUpstreamTokens {
  return (
    isRecord(value) &&
    typeof value.accessToken === "string" &&
    typeof value.refreshToken === "string" &&
    isRecord(value.user) &&
    typeof value.user.id === "string"
  );
}

export function parseAuthUpstreamPayload(payload: unknown): ParsedAuthUpstream | null {
  const body = unwrapAuthPayload(payload);
  if (!body) {
    return null;
  }

  if (isTenantSelectionPayload(body)) {
    return body;
  }

  if (isMfaPayload(body)) {
    return body;
  }

  if (isTokensPayload(body)) {
    return body;
  }

  return null;
}

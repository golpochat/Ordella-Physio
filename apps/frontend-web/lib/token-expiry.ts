function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = atob(padded);
    const payload = JSON.parse(json) as Record<string, unknown>;
    return payload && typeof payload === "object" ? payload : null;
  } catch {
    return null;
  }
}

export function getAccessTokenExpiresAt(accessToken: string): number | null {
  const payload = decodeJwtPayload(accessToken);
  if (!payload || typeof payload.exp !== "number" || !Number.isFinite(payload.exp)) {
    return null;
  }

  return payload.exp * 1000;
}

export function isAccessTokenExpiringSoon(
  accessToken: string,
  bufferMs = 120_000,
  now = Date.now(),
): boolean {
  const expiresAt = getAccessTokenExpiresAt(accessToken);
  if (expiresAt === null) {
    return false;
  }

  return expiresAt - now <= bufferMs;
}

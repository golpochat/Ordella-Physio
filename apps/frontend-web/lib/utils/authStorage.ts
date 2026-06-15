const LEGACY_REFRESH_TOKEN_KEY = "ordella_refresh_token";

let memoryAccessToken: string | null = null;

export function getAccessToken(): string | null {
  return memoryAccessToken;
}

/** Refresh tokens live in HttpOnly cookies only — never in JS storage. */
export function getRefreshToken(): null {
  return null;
}

export function setAccessToken(accessToken: string): void {
  memoryAccessToken = accessToken;
}

export function setTokens(accessToken: string, _refreshToken?: string): void {
  memoryAccessToken = accessToken;
}

export function clearTokens(): void {
  memoryAccessToken = null;

  if (typeof window !== "undefined") {
    localStorage.removeItem(LEGACY_REFRESH_TOKEN_KEY);
    try {
      const raw = localStorage.getItem("ordella-auth");
      if (raw) {
        const parsed = JSON.parse(raw) as { state?: Record<string, unknown> };
        if (parsed.state) {
          delete parsed.state.refreshToken;
          localStorage.setItem("ordella-auth", JSON.stringify(parsed));
        }
      }
    } catch {
      // ignore migration errors
    }
  }
}

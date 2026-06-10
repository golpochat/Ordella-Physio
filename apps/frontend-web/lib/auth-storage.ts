import type { AuthUser } from "@/store/auth.store";

const AUTH_STORAGE_KEY = "ordella-auth";

type PersistedAuthState = {
  state?: {
    accessToken?: string | null;
    refreshToken?: string | null;
    user?: AuthUser | null;
    isAuthenticated?: boolean;
  };
};

export function getStoredAuthUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  return readPersistedAuthState()?.user ?? null;
}

function readPersistedAuthState(): PersistedAuthState["state"] | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as PersistedAuthState;
    return parsed.state ?? null;
  } catch {
    return null;
  }
}

export function getStoredAccessToken(): string | null {
  return readPersistedAuthState()?.accessToken ?? null;
}

export function getStoredRefreshToken(): string | null {
  return readPersistedAuthState()?.refreshToken ?? null;
}

export function getStoredIsAuthenticated(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const state = readPersistedAuthState();
  return Boolean(state?.isAuthenticated && state?.user);
}

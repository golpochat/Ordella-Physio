export const CSRF_COOKIE_NAME = "csrf-token";
export const CSRF_HEADER_NAME = "x-csrf-token";

export function readCsrfTokenFromDocument(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${CSRF_COOKIE_NAME}=`));

  if (!match) {
    return null;
  }

  return decodeURIComponent(match.slice(CSRF_COOKIE_NAME.length + 1));
}

let cachedCsrfToken: string | null = null;

export async function ensureCsrfToken(): Promise<string | null> {
  const existing = readCsrfTokenFromDocument();
  if (existing) {
    cachedCsrfToken = existing;
    return existing;
  }

  if (cachedCsrfToken) {
    return cachedCsrfToken;
  }

  try {
    const response = await fetch("/api/csrf", { credentials: "include" });
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { csrfToken?: string };
    cachedCsrfToken = payload.csrfToken ?? readCsrfTokenFromDocument();
    return cachedCsrfToken;
  } catch {
    return null;
  }
}

export function clearCsrfTokenCache(): void {
  cachedCsrfToken = null;
}

export function validateBffCsrf(request: Request, cookieToken?: string | null): boolean {
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  const resolvedCookieToken = cookieToken ?? readCsrfTokenFromDocument();
  return Boolean(resolvedCookieToken && headerToken && resolvedCookieToken === headerToken);
}

export const SESSION_COOKIE_NAME = "ordella-session";
export const REFRESH_COOKIE_NAME = "ordella-refresh";

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;
export const REFRESH_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function getSecureCookieOptions(maxAge: number) {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge,
  };
}

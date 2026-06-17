import type { AuthUser } from "@/store/auth.store";

import { clearCsrfTokenCache } from "@/lib/auth/csrf";

import type { SessionCookiePayload } from "@/lib/auth/session-types";



const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;



function buildSessionPayload(user: AuthUser): SessionCookiePayload {
  return {
    user: {
      id: user.id,
      role: user.role,
      effectiveRole: user.effectiveRole,
      tenantId: user.tenantId,
      organizationId: user.organizationId,
      roles: user.roles,
      permissions: user.permissions,
      resolvedPermissions: user.permissions,
    },
  };
}



export async function writeSessionCookie(user: AuthUser, refreshToken?: string | null): Promise<void> {

  if (typeof window === "undefined") {

    return;

  }



  await fetch("/api/auth/session", {

    method: "POST",

    credentials: "include",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({

      session: buildSessionPayload(user),

      refreshToken: refreshToken ?? undefined,

    }),

  }).catch(() => undefined);

}



export async function eraseSessionCookie(): Promise<void> {

  if (typeof window === "undefined") {

    return;

  }



  clearCsrfTokenCache();

  await fetch("/api/auth/session", {

    method: "DELETE",

    credentials: "include",

  }).catch(() => undefined);

}



export async function syncSessionCookieFromUser(

  user: AuthUser | null | undefined,

  refreshToken?: string | null,

): Promise<void> {

  if (!user) {

    await eraseSessionCookie();

    return;

  }



  await writeSessionCookie(user, refreshToken);

}



// Legacy no-op kept for call sites that only need max-age constant.

export const SESSION_COOKIE_MAX_AGE = SESSION_MAX_AGE_SECONDS;



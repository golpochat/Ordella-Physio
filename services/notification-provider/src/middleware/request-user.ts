import type { AuthenticatedProviderUser } from "@/utils/provider-user";

export function resolveRequestUser(request: {
  user?: AuthenticatedProviderUser;
}): AuthenticatedProviderUser | null {
  return request.user ?? null;
}

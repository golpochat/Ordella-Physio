import type { AuthenticatedFileUser } from "@/utils/file-user";

export function resolveRequestUser(request: {
  user?: AuthenticatedFileUser;
}): AuthenticatedFileUser | null {
  return request.user ?? null;
}

import type { ApiClientContext } from "@/lib/api-client";
import { resolveUserRoles, type PortalRole } from "@/lib/rbac";
import { isSystemUser } from "@/lib/auth/roleRedirect";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";
import { useUiStore } from "@/store/ui.store";
import { v4 as uuidv4 } from "uuid";

export function getApiClientContext(correlationId?: string | null): ApiClientContext {
  const accessToken = useAuthStore.getState().accessToken;
  const user = useAuthStore.getState().user;
  const roles: PortalRole[] = user ? resolveUserRoles(user) : [];
  const tenantFromStore = useTenantStore.getState().tenant?.id;
  const tenantId = isSystemUser(roles) ? null : (tenantFromStore ?? user?.tenantId ?? null);

  return {
    accessToken,
    tenantId,
    role: user?.role ?? null,
    roles: roles.length ? roles : null,
    correlationId: correlationId ?? useUiStore.getState().correlationId ?? uuidv4(),
  };
}

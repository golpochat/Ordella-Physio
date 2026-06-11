import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";
import { tenantMismatchError } from "@/utils/tenant-errors";

@Injectable()
export class TenantMatchGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      params: { id?: string; tenantId?: string };
      user?: AuthenticatedTenantUser;
    }>();

    const routeTenantId = request.params.tenantId ?? request.params.id;
    const user = request.user;

    if (user?.role === "SYSTEM") {
      return true;
    }

    if (!routeTenantId || !user?.tenantId) {
      return true;
    }

    if (user.role === "OWNER" && user.tenantId === routeTenantId) {
      return true;
    }

    if (user.tenantId !== routeTenantId) {
      throw tenantMismatchError();
    }

    return true;
  }
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { PERMISSIONS, rbacService } from "@ordella/security";
import { locationUpdateForbiddenError } from "@/utils/location-errors";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Injectable()
export class LocationUpdateManageGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedTenantUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    if (user.permissions?.includes(PERMISSIONS.LOCATION_MANAGE)) {
      return true;
    }

    if (
      !rbacService.hasPermission(
        { userId: user.userId, tenantId: user.tenantId, role: user.role as never },
        PERMISSIONS.LOCATION_MANAGE,
      )
    ) {
      throw locationUpdateForbiddenError();
    }

    return true;
  }
}

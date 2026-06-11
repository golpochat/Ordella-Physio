import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { hasOrganizationManageAccess } from "@/middleware/permission.middleware";
import { organizationForbiddenError } from "@/utils/organization-errors";
import type { AuthenticatedOrganizationUser } from "@/utils/organization-helpers";

@Injectable()
export class OrganizationManageGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedOrganizationUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    if (!hasOrganizationManageAccess({ role: user.role as never, permissions: user.permissions })) {
      throw organizationForbiddenError();
    }

    return true;
  }
}

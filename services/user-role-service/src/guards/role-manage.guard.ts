import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { hasRoleManageAccess } from "@/middleware/permission.middleware";
import { roleForbiddenError } from "@/utils/role-errors";
import type { AuthenticatedRoleUser } from "@/utils/role-helpers";

@Injectable()
export class RoleManageGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedRoleUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    if (!hasRoleManageAccess({ role: user.role as never, permissions: user.permissions })) {
      throw roleForbiddenError();
    }

    return true;
  }
}

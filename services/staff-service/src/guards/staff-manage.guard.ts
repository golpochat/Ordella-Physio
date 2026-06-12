import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { hasStaffManageAccess } from "@/middleware/permission.middleware";
import { staffForbiddenError } from "@/utils/staff-errors";
import type { AuthenticatedStaffUser } from "@/utils/staff-helpers";

@Injectable()
export class StaffManageGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedStaffUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    if (!hasStaffManageAccess({ role: user.role as never, permissions: user.permissions })) {
      throw staffForbiddenError();
    }

    return true;
  }
}

import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { AuthPermission } from "@/config/permissions";
import { hasPermissionForRole } from "@/config/permissions";
import { forbiddenError, unauthorizedError } from "@/utils/auth-errors";
import type { AuthenticatedRequestUser } from "@/utils/auth-helpers";

export const AUTH_PERMISSION_KEY = "auth:permission";

export const RequireAuthPermission = (permission: AuthPermission) =>
  SetMetadata(AUTH_PERMISSION_KEY, permission);

@Injectable()
export class PermissionEnforcementGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.getAllAndOverride<AuthPermission | undefined>(AUTH_PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!permission) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedRequestUser }>();
    const user = request.user;

    if (!user) {
      throw unauthorizedError();
    }

    if (!hasPermissionForRole(user.role, permission)) {
      throw forbiddenError("You do not have permission to perform this action.");
    }

    return true;
  }
}

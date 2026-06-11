import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { isSystem, roleMeetsMinLevel } from "@/utils/roles";
import { forbiddenError, unauthorizedError } from "@/utils/auth-errors";
import type { AuthenticatedRequestUser } from "@/utils/auth-helpers";

export const MIN_ROLE_LEVEL_KEY = "auth:minRoleLevel";

export const RequireMinRoleLevel = (level: number) => SetMetadata(MIN_ROLE_LEVEL_KEY, level);

@Injectable()
export class RoleEnforcementGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const minRoleLevel = this.reflector.getAllAndOverride<number | undefined>(MIN_ROLE_LEVEL_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (minRoleLevel === undefined) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedRequestUser }>();
    const user = request.user;

    if (!user) {
      throw unauthorizedError();
    }

    if (!isSystem(user) && !roleMeetsMinLevel(user.role, minRoleLevel)) {
      throw forbiddenError();
    }

    return true;
  }
}

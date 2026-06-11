import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  type Type,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./metadata";
import { roleAtLeast, type SecurityRole } from "../rbac/roles";
import type { SecurityUser } from "../rbac/rbac.service";

export const RequireRoles = (...roles: SecurityRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly reflector: Reflector;

  constructor(reflector?: Reflector) {
    this.reflector = reflector ?? new Reflector();
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<SecurityRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: SecurityUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    if (user.role === "SYSTEM") {
      return true;
    }

    const allowed = requiredRoles.some(
      (role) => user.role === role || roleAtLeast(user.role, role),
    );

    if (!allowed) {
      throw new ForbiddenException("Insufficient role");
    }

    return true;
  }
}

export function createRoleGuard(requiredRole: SecurityRole): Type<CanActivate> {
  @Injectable()
  class ConfiguredRoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<{ user?: SecurityUser }>();
      const user = request.user;

      if (!user) {
        throw new UnauthorizedException("Authentication required");
      }

      const allowed = user.role === requiredRole || roleAtLeast(user.role, requiredRole);

      if (!allowed) {
        throw new ForbiddenException("Insufficient role");
      }

      return true;
    }
  }

  return ConfiguredRoleGuard;
}

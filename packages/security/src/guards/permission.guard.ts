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
import { PERMISSIONS_KEY } from "./metadata";
import { rbacService } from "../rbac/rbac.service";
import type { Permission } from "../rbac/permissions";
import type { SecurityUser } from "../rbac/rbac.service";

export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly reflector: Reflector;

  constructor(reflector?: Reflector) {
    this.reflector = reflector ?? new Reflector();
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: SecurityUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    const allowed = requiredPermissions.every((permission) =>
      rbacService.hasPermission(user, permission),
    );

    if (!allowed) {
      throw new ForbiddenException("Missing required permission");
    }

    return true;
  }
}

export function createPermissionGuard(requiredPermission: Permission): Type<CanActivate> {
  @Injectable()
  class ConfiguredPermissionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<{ user?: SecurityUser }>();
      const user = request.user;

      if (!user) {
        throw new UnauthorizedException("Authentication required");
      }

      if (!rbacService.hasPermission(user, requiredPermission)) {
        throw new ForbiddenException("Missing required permission");
      }

      return true;
    }
  }

  return ConfiguredPermissionGuard;
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { hasAuditViewAccess } from "@/middleware/permission.middleware";
import { auditForbiddenError } from "@/utils/audit-errors";
import type { AuthenticatedAuditUser } from "@/utils/audit-helpers";

@Injectable()
export class AuditViewGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedAuditUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    if (!hasAuditViewAccess({ role: user.role as never, permissions: user.permissions })) {
      throw auditForbiddenError();
    }

    return true;
  }
}

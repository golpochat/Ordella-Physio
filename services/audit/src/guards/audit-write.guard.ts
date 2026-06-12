import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { hasAuditWriteInternalAccess } from "@/middleware/permission.middleware";
import { auditWriteForbiddenError } from "@/utils/audit-errors";
import type { AuthenticatedAuditUser } from "@/utils/audit-helpers";

@Injectable()
export class AuditWriteGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedAuditUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    if (!hasAuditWriteInternalAccess({ role: user.role as never, permissions: user.permissions })) {
      throw auditWriteForbiddenError();
    }

    return true;
  }
}

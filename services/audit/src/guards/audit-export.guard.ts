import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { hasAuditExportAccess } from "@/middleware/permission.middleware";
import { auditExportForbiddenError } from "@/utils/audit-errors";
import type { AuthenticatedAuditUser } from "@/utils/audit-helpers";

@Injectable()
export class AuditExportGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedAuditUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    if (!hasAuditExportAccess({ role: user.role as never, permissions: user.permissions })) {
      throw auditExportForbiddenError();
    }

    return true;
  }
}

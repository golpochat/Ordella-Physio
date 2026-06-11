import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { hasTerminalManageAccess } from "@/middleware/permission.middleware";
import { terminalForbiddenError } from "@/utils/terminal-errors";
import type { AuthenticatedTerminalUser } from "@/utils/terminal-helpers";

@Injectable()
export class TerminalManageGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedTerminalUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    if (!hasTerminalManageAccess({ role: user.role as never, permissions: user.permissions })) {
      throw terminalForbiddenError();
    }

    return true;
  }
}

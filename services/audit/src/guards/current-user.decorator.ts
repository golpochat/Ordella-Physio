import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedAuditUser } from "@/utils/audit-helpers";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedAuditUser | undefined => {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedAuditUser }>();
    return request.user;
  },
);

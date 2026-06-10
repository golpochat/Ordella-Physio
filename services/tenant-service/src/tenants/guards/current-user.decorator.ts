import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedTenantUser | undefined => {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedTenantUser }>();
    return request.user;
  },
);

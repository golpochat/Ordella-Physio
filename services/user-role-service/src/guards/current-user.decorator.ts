import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedRoleUser } from "@/utils/role-helpers";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedRoleUser | undefined => {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedRoleUser }>();
    return request.user;
  },
);

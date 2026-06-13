import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedSecurityUser } from "@/utils/security-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedSecurityUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedSecurityUser }>();
    return request.user;
  },
);

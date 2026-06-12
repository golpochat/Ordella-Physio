import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedSearchUser } from "@/utils/search-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedSearchUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedSearchUser }>();
    return request.user;
  },
);

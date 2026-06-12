import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedProviderUser } from "@/utils/provider-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedProviderUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedProviderUser }>();
    return request.user;
  },
);

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedSubscriptionUser } from "@/utils/subscription-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedSubscriptionUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedSubscriptionUser }>();
    return request.user;
  },
);

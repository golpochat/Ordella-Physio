import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedBillingUser } from "@/utils/billing-helpers";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedBillingUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedBillingUser }>();
    return request.user;
  },
);

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedObservabilityUser } from "@/utils/observability-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedObservabilityUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedObservabilityUser }>();
    return request.user;
  },
);

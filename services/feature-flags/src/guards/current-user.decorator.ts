import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedFeatureFlagsUser } from "@/utils/feature-flags-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedFeatureFlagsUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedFeatureFlagsUser }>();
    return request.user;
  },
);

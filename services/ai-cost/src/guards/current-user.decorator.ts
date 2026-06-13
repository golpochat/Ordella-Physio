import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedCostUser } from "@/utils/cost-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedCostUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedCostUser }>();
    return request.user;
  },
);

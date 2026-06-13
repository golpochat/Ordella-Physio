import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedAgentsUser } from "@/utils/agents-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedAgentsUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedAgentsUser }>();
    return request.user;
  },
);

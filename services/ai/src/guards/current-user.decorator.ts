import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedAiUser } from "@/utils/ai-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedAiUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedAiUser }>();
    return request.user;
  },
);

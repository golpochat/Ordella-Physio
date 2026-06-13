import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedTrainingUser } from "@/utils/training-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedTrainingUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedTrainingUser }>();
    return request.user;
  },
);

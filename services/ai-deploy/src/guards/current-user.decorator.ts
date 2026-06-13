import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedDeployUser } from "@/utils/deploy-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedDeployUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedDeployUser }>();
    return request.user;
  },
);

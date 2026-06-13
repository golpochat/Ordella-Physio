import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedGatewayUser } from "@/utils/gateway-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedGatewayUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedGatewayUser }>();
    return request.user;
  },
);

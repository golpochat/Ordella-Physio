import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedMonitoringUser } from "@/utils/monitoring-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedMonitoringUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedMonitoringUser }>();
    return request.user;
  },
);

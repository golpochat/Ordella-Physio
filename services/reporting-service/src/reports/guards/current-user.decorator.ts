import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedReportingUser } from "@/utils/reporting-helpers";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedReportingUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedReportingUser }>();
    return request.user;
  },
);

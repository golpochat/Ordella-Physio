import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedStaffUser } from "@/utils/staff-helpers";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedStaffUser | undefined => {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedStaffUser }>();
    return request.user;
  },
);

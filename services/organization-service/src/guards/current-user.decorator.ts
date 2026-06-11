import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedOrganizationUser } from "@/utils/organization-helpers";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedOrganizationUser | undefined => {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedOrganizationUser }>();
    return request.user;
  },
);

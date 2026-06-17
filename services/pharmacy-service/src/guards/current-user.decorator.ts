import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { OrdellaRequest } from "@ordella/middleware";
import type { AuthenticatedPharmacyUser } from "@/utils/pharmacy-helpers";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedPharmacyUser => {
    const request = context.switchToHttp().getRequest<OrdellaRequest & { user?: AuthenticatedPharmacyUser }>();
    return request.user as AuthenticatedPharmacyUser;
  },
);

export const TenantId = createParamDecorator((_data: unknown, context: ExecutionContext): string => {
  const request = context.switchToHttp().getRequest<OrdellaRequest>();
  return request.tenantId ?? request.authContext?.tenantId ?? "";
});

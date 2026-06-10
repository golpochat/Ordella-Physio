import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { OrdellaRequest } from "@ordella/middleware";

export const TenantId = createParamDecorator((_data: unknown, context: ExecutionContext): string => {
  const request = context.switchToHttp().getRequest<OrdellaRequest>();
  return request.tenantId ?? request.authContext?.tenantId ?? "";
});

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { OrdellaRequest } from "@ordella/middleware";
import type { AuthenticatedTerminalUser } from "@/utils/terminal-helpers";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedTerminalUser | undefined => {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedTerminalUser }>();
    return request.user;
  },
);

export const TenantId = createParamDecorator((_data: unknown, context: ExecutionContext): string => {
  const request = context.switchToHttp().getRequest<OrdellaRequest>();
  return request.tenantId ?? request.authContext?.tenantId ?? "";
});

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedTerminalUser } from "@/utils/terminal-helpers";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedTerminalUser | undefined => {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedTerminalUser }>();
    return request.user;
  },
);

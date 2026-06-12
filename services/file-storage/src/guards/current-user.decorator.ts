import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedFileUser } from "@/utils/file-user";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedFileUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedFileUser }>();
    return request.user;
  },
);

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedAppointmentUser } from "@/appointments/strategies/jwt.strategy";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedAppointmentUser | undefined => {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedAppointmentUser }>();
    return request.user;
  },
);

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { hasAppointmentManageAccess } from "@/middleware/permission.middleware";
import { appointmentForbiddenError } from "@/utils/appointment-errors";
import type { AuthenticatedAppointmentUser } from "@/appointments/strategies/jwt.strategy";

@Injectable()
export class AppointmentManageGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedAppointmentUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    if (!hasAppointmentManageAccess({ role: user.role as never, permissions: user.permissions })) {
      throw appointmentForbiddenError();
    }

    return true;
  }
}

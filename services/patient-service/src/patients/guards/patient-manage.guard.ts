import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { PERMISSIONS, rbacService } from "@ordella/security";
import { patientForbiddenError } from "@/utils/patient-errors";

type PatientRequestUser = {
  userId: string;
  tenantId: string;
  role: string;
  permissions?: string[];
};

@Injectable()
export class PatientManageGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: PatientRequestUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    const hasManagePermission =
      user.permissions?.includes(PERMISSIONS.PATIENT_MANAGE) ||
      rbacService.hasPermission(
        { userId: user.userId, tenantId: user.tenantId, role: user.role as never },
        PERMISSIONS.PATIENT_MANAGE,
      ) ||
      rbacService.hasPermission(
        { userId: user.userId, tenantId: user.tenantId, role: user.role as never },
        PERMISSIONS.PATIENT_WRITE,
      );

    if (!hasManagePermission) {
      throw patientForbiddenError();
    }

    return true;
  }
}

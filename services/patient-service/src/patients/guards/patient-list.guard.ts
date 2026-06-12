import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { PERMISSIONS, rbacService } from "@ordella/security";
import { patientForbiddenError } from "@/utils/patient-errors";

type PatientRequestUser = {
  userId: string;
  tenantId: string;
  role: string;
  permissions?: string[];
};

const LIST_PERMISSIONS = [
  PERMISSIONS.PATIENT_MANAGE,
  PERMISSIONS.PATIENT_READ,
  PERMISSIONS.PATIENT_WRITE,
] as const;

@Injectable()
export class PatientListGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: PatientRequestUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    const hasListPermission = LIST_PERMISSIONS.some(
      (permission) =>
        user.permissions?.includes(permission) ||
        rbacService.hasPermission(
          { userId: user.userId, tenantId: user.tenantId, role: user.role as never },
          permission,
        ),
    );

    if (!hasListPermission) {
      throw patientForbiddenError("You do not have permission to view patients.");
    }

    return true;
  }
}

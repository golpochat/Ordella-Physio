import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { PERMISSIONS, rbacService } from "@ordella/security";
import { patientNotesForbiddenError } from "@/utils/patient-note-errors";

type PatientNotesRequestUser = {
  userId: string;
  tenantId: string;
  role: string;
  permissions?: string[];
};

@Injectable()
export class PatientNotesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: PatientNotesRequestUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    const hasNotesPermission =
      user.permissions?.includes(PERMISSIONS.PATIENT_NOTES) ||
      rbacService.hasPermission(
        { userId: user.userId, tenantId: user.tenantId, role: user.role as never },
        PERMISSIONS.PATIENT_NOTES,
      );

    if (!hasNotesPermission) {
      throw patientNotesForbiddenError();
    }

    return true;
  }
}

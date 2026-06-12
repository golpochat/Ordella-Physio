import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { PERMISSIONS, rbacService } from "@ordella/security";
import { patientAttachmentsForbiddenError } from "@/utils/patient-attachment-errors";

type PatientAttachmentsRequestUser = {
  userId: string;
  tenantId: string;
  role: string;
  permissions?: string[];
};

@Injectable()
export class PatientAttachmentsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: PatientAttachmentsRequestUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    const hasPermission =
      user.permissions?.includes(PERMISSIONS.PATIENT_ATTACHMENTS) ||
      rbacService.hasPermission(
        { userId: user.userId, tenantId: user.tenantId, role: user.role as never },
        PERMISSIONS.PATIENT_ATTACHMENTS,
      );

    if (!hasPermission) {
      throw patientAttachmentsForbiddenError();
    }

    return true;
  }
}

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthenticatedPatientUser } from "@/utils/patient-helpers";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedPatientUser => {
    const request = context.switchToHttp().getRequest<{ user: AuthenticatedPatientUser }>();
    return request.user;
  },
);

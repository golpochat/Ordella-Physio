import { fileTenantMismatchError } from "@/utils/file-errors";
import type { AuthenticatedFileUser } from "@/utils/file-user";

export function assertTenantAccess(recordTenantId: string, user: AuthenticatedFileUser): void {
  if (recordTenantId !== user.tenantId && user.role !== "SYSTEM") {
    throw fileTenantMismatchError();
  }
}

import { Injectable } from "@nestjs/common";
import type { Prisma, StaffConfig } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class StaffConfigRepository {
  constructor(private readonly database: DatabaseService) {}

  findByStaffAndNamespace(staffId: string, namespace: string): Promise<StaffConfig | null> {
    return this.database.staffConfig.findUnique({
      where: {
        staffId_namespace: { staffId, namespace },
      },
    });
  }

  findAllByStaffId(staffId: string): Promise<StaffConfig[]> {
    return this.database.staffConfig.findMany({
      where: { staffId },
      orderBy: { namespace: "asc" },
    });
  }

  upsert(
    staffId: string,
    namespace: string,
    data: Prisma.InputJsonValue,
    updatedByUserId?: string,
  ): Promise<StaffConfig> {
    return this.database.staffConfig.upsert({
      where: {
        staffId_namespace: { staffId, namespace },
      },
      create: {
        staff: { connect: { id: staffId } },
        namespace,
        data,
        updatedByUserId: updatedByUserId ?? null,
      },
      update: {
        data,
        updatedByUserId: updatedByUserId ?? null,
      },
    });
  }
}

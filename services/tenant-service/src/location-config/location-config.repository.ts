import { Injectable } from "@nestjs/common";
import type { Prisma, LocationConfig } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class LocationConfigRepository {
  constructor(private readonly database: DatabaseService) {}

  findByLocationAndNamespace(
    locationId: string,
    namespace: string,
  ): Promise<LocationConfig | null> {
    return this.database.locationConfig.findUnique({
      where: {
        locationId_namespace: { locationId, namespace },
      },
    });
  }

  findAllByLocationId(locationId: string): Promise<LocationConfig[]> {
    return this.database.locationConfig.findMany({
      where: { locationId },
      orderBy: { namespace: "asc" },
    });
  }

  upsert(
    locationId: string,
    namespace: string,
    data: Prisma.InputJsonValue,
    updatedByUserId?: string,
  ): Promise<LocationConfig> {
    return this.database.locationConfig.upsert({
      where: {
        locationId_namespace: { locationId, namespace },
      },
      create: {
        location: { connect: { id: locationId } },
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

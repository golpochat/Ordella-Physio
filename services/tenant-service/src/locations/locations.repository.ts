import { Injectable } from "@nestjs/common";
import type { Location, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class LocationsRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<Location, Prisma.LocationCreateInput, Prisma.LocationUpdateInput>(
      this.database.location as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Pick<Prisma.LocationCreateInput, "name" | "address" | "phone">) {
    return this.forTenant(tenantId).create(data as Prisma.LocationCreateInput);
  }

  findByTenant(tenantId: string) {
    return this.forTenant(tenantId).findMany([], { isArchived: false } as Prisma.LocationWhereInput);
  }

  findById(tenantId: string, locationId: string) {
    return this.forTenant(tenantId).findById(locationId);
  }

  update(tenantId: string, locationId: string, data: Prisma.LocationUpdateInput) {
    return this.forTenant(tenantId).update(locationId, data);
  }

  archive(tenantId: string, locationId: string) {
    return this.forTenant(tenantId).update(locationId, { isArchived: true });
  }
}

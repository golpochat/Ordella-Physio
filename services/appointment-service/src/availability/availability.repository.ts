import { Injectable } from "@nestjs/common";
import type { Availability, Prisma } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AvailabilityRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<
      Availability,
      Prisma.AvailabilityCreateInput,
      Prisma.AvailabilityUpdateInput
    >(this.database.availability as never, { tenantId });
  }

  create(tenantId: string, data: Omit<Prisma.AvailabilityCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.AvailabilityCreateInput);
  }

  findByTherapist(tenantId: string, therapistId: string) {
    return this.forTenant(tenantId).findMany([], { therapistId } as Prisma.AvailabilityWhereInput);
  }

  findById(tenantId: string, availabilityId: string) {
    return this.forTenant(tenantId).findById(availabilityId);
  }

  update(tenantId: string, availabilityId: string, data: Prisma.AvailabilityUpdateInput) {
    return this.forTenant(tenantId).update(availabilityId, data);
  }
}

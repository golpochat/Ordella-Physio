import { Injectable } from "@nestjs/common";
import type { Prisma, Staff } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class StaffRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<Staff, Prisma.StaffCreateInput, Prisma.StaffUpdateInput>(
      this.database.staff as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Pick<Prisma.StaffCreateInput, "userId" | "role">) {
    return this.forTenant(tenantId).create(data as Prisma.StaffCreateInput);
  }

  findByTenant(tenantId: string) {
    return this.forTenant(tenantId).findMany();
  }

  findById(tenantId: string, staffId: string) {
    return this.forTenant(tenantId).findById(staffId);
  }

  updateRole(tenantId: string, staffId: string, data: Prisma.StaffUpdateInput) {
    return this.forTenant(tenantId).update(staffId, data);
  }

  remove(tenantId: string, staffId: string) {
    return this.forTenant(tenantId).delete(staffId);
  }
}

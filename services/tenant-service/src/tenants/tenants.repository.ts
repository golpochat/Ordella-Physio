import { Injectable } from "@nestjs/common";
import type { Prisma, Tenant } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class TenantsRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.TenantCreateInput): Promise<Tenant> {
    return this.database.tenant.create({ data });
  }

  findById(id: string): Promise<Tenant | null> {
    return this.database.tenant.findUnique({ where: { id } });
  }

  findBySlug(slug: string): Promise<Tenant | null> {
    return this.database.tenant.findUnique({ where: { slug } });
  }

  findByCode(code: string): Promise<Tenant | null> {
    return this.database.tenant.findUnique({ where: { code } });
  }

  findMany(params?: { skip?: number; take?: number }): Promise<Tenant[]> {
    return this.database.tenant.findMany({
      skip: params?.skip,
      take: params?.take,
      orderBy: { createdAt: "desc" },
    });
  }

  update(id: string, data: Prisma.TenantUpdateInput): Promise<Tenant> {
    return this.database.tenant.update({ where: { id }, data });
  }

  setActiveState(id: string, isActive: boolean): Promise<Tenant> {
    return this.setStatus(id, isActive ? "ACTIVE" : "SUSPENDED");
  }

  setStatus(id: string, status: "ACTIVE" | "SUSPENDED"): Promise<Tenant> {
    return this.update(id, {
      status,
      isActive: status === "ACTIVE",
    });
  }

  findByOrganizationId(organizationId: string): Promise<Tenant[]> {
    return this.database.tenant.findMany({
      where: { organizationId },
      orderBy: { name: "asc" },
    });
  }

  findUnassigned(): Promise<Tenant[]> {
    return this.database.tenant.findMany({
      where: { organizationId: null },
      orderBy: { name: "asc" },
    });
  }

  setOrganizationId(id: string, organizationId: string | null): Promise<Tenant> {
    return this.update(id, { organizationId });
  }
}

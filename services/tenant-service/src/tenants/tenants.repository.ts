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
    return this.update(id, { isActive });
  }
}

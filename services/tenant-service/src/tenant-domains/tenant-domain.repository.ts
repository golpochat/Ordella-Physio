import { Injectable } from "@nestjs/common";
import type { Prisma, TenantDomain } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class TenantDomainRepository {
  constructor(private readonly database: DatabaseService) {}

  findById(id: string): Promise<TenantDomain | null> {
    return this.database.tenantDomain.findUnique({ where: { id } });
  }

  findByDomain(domain: string): Promise<TenantDomain | null> {
    return this.database.tenantDomain.findUnique({ where: { domain } });
  }

  findByTenantId(tenantId: string): Promise<TenantDomain[]> {
    return this.database.tenantDomain.findMany({
      where: { tenantId },
      orderBy: [{ type: "asc" }, { createdAt: "asc" }],
    });
  }

  findPrimaryByTenantId(tenantId: string): Promise<TenantDomain | null> {
    return this.database.tenantDomain.findFirst({
      where: { tenantId, type: "PRIMARY" },
    });
  }

  create(data: Prisma.TenantDomainCreateInput): Promise<TenantDomain> {
    return this.database.tenantDomain.create({ data });
  }

  update(id: string, data: Prisma.TenantDomainUpdateInput): Promise<TenantDomain> {
    return this.database.tenantDomain.update({ where: { id }, data });
  }

  delete(id: string): Promise<TenantDomain> {
    return this.database.tenantDomain.delete({ where: { id } });
  }
}

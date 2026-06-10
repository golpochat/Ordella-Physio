import { Injectable } from "@nestjs/common";
import type { Prisma, Template } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class TemplatesRepository {
  constructor(private readonly database: DatabaseService) {}

  private forTenant(tenantId: string) {
    return new TenantRepository<Template, Prisma.TemplateCreateInput, Prisma.TemplateUpdateInput>(
      this.database.template as never,
      { tenantId },
    );
  }

  create(tenantId: string, data: Omit<Prisma.TemplateCreateInput, "tenantId">) {
    return this.forTenant(tenantId).create(data as Prisma.TemplateCreateInput);
  }

  findById(tenantId: string, templateId: string) {
    return this.forTenant(tenantId).findById(templateId);
  }

  findByKey(tenantId: string, key: string) {
    return this.database.template.findFirst({ where: { tenantId, key } });
  }

  list(tenantId: string) {
    return this.database.template.findMany({
      where: { tenantId },
      orderBy: { key: "asc" },
    });
  }

  update(tenantId: string, templateId: string, data: Prisma.TemplateUpdateInput) {
    return this.forTenant(tenantId).update(templateId, data);
  }
}

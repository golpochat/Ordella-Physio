import { Injectable } from "@nestjs/common";
import type { Prisma, TenantBranding } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class BrandingRepository {
  constructor(private readonly database: DatabaseService) {}

  findByTenantId(tenantId: string): Promise<TenantBranding | null> {
    return this.database.tenantBranding.findUnique({ where: { tenantId } });
  }

  upsert(tenantId: string, data: Prisma.TenantBrandingUpdateInput): Promise<TenantBranding> {
    return this.database.tenantBranding.upsert({
      where: { tenantId },
      create: {
        tenantId,
        logoUrl: data.logoUrl as string | undefined,
        primaryColor: data.primaryColor as string | undefined,
        secondaryColor: data.secondaryColor as string | undefined,
        theme: data.theme as string | undefined,
        emailTemplateKey: data.emailTemplateKey as string | undefined,
        metadata: data.metadata as Prisma.InputJsonValue | undefined,
      },
      update: data,
    });
  }
}

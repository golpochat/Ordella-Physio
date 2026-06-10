import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { BrandingRepository } from "@/branding/branding.repository";
import type { UpdateBrandingDto } from "@/branding/dto/update-branding.dto";
import { toBrandingResponse } from "@/tenants/tenants.mapper";

@Injectable()
export class BrandingService {
  constructor(private readonly brandingRepository: BrandingRepository) {}

  async getBranding(tenantId: string) {
    const branding = await this.brandingRepository.findByTenantId(tenantId);
    return branding ? toBrandingResponse(branding) : null;
  }

  async updateBranding(tenantId: string, dto: UpdateBrandingDto) {
    const branding = await this.brandingRepository.upsert(tenantId, {
      ...dto,
      metadata: dto.metadata as Prisma.InputJsonValue | undefined,
    });
    return toBrandingResponse(branding);
  }
}

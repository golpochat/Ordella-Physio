import { Module } from "@nestjs/common";
import { BrandingService } from "@/branding/branding.service";
import { BrandingRepository } from "@/branding/branding.repository";

@Module({
  providers: [BrandingService, BrandingRepository],
  exports: [BrandingService, BrandingRepository],
})
export class BrandingModule {}

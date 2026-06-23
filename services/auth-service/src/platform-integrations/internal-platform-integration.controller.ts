import { Controller, Get } from "@nestjs/common";
import { PlatformIntegrationService } from "@/platform-integrations/platform-integration.service";

@Controller("auth/internal/platform/integrations")
export class InternalPlatformIntegrationController {
  constructor(private readonly platformIntegrationService: PlatformIntegrationService) {}

  @Get("address-lookup/active")
  getActiveAddressLookupIntegration() {
    return this.platformIntegrationService.getAddressLookupRuntimeConfig();
  }
}

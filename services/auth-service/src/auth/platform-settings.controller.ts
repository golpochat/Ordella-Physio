import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { TenantGuard as SecurityTenantGuard } from "@ordella/security";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { PermissionEnforcementGuard, RequireAuthPermission } from "@/auth/guards/permission-enforcement.guard";
import { PlatformSettingsService } from "@/auth/platform-settings.service";
import type { PlatformSettingsRecord } from "@/auth/platform-settings.types";

@Controller("auth")
@UseGuards(JwtGuard, SecurityTenantGuard, PermissionEnforcementGuard)
export class PlatformSettingsController {
  constructor(private readonly platformSettingsService: PlatformSettingsService) {}

  @Get("settings")
  @RequireAuthPermission("settings.manage")
  getSettings() {
    return this.platformSettingsService.get();
  }

  @Patch("settings")
  @RequireAuthPermission("settings.manage")
  updateSettings(@Body() payload: Partial<PlatformSettingsRecord>) {
    return this.platformSettingsService.update(payload);
  }
}

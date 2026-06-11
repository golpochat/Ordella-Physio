import { Body, Controller, ForbiddenException, Get, Patch, UseGuards } from "@nestjs/common";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { PlatformSettingsService } from "@/auth/platform-settings.service";
import type { PlatformSettingsRecord } from "@/auth/platform-settings.types";
import { CurrentUser, type AuthenticatedRequestUser } from "@/utils/auth-helpers";

@Controller("auth")
export class PlatformSettingsController {
  constructor(private readonly platformSettingsService: PlatformSettingsService) {}

  @Get("settings")
  @UseGuards(JwtGuard)
  getSettings(@CurrentUser() user: AuthenticatedRequestUser) {
    this.assertSystemUser(user);
    return this.platformSettingsService.get();
  }

  @Patch("settings")
  @UseGuards(JwtGuard)
  updateSettings(
    @CurrentUser() user: AuthenticatedRequestUser,
    @Body() payload: Partial<PlatformSettingsRecord>,
  ) {
    this.assertSystemUser(user);
    return this.platformSettingsService.update(payload);
  }

  private assertSystemUser(user: AuthenticatedRequestUser) {
    if (user.role !== "SYSTEM") {
      throw new ForbiddenException("Insufficient role");
    }
  }
}

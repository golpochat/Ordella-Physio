import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { StaffConfigService } from "@/services/staff-config.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { StaffManageGuard } from "@/guards/staff-manage.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedStaffUser } from "@/utils/staff-helpers";

@Controller("staff")
export class StaffConfigController {
  constructor(private readonly staffConfigService: StaffConfigService) {}

  @Get(":staffId/config")
  @UseGuards(JwtGuard, StaffManageGuard)
  listNamespaces(
    @Param("staffId") staffId: string,
    @CurrentUser() user: AuthenticatedStaffUser,
  ) {
    return this.staffConfigService.listNamespaces(staffId, user);
  }

  @Get(":staffId/config/:namespace")
  @UseGuards(JwtGuard, StaffManageGuard)
  getConfig(
    @Param("staffId") staffId: string,
    @Param("namespace") namespace: string,
    @CurrentUser() user: AuthenticatedStaffUser,
  ) {
    return this.staffConfigService.getConfig(staffId, namespace, user);
  }

  @Put(":staffId/config/:namespace")
  @UseGuards(JwtGuard, StaffManageGuard)
  updateConfig(
    @Param("staffId") staffId: string,
    @Param("namespace") namespace: string,
    @Body() body: { data?: unknown },
    @CurrentUser() user: AuthenticatedStaffUser,
  ) {
    return this.staffConfigService.updateConfig(
      staffId,
      namespace,
      body?.data ?? body,
      user,
    );
  }
}

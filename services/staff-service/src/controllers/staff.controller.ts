import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import type { CreateStaffPayload, UpdateStaffPayload } from "@/models/Staff";
import { StaffService } from "@/services/staff.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { StaffManageGuard } from "@/guards/staff-manage.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedStaffUser } from "@/utils/staff-helpers";

@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "staff-service" };
  }

  @Get()
  @UseGuards(JwtGuard, StaffManageGuard)
  list(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedStaffUser,
  ) {
    return this.staffService.listStaff(query, user);
  }

  @Post()
  @UseGuards(JwtGuard, StaffManageGuard)
  create(@Body() payload: CreateStaffPayload, @CurrentUser() user: AuthenticatedStaffUser) {
    return this.staffService.createStaff(payload, user);
  }

  @Get(":id")
  @UseGuards(JwtGuard, StaffManageGuard)
  getById(@Param("id") id: string, @CurrentUser() user: AuthenticatedStaffUser) {
    return this.staffService.getStaff(id, user);
  }

  @Put(":id")
  @UseGuards(JwtGuard, StaffManageGuard)
  update(
    @Param("id") id: string,
    @Body() payload: UpdateStaffPayload,
    @CurrentUser() user: AuthenticatedStaffUser,
  ) {
    return this.staffService.updateStaff(id, payload, user);
  }

  @Post(":id/deactivate")
  @UseGuards(JwtGuard, StaffManageGuard)
  deactivate(@Param("id") id: string, @CurrentUser() user: AuthenticatedStaffUser) {
    return this.staffService.deactivateStaff(id, user);
  }

  @Post(":id/activate")
  @UseGuards(JwtGuard, StaffManageGuard)
  activate(@Param("id") id: string, @CurrentUser() user: AuthenticatedStaffUser) {
    return this.staffService.activateStaff(id, user);
  }
}

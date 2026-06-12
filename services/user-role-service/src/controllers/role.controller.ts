import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import type { CreateRolePayload, UpdateRolePayload } from "@/models/Role";
import { RoleService } from "@/services/role.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { RoleManageGuard } from "@/guards/role-manage.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedRoleUser } from "@/utils/role-helpers";

@Controller("roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "user-role-service" };
  }

  @Get("permissions")
  @UseGuards(JwtGuard, RoleManageGuard)
  listPermissions() {
    return this.roleService.listPermissions();
  }

  @Get()
  @UseGuards(JwtGuard, RoleManageGuard)
  list(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedRoleUser,
  ) {
    return this.roleService.listRoles(query, user);
  }

  @Post()
  @UseGuards(JwtGuard, RoleManageGuard)
  create(@Body() payload: CreateRolePayload, @CurrentUser() user: AuthenticatedRoleUser) {
    return this.roleService.createRole(payload, user);
  }

  @Get(":id")
  @UseGuards(JwtGuard, RoleManageGuard)
  getById(@Param("id") id: string, @CurrentUser() user: AuthenticatedRoleUser) {
    return this.roleService.getRole(id, user);
  }

  @Put(":id")
  @UseGuards(JwtGuard, RoleManageGuard)
  update(
    @Param("id") id: string,
    @Body() payload: UpdateRolePayload,
    @CurrentUser() user: AuthenticatedRoleUser,
  ) {
    return this.roleService.updateRole(id, payload, user);
  }

  @Delete(":id")
  @UseGuards(JwtGuard, RoleManageGuard)
  delete(@Param("id") id: string, @CurrentUser() user: AuthenticatedRoleUser) {
    return this.roleService.deleteRole(id, user);
  }
}

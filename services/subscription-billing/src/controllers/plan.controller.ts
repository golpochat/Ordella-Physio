import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { PlanService } from "@/services/plan.service";
import { JwtGuard } from "@/guards/jwt.guard";

@Controller("plans")
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_READ)
  listPlans() {
    return this.planService.listPlans(true);
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_ADMIN)
  createPlan(@Body() body: Record<string, unknown>) {
    return this.planService.createPlan(body);
  }

  @Put(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_ADMIN)
  updatePlan(@Param("id") id: string, @Body() body: Record<string, unknown>) {
    return this.planService.updatePlan(id, body);
  }

  @Post("sync-stripe")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_ADMIN)
  syncStripe() {
    return this.planService.syncAllPlansWithStripe();
  }
}

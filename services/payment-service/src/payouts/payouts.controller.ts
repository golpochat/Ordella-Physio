import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { createPayoutSchema, UseZodValidation } from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { PayoutsService } from "@/payouts/payouts.service";
import { JwtGuard } from "@/payment-intents/guards/jwt.guard";
import { TenantId } from "@/payment-intents/guards/tenant-id.decorator";
import type { CreatePayoutDto } from "@/payouts/dto/create-payout.dto";

@Controller("payments/payouts")
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.write")
  @UseZodValidation(createPayoutSchema)
  create(
    @TenantId() tenantId: string,
    @Body() dto: CreatePayoutDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.payoutsService.create(tenantId, dto, request.correlationId);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.read")
  list(@TenantId() tenantId: string, @Query("providerId") providerId?: string) {
    return this.payoutsService.list(tenantId, providerId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.payoutsService.findById(tenantId, id);
  }
}

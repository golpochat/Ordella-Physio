import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { createRefundSchema, UseZodValidation } from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { RefundsService } from "@/refunds/refunds.service";
import { JwtGuard } from "@/payment-intents/guards/jwt.guard";
import { TenantId } from "@/payment-intents/guards/tenant-id.decorator";
import type { CreateRefundDto } from "@/refunds/dto/create-refund.dto";

@Controller("payments/refunds")
export class RefundsController {
  constructor(private readonly refundsService: RefundsService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.write")
  @UseZodValidation(createRefundSchema)
  create(
    @TenantId() tenantId: string,
    @Body() dto: CreateRefundDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.refundsService.create(tenantId, dto, request.correlationId);
  }

  @Get("by-payment-intent/:paymentIntentId")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.read")
  listByPaymentIntent(
    @TenantId() tenantId: string,
    @Param("paymentIntentId") paymentIntentId: string,
  ) {
    return this.refundsService.listByPaymentIntent(tenantId, paymentIntentId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.refundsService.findById(tenantId, id);
  }
}

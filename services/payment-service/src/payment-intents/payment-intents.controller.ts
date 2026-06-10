import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  cancelPaymentIntentSchema,
  confirmPaymentSchema,
  createPaymentIntentSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { PaymentIntentsService } from "@/payment-intents/payment-intents.service";
import { JwtGuard } from "@/payment-intents/guards/jwt.guard";
import { TenantId } from "@/payment-intents/guards/tenant-id.decorator";
import type { CreatePaymentIntentDto } from "@/payment-intents/dto/create-payment-intent.dto";
import type { ConfirmPaymentDto } from "@/payment-intents/dto/confirm-payment.dto";
import type { CancelPaymentIntentDto } from "@/payment-intents/dto/cancel-payment-intent.dto";

@Controller("payments")
export class PaymentHealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "payment-service" };
  }
}

@Controller("payments/intents")
export class PaymentIntentsController {
  constructor(private readonly paymentIntentsService: PaymentIntentsService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.write")
  @UseZodValidation(createPaymentIntentSchema)
  create(
    @TenantId() tenantId: string,
    @Body() dto: CreatePaymentIntentDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.paymentIntentsService.create(tenantId, dto, request.correlationId);
  }

  @Post("confirm")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.write")
  @UseZodValidation(confirmPaymentSchema)
  confirm(
    @TenantId() tenantId: string,
    @Body() dto: ConfirmPaymentDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.paymentIntentsService.confirm(tenantId, dto, request.correlationId);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.read")
  list(@TenantId() tenantId: string, @Query("invoiceId") invoiceId?: string) {
    return this.paymentIntentsService.list(tenantId, invoiceId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.paymentIntentsService.findById(tenantId, id);
  }

  @Post(":id/cancel")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.write")
  @UseZodValidation(cancelPaymentIntentSchema)
  cancel(
    @TenantId() tenantId: string,
    @Param("id") paymentIntentId: string,
    @Body() dto: CancelPaymentIntentDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.paymentIntentsService.cancel(
      tenantId,
      paymentIntentId,
      dto,
      request.correlationId,
    );
  }
}

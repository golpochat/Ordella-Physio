import { Body, Controller, Headers, Post, UnauthorizedException } from "@nestjs/common";
import { tenantBillingSyncSchema, tenantAiNotesUsageSchema, tenantLifecycleSyncSchema, UseZodValidation } from "@ordella/validation";
import { InternalBillingService } from "@/billing/internal-billing.service";
import type { TenantBillingSyncDto } from "@/billing/dto/tenant-billing-sync.dto";

@Controller("tenants/internal")
export class InternalBillingController {
  constructor(private readonly internalBillingService: InternalBillingService) {}

  @Post("billing-sync")
  @UseZodValidation(tenantBillingSyncSchema)
  syncBilling(
    @Headers("x-internal-service") serviceName: string | undefined,
    @Body() dto: TenantBillingSyncDto,
  ) {
    if (serviceName !== "billing-service") {
      throw new UnauthorizedException("Internal service authorization required");
    }
    return this.internalBillingService.syncBilling(dto);
  }

  @Post("lifecycle-sync")
  @UseZodValidation(tenantLifecycleSyncSchema)
  syncLifecycle(
    @Headers("x-internal-service") serviceName: string | undefined,
    @Body() dto: { tenantId: string; status: "ACTIVE" | "SUSPENDED" },
  ) {
    if (serviceName !== "billing-service") {
      throw new UnauthorizedException("Internal service authorization required");
    }
    return this.internalBillingService.syncLifecycle(dto);
  }

  @Post("ai-notes-usage")
  @UseZodValidation(tenantAiNotesUsageSchema)
  incrementAiNotesUsage(
    @Headers("x-internal-service") serviceName: string | undefined,
    @Body() dto: { tenantId: string; amount?: number },
  ) {
    if (serviceName !== "ai-notes-service" && serviceName !== "billing-service") {
      throw new UnauthorizedException("Internal service authorization required");
    }
    return this.internalBillingService.incrementAiNotesUsage(dto.tenantId, dto.amount ?? 1);
  }
}

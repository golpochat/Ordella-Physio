import { Body, Controller, Headers, Post, UnauthorizedException } from "@nestjs/common";
import { tenantBillingSyncSchema, UseZodValidation } from "@ordella/validation";
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
}

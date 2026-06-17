import { Body, Controller, Get, Headers, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import {
  cancelStripeSubscriptionSchema,
  createCustomerPortalSchema,
  createPlatformCheckoutSessionSchema,
  createStripeCustomerSchema,
  createStripeSubscriptionSchema,
  updateStripePaymentMethodSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/invoices/guards/jwt.guard";
import { TenantId } from "@/invoices/guards/tenant-id.decorator";
import { StripeBillingService } from "@/stripe/stripe-billing.service";
import type { CancelStripeSubscriptionInput } from "@/stripe/dto/cancel-subscription.dto";
import type { CreateCustomerPortalInput } from "@/stripe/dto/customer-portal.dto";
import type { CreateStripeCustomerInput } from "@/stripe/dto/create-customer.dto";
import type { CreateStripeSubscriptionInput } from "@/stripe/dto/create-subscription.dto";
import type { CreatePlatformCheckoutSessionInput } from "@ordella/validation";
import type { UpdateStripePaymentMethodInput } from "@/stripe/dto/update-payment-method.dto";

@Controller("billing")
export class StripeBillingController {
  constructor(private readonly stripeBillingService: StripeBillingService) {}

  @Post("create-customer")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(createStripeCustomerSchema)
  createCustomer(@Body() dto: CreateStripeCustomerInput) {
    return this.stripeBillingService.createCustomer(dto);
  }

  @Post("create-subscription")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(createStripeSubscriptionSchema)
  createSubscription(@TenantId() tenantId: string, @Body() dto: CreateStripeSubscriptionInput) {
    return this.stripeBillingService.createSubscription(tenantId, dto);
  }

  @Get("subscription")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.read")
  getSubscription(@TenantId() tenantId: string) {
    return this.stripeBillingService.getSubscription(tenantId);
  }

  @Get("billing-context")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.read")
  getBillingContext(@TenantId() tenantId: string) {
    return this.stripeBillingService.getBillingContext(tenantId);
  }

  @Get(["stripe-invoices", "subscription/invoices"])
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.read")
  listStripeInvoices(@TenantId() tenantId: string) {
    return this.stripeBillingService.listStripeInvoices(tenantId);
  }

  @Post("update-payment-method")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(updateStripePaymentMethodSchema)
  updatePaymentMethod(
    @TenantId() tenantId: string,
    @Body() dto: UpdateStripePaymentMethodInput,
  ) {
    return this.stripeBillingService.updatePaymentMethod(tenantId, dto);
  }

  @Post("cancel-subscription")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(cancelStripeSubscriptionSchema)
  cancelSubscription(@TenantId() tenantId: string, @Body() dto: CancelStripeSubscriptionInput) {
    return this.stripeBillingService.cancelSubscription(tenantId, dto);
  }

  @Post("customer-portal")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(createCustomerPortalSchema)
  createCustomerPortal(@TenantId() tenantId: string, @Body() dto: CreateCustomerPortalInput) {
    return this.stripeBillingService.createCustomerPortalSession(tenantId, dto);
  }

  @Post("checkout-session")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(createPlatformCheckoutSessionSchema)
  createCheckoutSession(
    @TenantId() tenantId: string,
    @Body() dto: CreatePlatformCheckoutSessionInput,
  ) {
    return this.stripeBillingService.createPlatformCheckoutSession(tenantId, dto);
  }

  @Get("platform-metrics")
  @UseGuards(JwtGuard, PermissionGuard)
  @RequirePermissions("platform.billing.metrics")
  getPlatformMetrics() {
    return this.stripeBillingService.getPlatformMetrics();
  }

  @Post("internal/ai-notes-usage")
  syncAiNotesUsage(
    @Headers("x-internal-service") serviceName: string | undefined,
    @Body() dto: { tenantId: string; quantity?: number },
  ) {
    if (serviceName !== "tenant-service") {
      throw new UnauthorizedException("Internal service authorization required");
    }
    return this.stripeBillingService.recordAiNotesUsageCharge(dto.tenantId, dto.quantity ?? 1);
  }
}

import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { InvoiceSyncService } from "@/services/invoice-sync.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedSubscriptionUser } from "@/utils/subscription-user";

@Controller("invoices")
export class InvoiceController {
  constructor(private readonly invoiceSyncService: InvoiceSyncService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_READ)
  listInvoices(@CurrentUser() user: AuthenticatedSubscriptionUser) {
    return this.invoiceSyncService.listTenantInvoices(user.tenantId);
  }

  @Post("sync")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.SUBSCRIPTION_MANAGE)
  syncInvoices(@CurrentUser() user: AuthenticatedSubscriptionUser) {
    return this.invoiceSyncService.syncAllInvoices(user.tenantId);
  }
}

import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  createInvoiceItemSchema,
  createInvoiceSchema,
  markInvoicePaidSchema,
  updateInvoiceItemSchema,
  updateInvoiceSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { InvoicesService } from "@/invoices/invoices.service";
import { JwtGuard } from "@/invoices/guards/jwt.guard";
import { TenantId } from "@/invoices/guards/tenant-id.decorator";
import type { CreateInvoiceDto } from "@/invoices/dto/create-invoice.dto";
import type { UpdateInvoiceDto } from "@/invoices/dto/update-invoice.dto";
import type { CreateInvoiceItemDto } from "@/invoices/dto/create-invoice-item.dto";
import type { UpdateInvoiceItemDto } from "@/invoices/dto/update-invoice-item.dto";
import type { MarkInvoicePaidDto } from "@/invoices/dto/mark-invoice-paid.dto";
import { CurrentUser } from "@/invoices/guards/current-user.decorator";
import type { AuthenticatedBillingUser } from "@/utils/billing-helpers";

@Controller("billing")
export class BillingHealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "billing-service" };
  }
}

@Controller("billing/invoices")
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(createInvoiceSchema)
  create(
    @TenantId() tenantId: string,
    @Body() dto: CreateInvoiceDto,
    @Req() request: OrdellaRequest,
    @CurrentUser() user: AuthenticatedBillingUser,
  ) {
    return this.invoicesService.create(tenantId, dto, request.correlationId, {
      userId: user.userId,
      role: user.role,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
    });
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.read")
  list(
    @TenantId() tenantId: string,
    @Query() query: Record<string, string | string[] | undefined>,
  ) {
    return this.invoicesService.list(tenantId, query);
  }

  @Get(":id/ai-context")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("ai.use")
  async getAiContext(@TenantId() tenantId: string, @Param("id") id: string) {
    const context = await this.invoicesService.getAiContext(tenantId, id);
    if (!context) {
      throw new NotFoundException();
    }
    return context;
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.invoicesService.findById(tenantId, id);
  }

  @Put(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(updateInvoiceSchema)
  update(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdateInvoiceDto,
    @Req() request: OrdellaRequest,
    @CurrentUser() user: AuthenticatedBillingUser,
  ) {
    return this.invoicesService.update(tenantId, id, dto, request.correlationId, {
      userId: user.userId,
      role: user.role,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
    });
  }

  @Patch(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(updateInvoiceSchema)
  patch(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdateInvoiceDto,
    @Req() request: OrdellaRequest,
    @CurrentUser() user: AuthenticatedBillingUser,
  ) {
    return this.invoicesService.update(tenantId, id, dto, request.correlationId, {
      userId: user.userId,
      role: user.role,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
    });
  }

  @Post(":id/issue")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  issue(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Req() request: OrdellaRequest,
    @CurrentUser() user: AuthenticatedBillingUser,
  ) {
    return this.invoicesService.issueInvoice(tenantId, id, request.correlationId, {
      userId: user.userId,
      role: user.role,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
    });
  }

  @Post(":id/pay")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(markInvoicePaidSchema)
  markPaid(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: MarkInvoicePaidDto,
    @Req() request: OrdellaRequest,
    @CurrentUser() user: AuthenticatedBillingUser,
  ) {
    return this.invoicesService.markInvoicePaid(tenantId, id, dto, request.correlationId, {
      userId: user.userId,
      role: user.role,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
    });
  }

  @Post(":id/void")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  void(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Req() request: OrdellaRequest,
    @CurrentUser() user: AuthenticatedBillingUser,
  ) {
    return this.invoicesService.voidInvoice(tenantId, id, request.correlationId, {
      userId: user.userId,
      role: user.role,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
    });
  }

  @Post(":id/items")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(createInvoiceItemSchema)
  addItem(
    @TenantId() tenantId: string,
    @Param("id") invoiceId: string,
    @Body() dto: CreateInvoiceItemDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.invoicesService.addItem(tenantId, invoiceId, dto, request.correlationId);
  }

  @Patch(":id/items/:itemId")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(updateInvoiceItemSchema)
  updateItem(
    @TenantId() tenantId: string,
    @Param("id") invoiceId: string,
    @Param("itemId") itemId: string,
    @Body() dto: UpdateInvoiceItemDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.invoicesService.updateItem(
      tenantId,
      invoiceId,
      itemId,
      dto,
      request.correlationId,
    );
  }
}

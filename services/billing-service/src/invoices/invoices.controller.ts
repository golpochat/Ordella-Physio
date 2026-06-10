import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  createInvoiceItemSchema,
  createInvoiceSchema,
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
  ) {
    return this.invoicesService.create(tenantId, dto, request.correlationId);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.read")
  list(@TenantId() tenantId: string, @Query("patientId") patientId?: string) {
    return this.invoicesService.list(tenantId, patientId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.invoicesService.findById(tenantId, id);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(updateInvoiceSchema)
  update(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdateInvoiceDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.invoicesService.update(tenantId, id, dto, request.correlationId);
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

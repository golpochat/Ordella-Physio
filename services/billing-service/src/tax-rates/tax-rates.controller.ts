import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import {
  createTaxRateSchema,
  updateTaxRateSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { TaxRatesService } from "@/tax-rates/tax-rates.service";
import { JwtGuard } from "@/invoices/guards/jwt.guard";
import { TenantId } from "@/invoices/guards/tenant-id.decorator";
import type { CreateTaxRateDto } from "@/tax-rates/dto/create-tax-rate.dto";
import type { UpdateTaxRateDto } from "@/tax-rates/dto/update-tax-rate.dto";

@Controller("billing/tax-rates")
export class TaxRatesController {
  constructor(private readonly taxRatesService: TaxRatesService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(createTaxRateSchema)
  create(
    @TenantId() tenantId: string,
    @Body() dto: CreateTaxRateDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.taxRatesService.create(tenantId, dto, request.correlationId);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.read")
  list(@TenantId() tenantId: string) {
    return this.taxRatesService.list(tenantId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.taxRatesService.findById(tenantId, id);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(updateTaxRateSchema)
  update(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdateTaxRateDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.taxRatesService.update(tenantId, id, dto, request.correlationId);
  }
}

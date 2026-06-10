import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {
  createDiscountSchema,
  updateDiscountSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { DiscountsService } from "@/discounts/discounts.service";
import { JwtGuard } from "@/invoices/guards/jwt.guard";
import { TenantId } from "@/invoices/guards/tenant-id.decorator";
import type { CreateDiscountDto } from "@/discounts/dto/create-discount.dto";
import type { UpdateDiscountDto } from "@/discounts/dto/update-discount.dto";

@Controller("billing/discounts")
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(createDiscountSchema)
  create(@TenantId() tenantId: string, @Body() dto: CreateDiscountDto) {
    return this.discountsService.create(tenantId, dto);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.read")
  list(@TenantId() tenantId: string) {
    return this.discountsService.list(tenantId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.discountsService.findById(tenantId, id);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("billing.write")
  @UseZodValidation(updateDiscountSchema)
  update(@TenantId() tenantId: string, @Param("id") id: string, @Body() dto: UpdateDiscountDto) {
    return this.discountsService.update(tenantId, id, dto);
  }
}

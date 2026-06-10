import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { createLedgerEntrySchema, UseZodValidation } from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { LedgerService } from "@/ledger/ledger.service";
import { JwtGuard } from "@/payment-intents/guards/jwt.guard";
import { TenantId } from "@/payment-intents/guards/tenant-id.decorator";
import type { CreateLedgerEntryDto } from "@/ledger/dto/create-ledger-entry.dto";

@Controller("payments/ledger")
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.write")
  @UseZodValidation(createLedgerEntrySchema)
  create(
    @TenantId() tenantId: string,
    @Body() dto: CreateLedgerEntryDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.ledgerService.create(tenantId, dto, request.correlationId);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.read")
  list(
    @TenantId() tenantId: string,
    @Query("type") type?: string,
    @Query("referenceId") referenceId?: string,
  ) {
    return this.ledgerService.list(tenantId, type, referenceId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("payments.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.ledgerService.findById(tenantId, id);
  }
}

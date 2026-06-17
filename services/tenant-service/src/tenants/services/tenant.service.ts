import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { CreateTenantPayload, UpdateTenantPayload } from "@/models/Tenant";
import { ProvisionTenantCommand } from "@/tenants/commands/provision-tenant.command";
import { UpdateTenantCommand } from "@/tenants/commands/update-tenant.command";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { toTenantResponse } from "@/tenants/tenants.mapper";
import {
  normalizeUpdateTenantPayload,
  validateUpdateTenant,
} from "@/validators/tenant.validator";
import {
  tenantAlreadyActiveError,
  tenantAlreadySuspendedError,
  tenantNotFoundError,
  tenantValidationError,
} from "@/utils/tenant-errors";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Injectable()
export class TenantService {
  constructor(
    private readonly provisionTenantCommand: ProvisionTenantCommand,
    private readonly updateTenantCommand: UpdateTenantCommand,
    private readonly tenantsRepository: TenantsRepository,
  ) {}

  async createTenant(
    payload: CreateTenantPayload,
    createdByUser?: AuthenticatedTenantUser,
    correlationId?: string,
  ) {
    return this.provisionTenantCommand.execute(payload, createdByUser, correlationId);
  }

  async findById(tenantId: string) {
    const tenant = await this.tenantsRepository.findById(tenantId);
    return tenant ? toTenantResponse(tenant) : null;
  }

  async updateTenant(
    id: string,
    payload: UpdateTenantPayload,
    updatedByUser?: AuthenticatedTenantUser,
    correlationId?: string,
  ) {
    void updatedByUser;

    const tenant = await this.tenantsRepository.findById(id);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    const validationErrors = validateUpdateTenant(payload);
    if (validationErrors.length > 0) {
      throw tenantValidationError(validationErrors);
    }

    const normalized = normalizeUpdateTenantPayload(payload);

    const updateData: Prisma.TenantUpdateInput = {
      ...(normalized.name !== undefined ? { name: normalized.name } : {}),
      ...(normalized.timezone !== undefined ? { timezone: normalized.timezone } : {}),
      ...(normalized.currency !== undefined ? { currency: normalized.currency } : {}),
      ...(normalized.status !== undefined
        ? { status: normalized.status, isActive: normalized.isActive }
        : {}),
      ...(normalized.address !== undefined ? { address: normalized.address } : {}),
      ...(normalized.phone !== undefined ? { phone: normalized.phone } : {}),
    };

    const updated = await this.updateTenantCommand.execute({
      tenantId: id,
      dto: updateData,
      correlationId,
    });

    return {
      tenant: updated,
      message: "Tenant updated successfully.",
    };
  }

  async suspendTenant(id: string, performedByUser?: AuthenticatedTenantUser) {
    void performedByUser;

    const tenant = await this.tenantsRepository.findById(id);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    if (tenant.status === "SUSPENDED") {
      throw tenantAlreadySuspendedError();
    }

    const updated = await this.tenantsRepository.setStatus(id, "SUSPENDED");

    return {
      tenant: toTenantResponse(updated),
      message: "Tenant suspended successfully.",
    };
  }

  async reactivateTenant(id: string, performedByUser?: AuthenticatedTenantUser) {
    void performedByUser;

    const tenant = await this.tenantsRepository.findById(id);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    if (tenant.status === "ACTIVE") {
      throw tenantAlreadyActiveError();
    }

    const updated = await this.tenantsRepository.setStatus(id, "ACTIVE");

    return {
      tenant: toTenantResponse(updated),
      message: "Tenant reactivated successfully.",
    };
  }
}

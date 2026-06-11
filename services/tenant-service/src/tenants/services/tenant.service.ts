import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { CreateTenantPayload, UpdateTenantPayload } from "@/models/Tenant";
import { AuthUsersClient } from "@/integrations/auth-users.client";
import { CreateTenantCommand } from "@/tenants/commands/create-tenant.command";
import { UpdateTenantCommand } from "@/tenants/commands/update-tenant.command";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { toTenantResponse } from "@/tenants/tenants.mapper";
import {
  normalizeCreateTenantPayload,
  normalizeUpdateTenantPayload,
  validateCreateTenant,
  validateUpdateTenant,
} from "@/validators/tenant.validator";
import {
  ownerNotFoundError,
  tenantAlreadyActiveError,
  tenantAlreadySuspendedError,
  tenantCodeExistsError,
  tenantNotFoundError,
  tenantValidationError,
} from "@/utils/tenant-errors";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Injectable()
export class TenantService {
  constructor(
    private readonly createTenantCommand: CreateTenantCommand,
    private readonly updateTenantCommand: UpdateTenantCommand,
    private readonly tenantsRepository: TenantsRepository,
    private readonly authUsersClient: AuthUsersClient,
  ) {}

  async createTenant(
    payload: CreateTenantPayload,
    createdByUser?: AuthenticatedTenantUser,
    correlationId?: string,
  ) {
    void createdByUser;

    const validationErrors = validateCreateTenant(payload);
    if (validationErrors.length > 0) {
      throw tenantValidationError(validationErrors);
    }

    const normalized = normalizeCreateTenantPayload(payload);

    const existing = await this.tenantsRepository.findByCode(normalized.code);
    if (existing) {
      throw tenantCodeExistsError();
    }

    const owner = await this.authUsersClient.findById(normalized.ownerUserId);
    if (!owner) {
      throw ownerNotFoundError();
    }

    const tenant = await this.createTenantCommand.execute({
      dto: normalized,
      correlationId,
    });

    return {
      tenant,
      message: "Tenant created successfully.",
    };
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

    if (normalized.code && normalized.code !== tenant.code) {
      const existing = await this.tenantsRepository.findByCode(normalized.code);
      if (existing && existing.id !== id) {
        throw tenantCodeExistsError();
      }
    }

    const updateData: Prisma.TenantUpdateInput = {
      ...(normalized.name !== undefined ? { name: normalized.name } : {}),
      ...(normalized.code !== undefined ? { code: normalized.code, slug: normalized.slug } : {}),
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

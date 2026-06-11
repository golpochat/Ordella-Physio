import { Injectable } from "@nestjs/common";
import type { CreateOrganizationPayload, UpdateOrganizationPayload } from "@/models/Organization";
import { OrganizationRepository } from "@/repositories/organization.repository";
import {
  validateCreateOrganization,
  validateUpdateOrganization,
  parseListOrganizationsQuery,
} from "@/validators/organization.validator";
import {
  organizationAlreadyActiveError,
  organizationAlreadyInactiveError,
  organizationCodeExistsError,
  organizationHasActiveTenantsError,
  invalidFilterError,
  invalidPaginationError,
  organizationNotFoundError,
  organizationValidationError,
  tenantActiveCannotRemoveError,
  tenantAlreadyAssignedError,
  tenantNotFoundError,
  tenantNotInOrganizationError,
} from "@/utils/organization-errors";
import { TenantServiceClient } from "@/integrations/tenant-service.client";
import {
  toOrganizationResponse,
  type AuthenticatedOrganizationUser,
} from "@/utils/organization-helpers";

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly tenantServiceClient: TenantServiceClient,
  ) {}

  async createOrganization(
    payload: CreateOrganizationPayload,
    createdByUser?: AuthenticatedOrganizationUser,
  ) {
    void createdByUser;

    const validation = validateCreateOrganization(payload);
    if (!validation.valid) {
      throw organizationValidationError(validation.fields);
    }

    const normalized = validation.payload;

    const existing = await this.organizationRepository.findByCode(normalized.code);
    if (existing) {
      throw organizationCodeExistsError();
    }

    const organization = await this.organizationRepository.create({
      name: normalized.name,
      code: normalized.code,
      description: normalized.description,
      primaryContactName: normalized.primaryContactName,
      primaryContactEmail: normalized.primaryContactEmail,
      primaryContactPhone: normalized.primaryContactPhone,
      status: "ACTIVE",
    });

    if (normalized.tenantId) {
      const tenant = await this.tenantServiceClient.getTenantForOrganizationLink(normalized.tenantId);
      if (!tenant) {
        throw tenantNotFoundError();
      }

      if (tenant.organizationId) {
        throw tenantAlreadyAssignedError();
      }

      const updatedTenant = await this.tenantServiceClient.setTenantOrganization(
        normalized.tenantId,
        organization.id,
      );
      if (!updatedTenant) {
        throw tenantNotFoundError();
      }

      await this.organizationRepository.linkTenant(organization.id, normalized.tenantId);
    }

    return {
      organization: toOrganizationResponse(organization),
      message: "Organization created successfully.",
    };
  }

  async getOrganization(id: string) {
    const organization = await this.organizationRepository.findById(id);
    return organization ? toOrganizationResponse(organization) : null;
  }

  async listOrganizations(query: unknown) {
    const parsed = parseListOrganizationsQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_PAGINATION") {
        throw invalidPaginationError();
      }
      throw invalidFilterError();
    }

    const { page, limit, search, status, sortBy, sortOrder } = parsed.payload;
    const where = { search, status };

    const [organizations, total] = await Promise.all([
      this.organizationRepository.findManyFiltered({
        ...where,
        skip: (page - 1) * limit,
        take: limit,
        sortBy,
        sortOrder,
      }),
      this.organizationRepository.countFiltered(where),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      data: organizations.map(toOrganizationResponse),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async updateOrganization(
    id: string,
    payload: UpdateOrganizationPayload,
    updatedByUser?: AuthenticatedOrganizationUser,
  ) {
    void updatedByUser;

    const organization = await this.organizationRepository.findById(id);
    if (!organization) {
      throw organizationNotFoundError();
    }

    const validation = validateUpdateOrganization(payload);
    if (!validation.valid) {
      throw organizationValidationError(validation.fields);
    }

    const normalized = validation.payload;

    if (normalized.code && normalized.code !== organization.code) {
      const existing = await this.organizationRepository.findByCode(normalized.code);
      if (existing && existing.id !== id) {
        throw organizationCodeExistsError();
      }
    }

    const updated = await this.organizationRepository.update(id, {
      ...(normalized.name !== undefined ? { name: normalized.name } : {}),
      ...(normalized.code !== undefined ? { code: normalized.code } : {}),
      ...(normalized.description !== undefined ? { description: normalized.description } : {}),
      ...(normalized.primaryContactName !== undefined
        ? { primaryContactName: normalized.primaryContactName }
        : {}),
      ...(normalized.primaryContactEmail !== undefined
        ? { primaryContactEmail: normalized.primaryContactEmail }
        : {}),
      ...(normalized.primaryContactPhone !== undefined
        ? { primaryContactPhone: normalized.primaryContactPhone }
        : {}),
      ...(normalized.status !== undefined ? { status: normalized.status } : {}),
    });

    return {
      organization: toOrganizationResponse(updated),
      message: "Organization updated successfully.",
    };
  }

  async deactivateOrganization(
    id: string,
    performedByUser?: AuthenticatedOrganizationUser,
  ) {
    void performedByUser;

    const organization = await this.organizationRepository.findById(id);
    if (!organization) {
      throw organizationNotFoundError();
    }

    if (organization.status === "INACTIVE") {
      throw organizationAlreadyInactiveError();
    }

    const linkedTenantIds = await this.organizationRepository.findLinkedTenantIds(id);
    const hasActiveTenants = await this.tenantServiceClient.hasActiveTenants(linkedTenantIds);
    if (hasActiveTenants) {
      throw organizationHasActiveTenantsError();
    }

    const updated = await this.organizationRepository.setStatus(id, "INACTIVE");

    return {
      organization: toOrganizationResponse(updated),
      message: "Organization deactivated successfully.",
    };
  }

  async activateOrganization(id: string, performedByUser?: AuthenticatedOrganizationUser) {
    void performedByUser;

    const organization = await this.organizationRepository.findById(id);
    if (!organization) {
      throw organizationNotFoundError();
    }

    if (organization.status === "ACTIVE") {
      throw organizationAlreadyActiveError();
    }

    const updated = await this.organizationRepository.setStatus(id, "ACTIVE");

    return {
      organization: toOrganizationResponse(updated),
      message: "Organization activated successfully.",
    };
  }

  async listOrganizationTenants(orgId: string) {
    const organization = await this.organizationRepository.findById(orgId);
    if (!organization) {
      throw organizationNotFoundError();
    }

    const data = await this.tenantServiceClient.listOrganizationTenants(orgId);
    return { data };
  }

  async listUnassignedOrganizationTenants(orgId: string) {
    const organization = await this.organizationRepository.findById(orgId);
    if (!organization) {
      throw organizationNotFoundError();
    }

    const data = await this.tenantServiceClient.listUnassignedTenants();
    return { data };
  }

  async assignTenantToOrganization(
    orgId: string,
    tenantId: string,
    performedByUser?: AuthenticatedOrganizationUser,
  ) {
    void performedByUser;

    const organization = await this.organizationRepository.findById(orgId);
    if (!organization) {
      throw organizationNotFoundError();
    }

    const tenant = await this.tenantServiceClient.getTenantForOrganizationLink(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    if (tenant.organizationId) {
      throw tenantAlreadyAssignedError();
    }

    const updatedTenant = await this.tenantServiceClient.setTenantOrganization(tenantId, orgId);
    if (!updatedTenant) {
      throw tenantNotFoundError();
    }

    const alreadyLinked = await this.organizationRepository.isTenantLinked(orgId, tenantId);
    if (!alreadyLinked) {
      await this.organizationRepository.linkTenant(orgId, tenantId);
    }

    return {
      tenant: updatedTenant,
      message: "Tenant assigned successfully.",
    };
  }

  async removeTenantFromOrganization(
    orgId: string,
    tenantId: string,
    performedByUser?: AuthenticatedOrganizationUser,
  ) {
    void performedByUser;

    const organization = await this.organizationRepository.findById(orgId);
    if (!organization) {
      throw organizationNotFoundError();
    }

    const tenant = await this.tenantServiceClient.getTenantForOrganizationLink(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    if (tenant.organizationId !== orgId) {
      throw tenantNotInOrganizationError();
    }

    if (tenant.status === "ACTIVE") {
      throw tenantActiveCannotRemoveError();
    }

    const updatedTenant = await this.tenantServiceClient.setTenantOrganization(tenantId, null);
    if (!updatedTenant) {
      throw tenantNotFoundError();
    }

    await this.organizationRepository.unlinkTenant(orgId, tenantId);

    return {
      tenant: updatedTenant,
      message: "Tenant removed successfully.",
    };
  }
}

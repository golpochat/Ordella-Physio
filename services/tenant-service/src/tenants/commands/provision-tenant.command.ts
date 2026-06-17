import { Injectable } from "@nestjs/common";
import { generateUniqueCode, randomString } from "@ordella/utils";
import type { CreateTenantPayload } from "@/models/Tenant";
import type { ProvisionTenantOptions } from "@/models/FullProvisioning";
import { throwIfProvisioningFailsAt } from "@/utils/provisioning-failure";
import { AuthUsersClient } from "@/integrations/auth-users.client";
import { OrganizationServiceClient } from "@/integrations/organization-service.client";
import { UserRoleClient } from "@/integrations/user-role.client";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { CreateTenantCommand } from "@/tenants/commands/create-tenant.command";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { normalizeCreateTenantPayload, validateCreateTenant } from "@/validators/tenant.validator";
import {
  actorRequiredError,
  organizationNotFoundError,
  ownerAlreadyAssignedError,
  ownerEmailExistsError,
  ownerNotFoundError,
  provisionFailedError,
  tenantValidationError,
} from "@/utils/tenant-errors";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Injectable()
export class ProvisionTenantCommand {
  constructor(
    private readonly createTenantCommand: CreateTenantCommand,
    private readonly tenantsRepository: TenantsRepository,
    private readonly authUsersClient: AuthUsersClient,
    private readonly organizationServiceClient: OrganizationServiceClient,
    private readonly userRoleClient: UserRoleClient,
    private readonly auditLogClient: AuditLogClient,
  ) {}

  async execute(
    payload: CreateTenantPayload,
    createdByUser?: AuthenticatedTenantUser,
    correlationId?: string,
    options?: ProvisionTenantOptions,
  ) {
    const validationErrors = validateCreateTenant(payload);
    if (validationErrors.length > 0) {
      throw tenantValidationError(validationErrors);
    }

    if (!createdByUser?.userId) {
      throw actorRequiredError();
    }

    const normalized = normalizeCreateTenantPayload(payload);
    const actorUserId = createdByUser.userId;
    const actorRole = createdByUser.role ?? "SYSTEM";
    const trace = options?.trace;
    const rollbackOnFailure = options?.rollbackOnFailure ?? false;
    const skipAudit = options?.skipAudit ?? false;
    const failAt = options?.failAt;

    const organization = await this.organizationServiceClient.getOrganizationById(normalized.organizationId);
    if (!organization) {
      throw organizationNotFoundError();
    }

    if (trace) {
      trace.organizationId = normalized.organizationId;
    }

    let resolvedOwnerUserId = normalized.ownerUserId;
    let resolvedOwnerEmail = normalized.ownerEmail;
    let preassignedTenantId: string | undefined;

    if (normalized.ownerEmail) {
      throwIfProvisioningFailsAt("owner", failAt);

      const existingByEmail = await this.authUsersClient.findByEmail(normalized.ownerEmail);
      if (existingByEmail) {
        throw ownerEmailExistsError();
      }

      preassignedTenantId = `c${randomString(24)}`;
      const invitedOwner = await this.authUsersClient.createInvitedOwner(
        preassignedTenantId,
        normalized.ownerEmail,
      );
      if (!invitedOwner) {
        throw provisionFailedError("Failed to create invited tenant owner.");
      }

      resolvedOwnerUserId = invitedOwner.id;
      resolvedOwnerEmail = invitedOwner.email;

      if (trace) {
        trace.invitedOwner = true;
        trace.ownerUserId = invitedOwner.id;
      }
    } else if (normalized.ownerUserId) {
      throwIfProvisioningFailsAt("owner", failAt);

      const owner = await this.authUsersClient.findById(normalized.ownerUserId);
      if (!owner) {
        throw ownerNotFoundError();
      }

      const existingTenant = await this.tenantsRepository.findByOwnerUserId(normalized.ownerUserId);
      if (existingTenant) {
        throw ownerAlreadyAssignedError();
      }

      resolvedOwnerUserId = owner.id;
      resolvedOwnerEmail = owner.email;

      if (trace) {
        trace.invitedOwner = false;
        trace.ownerUserId = owner.id;
        trace.previousOwnerTenantId = owner.tenantId;
      }
    }

    if (!resolvedOwnerUserId || !resolvedOwnerEmail) {
      throw tenantValidationError([
        { field: "ownerUserId", message: "Tenant owner could not be resolved." },
      ]);
    }

    const code = await generateUniqueCode(normalized.name, async (candidate) => {
      const existing = await this.tenantsRepository.findByCode(candidate);
      return Boolean(existing);
    });

    throwIfProvisioningFailsAt("tenant", failAt);

    const tenant = await this.createTenantCommand.execute({
      dto: {
        id: preassignedTenantId,
        name: normalized.name,
        code,
        organizationId: normalized.organizationId,
        ownerUserId: resolvedOwnerUserId,
        timezone: normalized.timezone,
        currency: normalized.currency,
      },
      correlationId,
    });

    if (trace) {
      trace.tenantId = tenant.id;
    }

    if (!normalized.ownerEmail) {
      const assignedOwner = await this.authUsersClient.assignUserToTenant(
        resolvedOwnerUserId,
        tenant.id,
      );
      if (!assignedOwner) {
        if (!rollbackOnFailure) {
          await this.tenantsRepository.setStatus(tenant.id, "SUSPENDED");
        }
        throw provisionFailedError("Failed to assign owner to tenant.");
      }
      resolvedOwnerEmail = assignedOwner.email;
    }

    const linked = await this.organizationServiceClient.linkTenantToOrganization(
      normalized.organizationId,
      tenant.id,
    );
    if (!linked) {
      if (!rollbackOnFailure) {
        await this.tenantsRepository.setStatus(tenant.id, "SUSPENDED");
      }
      throw provisionFailedError("Failed to link tenant to organization.");
    }

    if (trace) {
      trace.orgLinked = true;
    }

    const rolesSeeded = await this.userRoleClient.seedTenantDefaults(tenant.id, resolvedOwnerUserId);
    if (!rolesSeeded) {
      if (!rollbackOnFailure) {
        await this.tenantsRepository.setStatus(tenant.id, "SUSPENDED");
      }
      throw provisionFailedError("Failed to seed default roles and permissions.");
    }

    if (trace) {
      trace.rolesSeeded = true;
    }

    const assignOwnerMetadata = {
      organizationId: normalized.organizationId,
      tenantId: tenant.id,
      userId: resolvedOwnerUserId,
      ownerUserId: resolvedOwnerUserId,
      ownerEmail: resolvedOwnerEmail,
      timestamp: new Date().toISOString(),
      payload: {
        ownerUserId: resolvedOwnerUserId,
        ownerEmail: resolvedOwnerEmail,
      },
    };

    if (!skipAudit) {
      await Promise.all([
        this.auditLogClient.logAction({
          tenantId: tenant.id,
          actorUserId,
          actorRole,
          entityType: "Tenant",
          entityId: tenant.id,
          action: "createTenant",
          metadata: {
            organizationId: normalized.organizationId,
            tenantId: tenant.id,
            payload: normalized,
            tenantCode: tenant.tenantCode,
          },
        }),
        this.auditLogClient.logAction({
          tenantId: tenant.id,
          actorUserId,
          actorRole,
          entityType: "User",
          entityId: resolvedOwnerUserId,
          action: "assignOwner",
          metadata: assignOwnerMetadata,
        }),
        this.auditLogClient.logAction({
          tenantId: tenant.id,
          actorUserId,
          actorRole,
          entityType: "Tenant",
          entityId: tenant.id,
          action: "provisionTenant",
          metadata: {
            organizationId: normalized.organizationId,
            organizationName: organization.name,
            tenantId: tenant.id,
            tenantName: tenant.name,
            ownerUserId: resolvedOwnerUserId,
            ownerEmail: resolvedOwnerEmail,
          },
        }),
      ]);
    }

    return {
      tenantId: tenant.id,
      tenantName: tenant.name,
      tenantCode: tenant.tenantCode ?? tenant.code,
      ownerUserId: resolvedOwnerUserId,
      ownerEmail: resolvedOwnerEmail,
      organizationId: normalized.organizationId,
      organizationName: organization.name,
      tenant,
      message: "Tenant provisioned successfully.",
    };
  }
}

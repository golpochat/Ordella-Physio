import { Injectable } from "@nestjs/common";
import type { FullProvisioningPayload, FullProvisioningSuccess, ProvisionTrace } from "@/models/FullProvisioning";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { OrganizationServiceClient } from "@/integrations/organization-service.client";
import { ProvisionTenantCommand } from "@/tenants/commands/provision-tenant.command";
import { ProvisioningCompensatorService } from "@/tenants/services/provisioning-compensator.service";
import { validateFullProvisioning } from "@/validators/full-provisioning.validator";
import {
  actorRequiredError,
  provisionFailedError,
  tenantValidationError,
} from "@/utils/tenant-errors";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Injectable()
export class ProvisionFullCommand {
  constructor(
    private readonly organizationServiceClient: OrganizationServiceClient,
    private readonly provisionTenantCommand: ProvisionTenantCommand,
    private readonly provisioningCompensator: ProvisioningCompensatorService,
    private readonly auditLogClient: AuditLogClient,
  ) {}

  async execute(
    payload: FullProvisioningPayload,
    createdByUser?: AuthenticatedTenantUser,
    correlationId?: string,
  ): Promise<FullProvisioningSuccess> {
    const validation = validateFullProvisioning(payload);
    if (!validation.valid) {
      throw tenantValidationError(validation.fields);
    }

    if (!createdByUser?.userId) {
      throw actorRequiredError();
    }

    const normalized = validation.payload;
    const actorUserId = createdByUser.userId;
    const actorRole = createdByUser.role ?? "SYSTEM";
    const trace: ProvisionTrace = {};

    try {
      const organization = await this.organizationServiceClient.createOrganizationInternal({
        organizationName: normalized.organization.organizationName,
        primaryContactName: normalized.organization.primaryContactName,
        primaryContactEmail: normalized.organization.primaryContactEmail,
        primaryContactPhone: normalized.organization.primaryContactPhone,
        billingModel: normalized.organization.billingModel,
        description: normalized.organization.description,
      });

      if (!organization) {
        throw provisionFailedError("Failed to create organization.");
      }

      trace.organizationId = organization.id;

      const tenantResult = await this.provisionTenantCommand.execute(
        {
          tenantName: normalized.tenant.tenantName,
          organizationId: organization.id,
          timezone: normalized.tenant.timezone,
          currency: normalized.tenant.currency,
          ownerUserId: normalized.owner.ownerUserId,
          ownerEmail: normalized.owner.ownerEmail,
        },
        createdByUser,
        correlationId,
        {
          rollbackOnFailure: true,
          skipAudit: true,
          trace,
        },
      );

      const timestamp = new Date().toISOString();
      const chainedPayload = {
        organizationId: organization.id,
        tenantId: tenantResult.tenantId,
        ownerUserId: tenantResult.ownerUserId,
        ownerEmail: tenantResult.ownerEmail,
        timestamp,
      };

      await Promise.all([
        this.auditLogClient.logAction({
          tenantId: tenantResult.tenantId,
          actorUserId,
          actorRole,
          entityType: "Organization",
          entityId: organization.id,
          action: "createOrganization",
          metadata: {
            ...chainedPayload,
            organizationName: organization.name,
            organizationCode: organization.code,
            payload: normalized.organization,
          },
        }),
        this.auditLogClient.logAction({
          tenantId: tenantResult.tenantId,
          actorUserId,
          actorRole,
          entityType: "Tenant",
          entityId: tenantResult.tenantId,
          action: "createTenant",
          metadata: {
            ...chainedPayload,
            tenantName: tenantResult.tenantName,
            tenantCode: tenantResult.tenantCode,
            payload: normalized.tenant,
          },
        }),
        this.auditLogClient.logAction({
          tenantId: tenantResult.tenantId,
          actorUserId,
          actorRole,
          entityType: "User",
          entityId: tenantResult.ownerUserId,
          action: "assignOwner",
          metadata: {
            ...chainedPayload,
            payload: {
              ownerUserId: tenantResult.ownerUserId,
              ownerEmail: tenantResult.ownerEmail,
            },
          },
        }),
        this.auditLogClient.logAction({
          tenantId: tenantResult.tenantId,
          actorUserId,
          actorRole,
          entityType: "Tenant",
          entityId: tenantResult.tenantId,
          action: "provisionTenant",
          metadata: {
            ...chainedPayload,
            organizationName: organization.name,
            tenantName: tenantResult.tenantName,
          },
        }),
      ]);

      return {
        organizationId: organization.id,
        organizationName: organization.name,
        organizationCode: organization.code,
        tenantId: tenantResult.tenantId,
        tenantName: tenantResult.tenantName,
        tenantCode: tenantResult.tenantCode,
        ownerUserId: tenantResult.ownerUserId,
        ownerEmail: tenantResult.ownerEmail,
        message: "Full platform provisioning completed successfully.",
      };
    } catch (error) {
      await this.provisioningCompensator.rollback(trace);
      throw error;
    }
  }
}

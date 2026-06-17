import { Injectable, Logger } from "@nestjs/common";
import type { ProvisionTrace } from "@/models/FullProvisioning";
import { AuthUsersClient } from "@/integrations/auth-users.client";
import { OrganizationServiceClient } from "@/integrations/organization-service.client";
import { UserRoleClient } from "@/integrations/user-role.client";
import { TenantsRepository } from "@/tenants/tenants.repository";

@Injectable()
export class ProvisioningCompensatorService {
  private readonly logger = new Logger(ProvisioningCompensatorService.name);

  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly organizationServiceClient: OrganizationServiceClient,
    private readonly authUsersClient: AuthUsersClient,
    private readonly userRoleClient: UserRoleClient,
  ) {}

  async rollback(trace: ProvisionTrace) {
    if (trace.rolesSeeded && trace.tenantId) {
      await this.userRoleClient.rollbackTenantProvisioning(trace.tenantId);
    }

    if (trace.orgLinked && trace.organizationId && trace.tenantId) {
      await this.organizationServiceClient.unlinkTenantFromOrganization(
        trace.organizationId,
        trace.tenantId,
      );
    }

    if (trace.tenantId) {
      try {
        await this.tenantsRepository.deleteById(trace.tenantId);
      } catch (error) {
        this.logger.warn(`Tenant rollback failed for ${trace.tenantId}`, error);
      }
    }

    if (trace.ownerUserId) {
      if (trace.invitedOwner) {
        await this.authUsersClient.rollbackProvisionedUser(trace.ownerUserId, { invitedOnly: true });
      } else if (trace.previousOwnerTenantId) {
        await this.authUsersClient.revertUserTenantAssignment(
          trace.ownerUserId,
          trace.previousOwnerTenantId,
        );
      }
    }

    if (trace.organizationId) {
      await this.organizationServiceClient.rollbackOrganization(trace.organizationId);
    }
  }
}

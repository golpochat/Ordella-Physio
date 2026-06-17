import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class UserRoleClient {
  private readonly logger = new Logger(UserRoleClient.name);

  private get baseUrl(): string {
    return process.env.USER_ROLE_SERVICE_URL ?? "http://user-role-service:3054";
  }

  async seedTenantDefaults(tenantId: string, ownerUserId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/roles/internal/seed-tenant-defaults`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ tenantId, ownerUserId }),
      });

      if (!response.ok) {
        this.logger.warn(`Tenant role seed failed for ${tenantId}: HTTP ${response.status}`);
        return false;
      }

      return true;
    } catch (error) {
      this.logger.warn(`Tenant role seed failed for ${tenantId}`, error);
      return false;
    }
  }

  async rollbackTenantProvisioning(tenantId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/roles/internal/tenant/${encodeURIComponent(tenantId)}/provisioning-rollback`,
        {
          method: "DELETE",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(`Tenant role rollback failed for ${tenantId}: HTTP ${response.status}`);
        return false;
      }

      return true;
    } catch (error) {
      this.logger.warn(`Tenant role rollback failed for ${tenantId}`, error);
      return false;
    }
  }
}

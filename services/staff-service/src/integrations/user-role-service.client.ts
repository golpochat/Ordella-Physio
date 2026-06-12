import { Injectable, Logger } from "@nestjs/common";

export type RoleSummary = {
  id: string;
  tenantId: string;
  name: string;
  code: string;
};

@Injectable()
export class UserRoleServiceClient {
  private readonly logger = new Logger(UserRoleServiceClient.name);

  private get baseUrl(): string {
    return process.env.USER_ROLE_SERVICE_URL ?? "http://user-role-service:3068";
  }

  async getRole(roleId: string): Promise<RoleSummary | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/roles/internal/${encodeURIComponent(roleId)}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        this.logger.warn(`Role lookup failed for ${roleId}: HTTP ${response.status}`);
        return null;
      }

      const payload = (await response.json()) as RoleSummary;
      if (!payload?.id || !payload?.tenantId) {
        return null;
      }

      return payload;
    } catch (error) {
      this.logger.warn(`Role lookup failed for ${roleId}`, error);
      return null;
    }
  }
}

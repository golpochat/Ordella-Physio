import { Injectable, Logger } from "@nestjs/common";

export type AuthUserSummary = {
  id: string;
  tenantId: string;
  email: string;
  role: string;
  status?: "INVITED" | "ACTIVE" | "DISABLED";
};

@Injectable()
export class AuthUsersClient {
  private readonly logger = new Logger(AuthUsersClient.name);

  private get baseUrl(): string {
    return process.env.AUTH_SERVICE_URL ?? "http://core-service:3051";
  }

  private internalHeaders(): Record<string, string> {
    return {
      accept: "application/json",
      "content-type": "application/json",
      "x-tenant-id": "internal",
      "x-internal-service": "tenant-service",
    };
  }

  async findById(userId: string): Promise<AuthUserSummary | null> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/internal/users/${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: this.internalHeaders(),
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        this.logger.warn(`Auth user lookup failed for ${userId}: HTTP ${response.status}`);
        return null;
      }

      const payload = (await response.json()) as AuthUserSummary;
      if (!payload?.id) {
        return null;
      }

      return payload;
    } catch (error) {
      this.logger.error(
        `Auth user lookup failed for ${userId}`,
        error instanceof Error ? error.stack : undefined,
      );
      return null;
    }
  }

  async findByEmail(email: string): Promise<AuthUserSummary | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/auth/internal/users/by-email/${encodeURIComponent(email.trim().toLowerCase())}`,
        {
          method: "GET",
          headers: this.internalHeaders(),
        },
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        this.logger.warn(`Auth email lookup failed for ${email}: HTTP ${response.status}`);
        return null;
      }

      return (await response.json()) as AuthUserSummary;
    } catch (error) {
      this.logger.warn(`Auth email lookup failed for ${email}`, error);
      return null;
    }
  }

  async createInvitedOwner(tenantId: string, email: string): Promise<AuthUserSummary | null> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/internal/users/invited-owner`, {
        method: "POST",
        headers: this.internalHeaders(),
        body: JSON.stringify({ tenantId, email: email.trim().toLowerCase() }),
      });

      if (!response.ok) {
        this.logger.warn(`Invited owner creation failed for ${email}: HTTP ${response.status}`);
        return null;
      }

      return (await response.json()) as AuthUserSummary;
    } catch (error) {
      this.logger.warn(`Invited owner creation failed for ${email}`, error);
      return null;
    }
  }

  async assignUserToTenant(userId: string, tenantId: string): Promise<AuthUserSummary | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/auth/internal/users/${encodeURIComponent(userId)}/assign-tenant`,
        {
          method: "PATCH",
          headers: this.internalHeaders(),
          body: JSON.stringify({ tenantId, role: "OWNER" }),
        },
      );

      if (!response.ok) {
        this.logger.warn(`Owner tenant assignment failed for ${userId}: HTTP ${response.status}`);
        return null;
      }

      return (await response.json()) as AuthUserSummary;
    } catch (error) {
      this.logger.warn(`Owner tenant assignment failed for ${userId}`, error);
      return null;
    }
  }

  async rollbackProvisionedUser(userId: string, options?: { invitedOnly?: boolean }): Promise<boolean> {
    try {
      const invitedOnly = options?.invitedOnly === false ? "false" : "true";
      const response = await fetch(
        `${this.baseUrl}/auth/internal/users/${encodeURIComponent(userId)}/provisioning-rollback?invitedOnly=${invitedOnly}`,
        {
          method: "DELETE",
          headers: this.internalHeaders(),
        },
      );

      if (!response.ok) {
        this.logger.warn(`User rollback failed for ${userId}: HTTP ${response.status}`);
        return false;
      }

      return true;
    } catch (error) {
      this.logger.warn(`User rollback failed for ${userId}`, error);
      return false;
    }
  }

  async revertUserTenantAssignment(userId: string, previousTenantId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/auth/internal/users/${encodeURIComponent(userId)}/revert-tenant`,
        {
          method: "PATCH",
          headers: this.internalHeaders(),
          body: JSON.stringify({ tenantId: previousTenantId }),
        },
      );

      if (!response.ok) {
        this.logger.warn(`User tenant revert failed for ${userId}: HTTP ${response.status}`);
        return false;
      }

      return true;
    } catch (error) {
      this.logger.warn(`User tenant revert failed for ${userId}`, error);
      return false;
    }
  }
}

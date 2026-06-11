import { Injectable, Logger } from "@nestjs/common";

export type AuthUserSummary = {
  id: string;
  tenantId: string;
  email: string;
  role: string;
};

@Injectable()
export class AuthUsersClient {
  private readonly logger = new Logger(AuthUsersClient.name);

  private get baseUrl(): string {
    return process.env.AUTH_SERVICE_URL ?? "http://auth-service:3051";
  }

  async findById(userId: string): Promise<AuthUserSummary | null> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/internal/users/${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: { accept: "application/json" },
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
}

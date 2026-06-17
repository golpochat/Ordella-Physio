import { Injectable } from "@nestjs/common";
import { enterpriseConfig } from "@ordella/config";

export type SsoProvisionInput = {
  tenantId: string;
  organizationId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  ssoSubject: string;
  ssoProvider: "SAML" | "OIDC";
  role: string;
  ipAddress?: string;
  deviceInfo?: string;
};

export type SsoProvisionResult = {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  user: {
    id: string;
    email: string;
    role: string;
    tenantId: string;
    organizationId: string | null;
  };
};

@Injectable()
export class AuthServiceClient {
  private get baseUrl(): string {
    return enterpriseConfig.authServiceUrl.replace(/\/$/, "");
  }

  async completeSsoLogin(input: SsoProvisionInput): Promise<SsoProvisionResult> {
    const response = await fetch(`${this.baseUrl}/auth/internal/sso/login`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(input),
    });

    const payload = (await response.json().catch(() => null)) as
      | SsoProvisionResult
      | { message?: string }
      | null;

    if (!response.ok || !payload || !("accessToken" in payload)) {
      const message =
        (payload as { message?: string } | null)?.message ?? "SSO login provisioning failed.";
      throw new Error(message);
    }

    return payload;
  }

  async revokeUserSessions(userId: string): Promise<void> {
    await fetch(`${this.baseUrl}/auth/internal/sso/logout`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId }),
    });
  }
}

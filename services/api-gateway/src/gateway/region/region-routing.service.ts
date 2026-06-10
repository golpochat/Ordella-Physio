import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { gatewayConfig, isOrdellaRegionCode, type OrdellaRegionCode } from "@ordella/config";
import { firstValueFrom } from "rxjs";
import type { GatewayUser } from "@/constants";

type TenantHomeRegionResponse = {
  tenantId: string;
  homeRegion: string;
};

@Injectable()
export class RegionRoutingService {
  private readonly cache = new Map<string, { region: OrdellaRegionCode; expiresAt: number }>();
  private readonly cacheTtlMs = 60_000;

  constructor(private readonly httpService: HttpService) {}

  shouldBypassRouting(user?: GatewayUser, targetRegionHeader?: string): boolean {
    if (!user) {
      return true;
    }

    if (user.role === "SYSTEM" || user.roles.includes("SYSTEM")) {
      return true;
    }

    if (targetRegionHeader && isOrdellaRegionCode(targetRegionHeader)) {
      return true;
    }

    return false;
  }

  async resolveTenantHomeRegion(tenantId: string): Promise<OrdellaRegionCode | null> {
    const cached = this.cache.get(tenantId);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.region;
    }

    const config = gatewayConfig;
    const url = `${config.tenantServiceUrl}/tenants/internal/home-region/${tenantId}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get<TenantHomeRegionResponse | null>(url, {
          timeout: config.gatewayTimeoutMs,
          validateStatus: () => true,
        }),
      );

      if (response.status !== 200 || !response.data?.homeRegion) {
        return null;
      }

      const region = response.data.homeRegion;
      if (!isOrdellaRegionCode(region)) {
        return null;
      }

      this.cache.set(tenantId, { region, expiresAt: Date.now() + this.cacheTtlMs });
      return region;
    } catch {
      return null;
    }
  }

  resolveRemoteGatewayUrl(region: OrdellaRegionCode): string | undefined {
    const config = gatewayConfig;
    return config.resolveRegionApiUrl(region);
  }

  getCurrentRegion(): OrdellaRegionCode {
    return gatewayConfig.ordellaRegion;
  }

  isRoutingEnabled(): boolean {
    return gatewayConfig.regionRoutingEnabled;
  }
}

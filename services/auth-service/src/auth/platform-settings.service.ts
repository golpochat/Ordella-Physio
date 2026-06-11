import { Injectable } from "@nestjs/common";
import type { PlatformSettingsRecord } from "@/auth/platform-settings.types";

const DEFAULT_PLATFORM_SETTINGS: PlatformSettingsRecord = {
  platformName: "Ordella Physio",
  supportEmail: "support@ordella.com",
  defaultTimezone: "UTC",
  defaultCurrency: "USD",
  maintenanceMode: false,
};

@Injectable()
export class PlatformSettingsService {
  private settings: PlatformSettingsRecord = { ...DEFAULT_PLATFORM_SETTINGS };

  get(): PlatformSettingsRecord {
    return { ...this.settings };
  }

  update(payload: Partial<PlatformSettingsRecord>): PlatformSettingsRecord {
    this.settings = {
      ...this.settings,
      ...payload,
    };

    return this.get();
  }
}

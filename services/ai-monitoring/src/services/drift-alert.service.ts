import { Injectable, Logger } from "@nestjs/common";
import type { DriftSeverity, DriftType } from "@/models/AIDriftEvent";

export type DriftAlertPayload = {
  modelId: string;
  driftType: DriftType;
  severity: DriftSeverity;
  summary: string;
  recommendedActions: string[];
};

@Injectable()
export class DriftAlertService {
  private readonly logger = new Logger(DriftAlertService.name);

  dispatchAlert(tenantId: string, payload: DriftAlertPayload) {
    const channels: string[] = ["log"];

    if (payload.severity === "MEDIUM" || payload.severity === "HIGH" || payload.severity === "CRITICAL") {
      channels.push("in-app");
      this.logger.warn(
        `[IN-APP ALERT] tenant=${tenantId} model=${payload.modelId} ${payload.driftType} ${payload.severity}: ${payload.summary}`,
      );
    }

    if (payload.severity === "HIGH" || payload.severity === "CRITICAL") {
      channels.push("email", "sms");
      this.logger.error(
        `[EMAIL/SMS ALERT] tenant=${tenantId} model=${payload.modelId}: ${payload.summary}`,
      );
    }

    return {
      delivered: true,
      channels,
      payload,
    };
  }
}

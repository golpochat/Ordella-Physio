import {
  isProvisioningFailStage,
  provisioningFailureMessage,
  type ProvisioningFailStage,
} from "@ordella/shared";
import { provisionFailedError } from "@/utils/tenant-errors";

export function throwIfProvisioningFailsAt(
  stage: ProvisioningFailStage,
  failAt?: ProvisioningFailStage | null,
): void {
  if (isProvisioningFailStage(stage, failAt ?? null)) {
    throw provisionFailedError(provisioningFailureMessage(stage));
  }
}

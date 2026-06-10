import { Injectable } from "@nestjs/common";
import {
  buildEventContractRegistry,
  isVersionCompatible,
  type EventContract,
} from "@ordella/event-contracts";
import { DEFAULT_EVENT_VERSION } from "@/constants";

export type SchemaValidationResult = {
  valid: boolean;
  reason?: string;
  contract?: EventContract;
};

@Injectable()
export class SchemaRegistry {
  private readonly registry = buildEventContractRegistry();

  validate(eventName: string, payload: unknown, expectedVersion = DEFAULT_EVENT_VERSION): SchemaValidationResult {
    const contract = this.registry[eventName];

    if (!contract) {
      return { valid: true, reason: "No contract registered (passthrough)" };
    }

    const versionCheck = isVersionCompatible(contract.version, expectedVersion);
    if (versionCheck === "breaking") {
      return {
        valid: false,
        reason: `Breaking version mismatch for ${eventName}`,
        contract,
      };
    }

    const parsed = contract.payloadSchema.safeParse(payload);
    if (!parsed.success) {
      return {
        valid: false,
        reason: parsed.error.message,
        contract,
      };
    }

    return { valid: true, contract };
  }

  getContract(eventName: string): EventContract | undefined {
    return this.registry[eventName];
  }
}

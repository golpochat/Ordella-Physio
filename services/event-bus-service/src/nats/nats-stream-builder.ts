import { DiscardPolicy, RetentionPolicy, StorageType, type StreamConfig } from "nats";
import { eventBusConfig } from "@ordella/config";

export type DomainStreamDefinition = {
  name: string;
  subjects: string[];
};

export function buildDomainStreamConfig(definition: DomainStreamDefinition): Partial<StreamConfig> {
  const maxAgeNs = eventBusConfig.jetStreamMaxAgeHours * 60 * 60 * 1_000_000_000;

  return {
    name: definition.name,
    subjects: definition.subjects,
    retention: RetentionPolicy.Limits,
    max_age: maxAgeNs,
    max_bytes: eventBusConfig.jetStreamMaxBytes,
    num_replicas: eventBusConfig.jetStreamReplicas,
    storage: StorageType.File,
    discard: DiscardPolicy.Old,
  };
}

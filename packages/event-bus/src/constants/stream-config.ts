import { DiscardPolicy, RetentionPolicy, StorageType, type StreamConfig } from "nats";
import { STREAM_NAME } from "./subjects";

export const DEFAULT_STREAM_CONFIG: Partial<StreamConfig> = {
  name: STREAM_NAME,
  subjects: ["ordella.events.>"],
  retention: RetentionPolicy.Limits,
  max_age: 7 * 24 * 60 * 60 * 1_000_000_000,
  max_bytes: 1_000_000_000,
  num_replicas: 1,
  storage: StorageType.File,
  discard: DiscardPolicy.Old,
};

export type StreamConfigOverrides = Partial<StreamConfig>;

export function buildStreamConfig(overrides: StreamConfigOverrides = {}): Partial<StreamConfig> {
  return {
    ...DEFAULT_STREAM_CONFIG,
    ...overrides,
  };
}

export const DEFAULT_CONSUMER_CONFIG = {
  ack_wait: 30_000_000_000,
  max_deliver: 5,
  max_ack_pending: 100,
};

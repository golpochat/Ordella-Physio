import { DOMAIN_STREAM_NAMES } from "@/constants";

export type StreamRetentionPolicy = {
  maxAgeHours: number;
  maxBytes: number;
  replicas: number;
};

export const DEFAULT_STREAM_RETENTION: StreamRetentionPolicy = {
  maxAgeHours: 168,
  maxBytes: 1_000_000_000,
  replicas: 1,
};

export const DEAD_LETTER_STREAM_CONFIG = {
  name: DOMAIN_STREAM_NAMES.DEAD_LETTER,
  subjects: ["ordella.dlq.>"],
} as const;

export type RateLimitRecord = {
  id: string;
  tenantId: string | null;
  name: string;
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  tokensPerMinute: number;
  tokensPerDay: number;
  burstLimit: number;
};

export type RateLimitUsageSnapshot = {
  requestsMinute: number;
  requestsHour: number;
  requestsDay: number;
  tokensMinute: number;
  tokensDay: number;
};

export function toRateLimitRecord(row: {
  id: string;
  tenantId: string | null;
  name: string;
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  tokensPerMinute: number;
  tokensPerDay: number;
  burstLimit: number;
}): RateLimitRecord {
  return { ...row };
}

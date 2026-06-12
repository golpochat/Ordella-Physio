import { Injectable } from "@nestjs/common";
import type { NotificationChannel } from "@/generated/prisma";
import { rateLimitExceededError } from "@/utils/provider-errors";

type RateLimitWindow = {
  minute: number[];
  hour: number[];
  day: number[];
};

const DEFAULT_LIMITS = {
  perMinute: Number(process.env.NOTIFICATION_RATE_LIMIT_PER_MINUTE ?? "60"),
  perHour: Number(process.env.NOTIFICATION_RATE_LIMIT_PER_HOUR ?? "500"),
  perDay: Number(process.env.NOTIFICATION_RATE_LIMIT_PER_DAY ?? "5000"),
};

@Injectable()
export class RateLimitService {
  private readonly counters = new Map<string, RateLimitWindow>();

  checkRateLimit(tenantId: string, channel: NotificationChannel): void {
    const key = `${tenantId}:${channel}`;
    const now = Date.now();
    const window = this.counters.get(key) ?? { minute: [], hour: [], day: [] };

    window.minute = window.minute.filter((timestamp) => now - timestamp < 60_000);
    window.hour = window.hour.filter((timestamp) => now - timestamp < 3_600_000);
    window.day = window.day.filter((timestamp) => now - timestamp < 86_400_000);

    if (window.minute.length >= DEFAULT_LIMITS.perMinute) {
      throw rateLimitExceededError("Rate limit exceeded for this channel (per minute).");
    }

    if (window.hour.length >= DEFAULT_LIMITS.perHour) {
      throw rateLimitExceededError("Rate limit exceeded for this channel (per hour).");
    }

    if (window.day.length >= DEFAULT_LIMITS.perDay) {
      throw rateLimitExceededError("Rate limit exceeded for this channel (per day).");
    }

    window.minute.push(now);
    window.hour.push(now);
    window.day.push(now);
    this.counters.set(key, window);
  }
}

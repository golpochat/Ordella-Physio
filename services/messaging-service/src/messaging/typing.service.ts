import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";
import { messagingConfig } from "@ordella/config";
import { TYPING_INDICATOR_TTL_SECONDS } from "@/constants";

@Injectable()
export class TypingService implements OnModuleDestroy {
  private readonly logger = new Logger(TypingService.name);
  private readonly redis: Redis | null;

  constructor() {
    try {
      this.redis = new Redis(messagingConfig.redisUrl, { maxRetriesPerRequest: 1, lazyConnect: true });
      void this.redis.connect().catch((error: Error) => {
        this.logger.warn(`Redis unavailable for typing indicators: ${error.message}`);
      });
    } catch {
      this.redis = null;
    }
  }

  async onModuleDestroy() {
    if (this.redis) {
      await this.redis.quit();
    }
  }

  private key(conversationId: string, userId: string) {
    return `messaging:typing:${conversationId}:${userId}`;
  }

  async setTyping(conversationId: string, userId: string) {
    if (!this.redis) return;
    await this.redis.setex(this.key(conversationId, userId), TYPING_INDICATOR_TTL_SECONDS, "1");
  }

  async getTypingUsers(conversationId: string, excludeUserId: string): Promise<string[]> {
    if (!this.redis) return [];

    const pattern = `messaging:typing:${conversationId}:*`;
    const keys = await this.redis.keys(pattern);
    const userIds: string[] = [];

    for (const key of keys) {
      const userId = key.split(":").pop();
      if (userId && userId !== excludeUserId) {
        userIds.push(userId);
      }
    }

    return userIds;
  }
}

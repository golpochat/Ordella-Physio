import { Injectable } from "@nestjs/common";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

export type MessagingRealtimeEvent =
  | {
      type: "message.created";
      tenantId: string;
      userId: string;
      conversationId: string;
      messageId: string;
      createdAt: string;
    }
  | {
      type: "message.read";
      tenantId: string;
      userId: string;
      conversationId: string;
      messageId: string;
    }
  | {
      type: "notification";
      tenantId: string;
      userId: string;
      payload: Record<string, unknown>;
    };

@Injectable()
export class MessagingRealtimeService {
  private readonly events$ = new Subject<MessagingRealtimeEvent>();

  publish(event: MessagingRealtimeEvent) {
    this.events$.next(event);
  }

  streamForUser(tenantId: string, userId: string) {
    return this.events$.pipe(
      filter(
        (event) =>
          event.tenantId === tenantId &&
          (event.userId === userId || event.type === "message.created"),
      ),
    );
  }
}

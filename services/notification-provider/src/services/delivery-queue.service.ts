import { Injectable } from "@nestjs/common";
import {
  DeliveryQueue,
  type DeliveryQueueHandler,
  type DeliveryQueuePayload,
} from "@/queues/delivery.queue";
import { queueError } from "@/utils/provider-errors";

@Injectable()
export class DeliveryQueueService {
  private readonly queue = new DeliveryQueue();

  registerHandler(handler: DeliveryQueueHandler) {
    this.queue.setHandler(handler);
  }

  enqueue(payload: DeliveryQueuePayload) {
    try {
      return this.queue.enqueue(payload);
    } catch {
      throw queueError();
    }
  }

  getStats() {
    return this.queue.getStats();
  }
}

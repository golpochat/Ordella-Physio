import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, toSubject, type EventBus } from "@ordella/event-bus";
import { REPORTING_EVENTS } from "@/constants";
import { ReportsService } from "@/reports/reports.service";

type ReportRequestCreatedPayload = {
  reportId: string;
  tenantId: string;
  userId: string;
  type: string;
  filters: Record<string, unknown>;
};

@Injectable()
export class ReportRequestProcessor implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ReportRequestProcessor.name);
  private eventBus: EventBus | null = null;

  constructor(private readonly reportsService: ReportsService) {}

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();

    await this.eventBus.subscribe(
      toSubject(REPORTING_EVENTS.REQUEST_CREATED),
      async (event) => {
        const payload = event.payload as ReportRequestCreatedPayload;
        await this.reportsService.processReport(payload.reportId, payload.tenantId, event.correlationId);
      },
      {
        durableName: "reporting-request-processor",
        queueGroup: "reporting-request-workers",
      },
    );

    this.logger.log("Report request processor subscribed to NATS");
  }

  async onModuleDestroy() {
    this.eventBus = null;
  }
}

import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import { DataIngested, MetricsGenerated } from "../events/reporting.events";
import { DateRange } from "../value-objects/date-range.vo";
import { Money } from "../value-objects/money.vo";

export type ReportingMetricType =
  | "daily"
  | "weekly"
  | "monthly"
  | "financial"
  | "patients"
  | "appointments"
  | "therapist_workload";

export type ReportingAggregateProps = {
  id: string;
  tenantId: string;
  metricType: ReportingMetricType;
  period: DateRange;
  revenue: Money;
  appointmentCount: number;
  patientCount: number;
  generatedAt: Date;
};

export type CreateReportingAggregateInput = {
  id: string;
  tenantId: string;
  metricType: ReportingMetricType;
  periodStart: string;
  periodEnd: string;
  revenueAmount: number;
  currency: string;
  appointmentCount: number;
  patientCount: number;
  correlationId?: string;
};

export class ReportingAggregate extends AggregateRoot<ReportingAggregateProps> {
  private constructor(props: ReportingAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  static create(input: CreateReportingAggregateInput): Result<ReportingAggregate> {
    const period = DateRange.create(new Date(input.periodStart), new Date(input.periodEnd));
    if (period.isFailure) {
      return fail(period.error);
    }

    const revenue = Money.create(input.revenueAmount, input.currency);
    if (revenue.isFailure) {
      return fail(revenue.error);
    }

    const aggregate = new ReportingAggregate({
      id: input.id,
      tenantId: input.tenantId,
      metricType: input.metricType,
      period: period.value,
      revenue: revenue.value,
      appointmentCount: input.appointmentCount,
      patientCount: input.patientCount,
      generatedAt: new Date(),
    });

    aggregate.addDomainEvent(
      new MetricsGenerated(
        {
          tenantId: input.tenantId,
          metricType: input.metricType,
          periodStart: input.periodStart,
          periodEnd: input.periodEnd,
          generatedAt: new Date().toISOString(),
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }

  recordIngestion(
    sourceService: string,
    eventType: string,
    entityType: string,
    entityId: string,
    correlationId?: string,
  ): void {
    this.addDomainEvent(
      new DataIngested(
        {
          tenantId: this.props.tenantId,
          sourceService,
          eventType,
          entityType,
          entityId,
          ingestedAt: new Date().toISOString(),
        },
        correlationId,
      ),
    );
  }
}

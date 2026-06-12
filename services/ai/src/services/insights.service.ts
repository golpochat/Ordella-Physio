import { Injectable } from "@nestjs/common";
import { AppointmentInsightPipeline } from "@/pipelines/appointment-insight.pipeline";
import { InvoiceExplanationPipeline } from "@/pipelines/invoice-explanation.pipeline";
import { PatientSummaryPipeline } from "@/pipelines/patient-summary.pipeline";
import { ReportSummaryPipeline } from "@/pipelines/report-summary.pipeline";

@Injectable()
export class InsightsService {
  constructor(
    private readonly patientSummaryPipeline: PatientSummaryPipeline,
    private readonly appointmentInsightPipeline: AppointmentInsightPipeline,
    private readonly invoiceExplanationPipeline: InvoiceExplanationPipeline,
    private readonly reportSummaryPipeline: ReportSummaryPipeline,
  ) {}

  getPatientInsights(tenantId: string, patientId: string) {
    return this.patientSummaryPipeline.run(tenantId, patientId);
  }

  getAppointmentInsights(tenantId: string, appointmentId: string) {
    return this.appointmentInsightPipeline.run(tenantId, appointmentId);
  }

  getInvoiceInsights(tenantId: string, invoiceId: string) {
    return this.invoiceExplanationPipeline.run(tenantId, invoiceId);
  }

  getReportInsights(tenantId: string, report: Record<string, unknown>) {
    return this.reportSummaryPipeline.run(tenantId, report);
  }
}

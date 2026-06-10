import { Injectable } from "@nestjs/common";
import { MetricsRepository } from "@/metrics/metrics.repository";
import type { ExportCsvDto } from "@/exports/dto/export-csv.dto";
import type { ExportPdfDto } from "@/exports/dto/export-pdf.dto";
import { generateCsv } from "@/exports/generators/csv-generator";
import { generatePdfPlaceholder } from "@/exports/generators/pdf-generator";
import { parseDateRange } from "@/utils/date-helpers";

@Injectable()
export class ExportsService {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  async exportCsv(tenantId: string, dto: ExportCsvDto, correlationId?: string) {
    const { start, end } = parseDateRange(dto.startDate, dto.endDate);
    const kpi = await this.metricsRepository.findKpiSummary(tenantId, start, end);
    const csv = generateCsv([
      {
        tenantId,
        metricType: dto.metricType,
        totalAppointments: kpi.totalAppointments,
        revenue: kpi.revenue,
        correlationId: correlationId ?? "",
      },
    ]);

    return {
      format: "csv",
      filename: `reporting-${dto.metricType}-${tenantId}.csv`,
      content: csv,
    };
  }

  async exportPdf(tenantId: string, dto: ExportPdfDto, correlationId?: string) {
    const { start, end } = parseDateRange(dto.startDate, dto.endDate);
    const kpi = await this.metricsRepository.findKpiSummary(tenantId, start, end);
    const buffer = generatePdfPlaceholder({
      title: dto.title ?? `Reporting export (${dto.metricType})`,
      content: JSON.stringify({ tenantId, kpi, correlationId }, null, 2),
    });

    return {
      format: "pdf",
      filename: `reporting-${dto.metricType}-${tenantId}.pdf`,
      content: buffer.toString("base64"),
      placeholder: true,
    };
  }
}

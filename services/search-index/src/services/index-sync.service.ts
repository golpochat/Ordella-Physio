import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import type { SupportedIndexName } from "@/config/search.config";
import { DomainFeedClient } from "@/integrations/domain-feed.client";
import { transformAppointmentForIndex, type AppointmentSourceRecord } from "@/pipelines/appointment-index.pipeline";
import { transformInvoiceForIndex, type InvoiceSourceRecord } from "@/pipelines/invoice-index.pipeline";
import { transformPatientForIndex, type PatientSourceRecord } from "@/pipelines/patient-index.pipeline";
import { transformStaffForIndex, type StaffSourceRecord } from "@/pipelines/staff-index.pipeline";
import { SearchIndexService } from "@/services/search-index.service";
import { VectorIndexService } from "@/services/vector-index.service";
import { HttpError } from "@ordella/errors";
import { reindexFailedError } from "@/utils/search-errors";

const PAGE_SIZE = 100;

@Injectable()
export class IndexSyncService {
  private readonly logger = new Logger(IndexSyncService.name);

  constructor(
    private readonly domainFeedClient: DomainFeedClient,
    private readonly searchIndexService: SearchIndexService,
    private readonly vectorIndexService: VectorIndexService,
  ) {}

  async syncAllPatients(tenantId: string) {
    return this.syncFeed(tenantId, "patients", (record) =>
      transformPatientForIndex(record as PatientSourceRecord),
    );
  }

  async syncAllAppointments(tenantId: string) {
    return this.syncFeed(tenantId, "appointments", async (record) => {
      const appointment = record as AppointmentSourceRecord;
      const [patients, staff] = await Promise.all([
        this.domainFeedClient.fetchPatientSummaries(tenantId, [appointment.patientId]),
        this.domainFeedClient.fetchStaffSummaries(tenantId, [appointment.therapistId]),
      ]);

      const patient = patients[0];
      const therapist = staff[0];

      return transformAppointmentForIndex({
        ...appointment,
        patientName: patient ? `${patient.firstName} ${patient.lastName}`.trim() : undefined,
        providerName: therapist ? `${therapist.firstName} ${therapist.lastName}`.trim() : undefined,
      });
    });
  }

  async syncAllInvoices(tenantId: string) {
    return this.syncFeed(tenantId, "invoices", async (record) => {
      const invoice = record as InvoiceSourceRecord;
      const patients = await this.domainFeedClient.fetchPatientSummaries(tenantId, [invoice.patientId]);
      const patient = patients[0];

      return transformInvoiceForIndex({
        ...invoice,
        patientName: patient ? `${patient.firstName} ${patient.lastName}`.trim() : undefined,
      });
    });
  }

  async syncAllStaff(tenantId: string) {
    return this.syncFeed(tenantId, "staff", (record) =>
      transformStaffForIndex(record as StaffSourceRecord),
    );
  }

  async reindexAll(tenantId: string) {
    try {
      const [patients, appointments, invoices, staff] = await Promise.all([
        this.syncAllPatients(tenantId),
        this.syncAllAppointments(tenantId),
        this.syncAllInvoices(tenantId),
        this.syncAllStaff(tenantId),
      ]);

      return {
        message: "All indexes rebuilt.",
        patients,
        appointments,
        invoices,
        staff,
      };
    } catch (error) {
      this.logger.error(`Reindex all failed for tenant ${tenantId}`, error);
      throw reindexFailedError();
    }
  }

  async reindexIndex(tenantId: string, indexName: SupportedIndexName) {
    try {
      switch (indexName) {
        case "patients":
          return { message: "Patients index rebuilt.", ...(await this.syncAllPatients(tenantId)) };
        case "appointments":
          return { message: "Appointments index rebuilt.", ...(await this.syncAllAppointments(tenantId)) };
        case "invoices":
          return { message: "Invoices index rebuilt.", ...(await this.syncAllInvoices(tenantId)) };
        case "staff":
          return { message: "Staff index rebuilt.", ...(await this.syncAllStaff(tenantId)) };
        default:
          throw reindexFailedError(`Index ${indexName} is not supported for rebuild.`);
      }
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw reindexFailedError();
    }
  }

  async syncIncremental(tenantId: string, indexName: SupportedIndexName, entityId: string) {
    const record = await this.domainFeedClient.fetchRecord(indexName, tenantId, entityId);
    if (!record) {
      return;
    }

    let document: Record<string, unknown>;
    switch (indexName) {
      case "patients":
        document = transformPatientForIndex(record as PatientSourceRecord);
        break;
      case "appointments": {
        const appointment = record as AppointmentSourceRecord;
        const [patients, staff] = await Promise.all([
          this.domainFeedClient.fetchPatientSummaries(tenantId, [appointment.patientId]),
          this.domainFeedClient.fetchStaffSummaries(tenantId, [appointment.therapistId]),
        ]);
        document = transformAppointmentForIndex({
          ...appointment,
          patientName: patients[0] ? `${patients[0].firstName} ${patients[0].lastName}`.trim() : undefined,
          providerName: staff[0] ? `${staff[0].firstName} ${staff[0].lastName}`.trim() : undefined,
        });
        break;
      }
      case "invoices": {
        const invoice = record as InvoiceSourceRecord;
        const patients = await this.domainFeedClient.fetchPatientSummaries(tenantId, [invoice.patientId]);
        document = transformInvoiceForIndex({
          ...invoice,
          patientName: patients[0] ? `${patients[0].firstName} ${patients[0].lastName}`.trim() : undefined,
        });
        break;
      }
      case "staff":
        document = transformStaffForIndex(record as StaffSourceRecord);
        break;
      default:
        return;
    }

    await this.searchIndexService.indexDocumentDirect(tenantId, indexName, document);
  }

  async deleteIndexedEntity(tenantId: string, indexName: SupportedIndexName, entityId: string) {
    await this.searchIndexService.deleteDocument({ tenantId, indexName, documentId: entityId });
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async runNightlySync() {
    const tenantIds = await this.domainFeedClient.listTenantIds();
    if (!tenantIds.length) {
      this.logger.log("Nightly sync skipped — no tenants found.");
      return;
    }

    for (const tenantId of tenantIds) {
      try {
        await this.reindexAll(tenantId);
        this.logger.log(`Nightly sync completed for tenant ${tenantId}`);
      } catch (error) {
        this.logger.warn(`Nightly sync failed for tenant ${tenantId}`, error);
      }
    }
  }

  private async syncFeed(
    tenantId: string,
    indexName: SupportedIndexName,
    transform: (record: Record<string, unknown>) => Record<string, unknown> | Promise<Record<string, unknown>>,
  ) {
    await this.vectorIndexService.clearIndex(tenantId, indexName);
    let page = 1;
    let indexed = 0;

    while (true) {
      const feed = await this.fetchPage(indexName, tenantId, page, PAGE_SIZE);
      if (!feed.data.length) {
        break;
      }

      for (const record of feed.data) {
        const document = await transform(record);
        await this.searchIndexService.indexDocumentDirect(tenantId, indexName, document);
        indexed += 1;
      }

      if (page >= feed.pagination.totalPages) {
        break;
      }

      page += 1;
    }

    return { indexed, indexName };
  }

  private fetchPage(indexName: SupportedIndexName, tenantId: string, page: number, limit: number) {
    switch (indexName) {
      case "patients":
        return this.domainFeedClient.fetchPatientFeed<Record<string, unknown>>(tenantId, page, limit);
      case "appointments":
        return this.domainFeedClient.fetchAppointmentFeed<Record<string, unknown>>(tenantId, page, limit);
      case "invoices":
        return this.domainFeedClient.fetchInvoiceFeed<Record<string, unknown>>(tenantId, page, limit);
      case "staff":
        return this.domainFeedClient.fetchStaffFeed<Record<string, unknown>>(tenantId, page, limit);
      default:
        return Promise.resolve({
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 },
        });
    }
  }
}

import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class DomainContextClient {
  private readonly logger = new Logger(DomainContextClient.name);

  private get patientBaseUrl() {
    return process.env.PATIENT_SERVICE_URL ?? "http://localhost:3053";
  }

  private get appointmentBaseUrl() {
    return process.env.APPOINTMENT_SERVICE_URL ?? "http://localhost:3054";
  }

  private get billingBaseUrl() {
    return process.env.BILLING_SERVICE_URL ?? "http://localhost:3056";
  }

  async fetchPatientContext(tenantId: string, patientId: string) {
    const [patient, appointments] = await Promise.all([
      this.fetchJson<Record<string, unknown>>(
        `${this.patientBaseUrl}/patients/internal/record/${encodeURIComponent(patientId)}?tenantId=${encodeURIComponent(tenantId)}`,
      ),
      this.fetchJson<{ data?: Array<Record<string, unknown>> }>(
        `${this.appointmentBaseUrl}/appointments/internal/patients/${encodeURIComponent(patientId)}/history?tenantId=${encodeURIComponent(tenantId)}&limit=10`,
      ),
    ]);

    if (!patient) {
      return null;
    }

    return {
      demographics: patient,
      appointmentHistory: appointments?.data ?? [],
      tags: (patient.tags as string[]) ?? [],
      medicalNotes: (patient.medicalNotes as string[]) ?? [],
    };
  }

  async fetchAppointmentContext(tenantId: string, appointmentId: string) {
    const appointment = await this.fetchJson<Record<string, unknown>>(
      `${this.appointmentBaseUrl}/appointments/internal/${encodeURIComponent(appointmentId)}?tenantId=${encodeURIComponent(tenantId)}`,
    );

    if (!appointment?.patientId) {
      return appointment ? { appointment, patientHistory: [] } : null;
    }

    const patientHistory = await this.fetchJson<{ data?: Array<Record<string, unknown>> }>(
      `${this.appointmentBaseUrl}/appointments/internal/patients/${encodeURIComponent(String(appointment.patientId))}/history?tenantId=${encodeURIComponent(tenantId)}&limit=5`,
    );

    return {
      appointment,
      providerNotes: appointment.notes ?? "",
      patientHistory: patientHistory?.data ?? [],
    };
  }

  async fetchInvoiceContext(tenantId: string, invoiceId: string) {
    const invoice = await this.fetchJson<Record<string, unknown>>(
      `${this.billingBaseUrl}/billing/internal/record/${encodeURIComponent(invoiceId)}?tenantId=${encodeURIComponent(tenantId)}`,
    );

    if (!invoice) {
      return null;
    }

    let paymentHistory: Array<Record<string, unknown>> = [];
    if (invoice.patientId) {
      const payments = await this.fetchJson<{ data?: Array<Record<string, unknown>> }>(
        `${this.billingBaseUrl}/billing/internal/patients/${encodeURIComponent(String(invoice.patientId))}/invoices?tenantId=${encodeURIComponent(tenantId)}&limit=5`,
      );
      paymentHistory = payments?.data ?? [];
    }

    return {
      invoice,
      lineItems: (invoice.items as Array<Record<string, unknown>>) ?? [],
      patientInfo: { patientId: invoice.patientId },
      paymentHistory,
    };
  }

  async searchPatients(tenantId: string, query: string) {
    const response = await this.fetchJson<{ ids?: string[] }>(
      `${this.patientBaseUrl}/patients/internal/search?tenantId=${encodeURIComponent(tenantId)}&search=${encodeURIComponent(query)}`,
    );
    return response?.ids ?? [];
  }

  async fetchPatientHistory(tenantId: string, patientId: string) {
    return this.fetchPatientContext(tenantId, patientId);
  }

  async fetchInvoice(tenantId: string, invoiceId: string) {
    return this.fetchInvoiceContext(tenantId, invoiceId);
  }

  private async fetchJson<T>(url: string): Promise<T | null> {
    try {
      const response = await fetch(url, { headers: { accept: "application/json" } });
      if (!response.ok) {
        return null;
      }
      return (await response.json()) as T;
    } catch (error) {
      this.logger.warn(`Domain context fetch failed: ${url}`, error);
      return null;
    }
  }
}

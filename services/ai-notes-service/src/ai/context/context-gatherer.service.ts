import { Injectable } from "@nestjs/common";
import { aiNotesConfig } from "@ordella/config";
import { TENANT_HEADER } from "@ordella/security";

export type ClinicalContext = {
  patientSummary: string;
  appointmentSummary: string;
  notesSummary: string;
};

type ServiceHeaders = {
  tenantId: string;
  authorization?: string;
  correlationId?: string;
};

@Injectable()
export class ContextGathererService {
  private async fetchJson<T>(
    baseUrl: string,
    path: string,
    headers: ServiceHeaders,
  ): Promise<T | null> {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        headers: {
          [TENANT_HEADER]: headers.tenantId,
          ...(headers.authorization ? { Authorization: headers.authorization } : {}),
          ...(headers.correlationId ? { "x-correlation-id": headers.correlationId } : {}),
        },
      });

      if (!response.ok) return null;
      const payload = await response.json();
      if (payload && typeof payload === "object" && "data" in payload) {
        return payload.data as T;
      }
      return payload as T;
    } catch {
      return null;
    }
  }

  async gather(input: {
    tenantId: string;
    patientId: string;
    appointmentId?: string;
    therapistId?: string;
    authorization?: string;
    correlationId?: string;
  }): Promise<ClinicalContext> {
    const headers: ServiceHeaders = {
      tenantId: input.tenantId,
      authorization: input.authorization,
      correlationId: input.correlationId,
    };

    const config = aiNotesConfig;

    const patient = await this.fetchJson<Record<string, unknown>>(
      config.patientServiceUrl,
      `/patients/${input.patientId}`,
      headers,
    );

    const appointment = input.appointmentId
      ? await this.fetchJson<Record<string, unknown>>(
          config.appointmentServiceUrl,
          `/appointments/${input.appointmentId}`,
          headers,
        )
      : null;

    const notesQuery = new URLSearchParams({
      patientId: input.patientId,
      limit: "10",
    });
    if (input.therapistId) notesQuery.set("therapistId", input.therapistId);

    const notes = await this.fetchJson<unknown[]>(
      config.notesServiceUrl,
      `/notes?${notesQuery.toString()}`,
      headers,
    );

    return {
      patientSummary: this.formatPatient(patient),
      appointmentSummary: this.formatAppointment(appointment),
      notesSummary: this.formatNotes(notes),
    };
  }

  private formatPatient(patient: Record<string, unknown> | null): string {
    if (!patient) return "Patient record unavailable.";
    const name = [patient.firstName, patient.lastName].filter(Boolean).join(" ");
    const parts = [
      name ? `Name: ${name}` : null,
      patient.dateOfBirth ? `DOB: ${patient.dateOfBirth}` : null,
      patient.gender ? `Gender: ${patient.gender}` : null,
      patient.notes ? `Chart notes: ${patient.notes}` : null,
    ].filter(Boolean);
    return parts.length ? parts.join("\n") : `Patient ID: ${patient.id ?? "unknown"}`;
  }

  private formatAppointment(appointment: Record<string, unknown> | null): string {
    if (!appointment) return "No appointment linked.";
    const parts = [
      `Type: ${appointment.type ?? "N/A"}`,
      `Status: ${appointment.status ?? "N/A"}`,
      `Start: ${appointment.startTime ?? "N/A"}`,
      `End: ${appointment.endTime ?? "N/A"}`,
      appointment.notes ? `Appointment notes: ${appointment.notes}` : null,
    ].filter(Boolean);
    return parts.join("\n");
  }

  private formatNotes(notes: unknown[] | null): string {
    if (!notes?.length) return "No prior clinical notes on file.";

    return notes
      .slice(0, 5)
      .map((entry, index) => {
        const note = entry as Record<string, unknown>;
        const content = String(note.content ?? "").slice(0, 500);
        return `${index + 1}. [${note.type ?? "NOTE"}] ${content}`;
      })
      .join("\n");
  }
}

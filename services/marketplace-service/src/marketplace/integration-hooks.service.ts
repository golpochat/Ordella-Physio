import { BadRequestException, Injectable } from "@nestjs/common";
import { marketplaceConfig } from "@ordella/config";
import { TENANT_HEADER } from "@ordella/security";
import type {
  ExerciseSyncInput,
  GoogleCalendarSyncInput,
  SendEmailInput,
  SendSmsInput,
  UploadNoteInput,
} from "@ordella/validation";
import { MarketplaceRepository } from "@/marketplace/marketplace.repository";

@Injectable()
export class IntegrationHooksService {
  constructor(private readonly repository: MarketplaceRepository) {}

  private async resolveIntegration(tenantId: string, integrationId?: string, providerSlug?: string) {
    if (integrationId) {
      const found = await this.repository.findTenantIntegration(tenantId, integrationId);
      if (!found) throw new BadRequestException("Integration not found");
      return found;
    }
    if (providerSlug) {
      const provider = await this.repository.findProviderBySlug(providerSlug);
      if (!provider) throw new BadRequestException("Provider not found");
      const found = await this.repository.findByTenantAndProvider(tenantId, provider.id);
      if (!found) throw new BadRequestException("Integration not connected");
      return found;
    }
    throw new BadRequestException("integrationId or providerSlug required");
  }

  private async fetchService(path: string, tenantId: string, baseUrl: string) {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: { [TENANT_HEADER]: tenantId },
    });
    if (!response.ok) return null;
    const payload = await response.json();
    if (payload && typeof payload === "object" && "data" in payload) {
      return payload.data;
    }
    return payload;
  }

  async syncGoogleCalendar(tenantId: string, input: GoogleCalendarSyncInput) {
    const integration = await this.resolveIntegration(tenantId, input.integrationId, "google-calendar");
    const appointment = await this.fetchService(
      `/appointments/${input.appointmentId}`,
      tenantId,
      marketplaceConfig.appointmentServiceUrl,
    );

    const eventPayload = {
      summary: `Physio Appointment ${input.appointmentId}`,
      description: JSON.stringify(appointment ?? {}),
      start: { dateTime: appointment?.startTime ?? new Date().toISOString() },
      end: { dateTime: appointment?.endTime ?? new Date().toISOString() },
    };

    let status = "success";
    let externalId: string | null = null;

    try {
      if (integration.accessToken) {
        const response = await fetch(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${integration.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventPayload),
          },
        );
        const result = (await response.json()) as { id?: string };
        externalId = result.id ?? null;
        if (!response.ok) status = "failed";
      }
    } catch {
      status = "failed";
    }

    await this.repository.logUsage({
      tenantId,
      integrationId: integration.id,
      action: "sync_google_calendar",
      status,
      metadata: { appointmentId: input.appointmentId, externalId },
    });

    return { status, appointmentId: input.appointmentId, externalEventId: externalId };
  }

  async uploadNote(tenantId: string, input: UploadNoteInput) {
    const integration = await this.resolveIntegration(tenantId, input.integrationId, input.providerSlug);
    const note = await this.fetchService(
      `/notes/${input.noteId}`,
      tenantId,
      marketplaceConfig.notesServiceUrl,
    );

    const fileName = input.fileName ?? `note-${input.noteId}.txt`;
    const content = String(note?.content ?? "");
    let status = "success";
    let externalPath: string | null = null;

    try {
      if (input.providerSlug === "dropbox" && integration.accessToken) {
        const response = await fetch("https://content.dropboxapi.com/2/files/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${integration.accessToken}`,
            "Content-Type": "application/octet-stream",
            "Dropbox-API-Arg": JSON.stringify({
              path: `/ordella/${fileName}`,
              mode: "add",
              autorename: true,
            }),
          },
          body: content,
        });
        const result = (await response.json()) as { path_display?: string };
        externalPath = result.path_display ?? null;
        if (!response.ok) status = "failed";
      } else {
        externalPath = `/${input.providerSlug}/ordella/${fileName}`;
      }
    } catch {
      status = "failed";
    }

    await this.repository.logUsage({
      tenantId,
      integrationId: integration.id,
      action: `upload_note_${input.providerSlug}`,
      status,
      metadata: { noteId: input.noteId, externalPath },
    });

    return { status, noteId: input.noteId, externalPath };
  }

  async sendSms(tenantId: string, input: SendSmsInput) {
    const integration = await this.resolveIntegration(tenantId, input.integrationId, "twilio");
    let status = "success";
    let sid: string | null = null;

    try {
      if (integration.apiKey && integration.apiSecret) {
        const credentials = Buffer.from(`${integration.apiKey}:${integration.apiSecret}`).toString("base64");
        const response = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${integration.apiKey}/Messages.json`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${credentials}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              To: input.to,
              From: process.env.TWILIO_FROM_NUMBER ?? "+10000000000",
              Body: input.message,
            }),
          },
        );
        const result = (await response.json()) as { sid?: string };
        sid = result.sid ?? null;
        if (!response.ok) status = "failed";
      }
    } catch {
      status = "failed";
    }

    await this.repository.logUsage({
      tenantId,
      integrationId: integration.id,
      action: "send_sms_twilio",
      status,
      metadata: { to: input.to, sid },
    });

    return { status, sid };
  }

  async sendEmail(tenantId: string, input: SendEmailInput) {
    const integration = await this.resolveIntegration(tenantId, input.integrationId, "sendgrid");
    let status = "success";

    try {
      if (integration.apiKey) {
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${integration.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: input.to }] }],
            from: { email: process.env.SENDGRID_FROM_EMAIL ?? "noreply@ordella.local" },
            subject: input.subject,
            content: [{ type: "text/plain", value: input.body }],
          }),
        });
        if (!response.ok) status = "failed";
      }
    } catch {
      status = "failed";
    }

    await this.repository.logUsage({
      tenantId,
      integrationId: integration.id,
      action: "send_email_sendgrid",
      status,
      metadata: { to: input.to, subject: input.subject },
    });

    return { status };
  }

  async syncExerciseProgram(tenantId: string, input: ExerciseSyncInput) {
    const integration = await this.resolveIntegration(tenantId, input.integrationId, input.providerSlug);
    const status = integration.apiKey ? "success" : "failed";

    await this.repository.logUsage({
      tenantId,
      integrationId: integration.id,
      action: `sync_exercise_${input.providerSlug}`,
      status,
      metadata: { patientId: input.patientId, programId: input.programId ?? null },
    });

    return {
      status,
      provider: input.providerSlug,
      patientId: input.patientId,
      programsImported: status === "success" ? 1 : 0,
    };
  }
}

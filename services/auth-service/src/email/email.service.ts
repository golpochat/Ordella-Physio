import { Injectable, Logger } from "@nestjs/common";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Handlebars from "handlebars";

type EmailPayload = {
  tenantId: string;
  email: string;
  token: string;
};

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly verifyTemplate = this.loadTemplate("verify-email.hbs");
  private readonly resetTemplate = this.loadTemplate("reset-password.hbs");

  private loadTemplate(filename: string) {
    const templatePath = join(__dirname, "templates", filename);
    const source = readFileSync(templatePath, "utf8");
    return Handlebars.compile(source);
  }

  async sendVerificationEmail(payload: EmailPayload) {
    const html = this.verifyTemplate({ token: payload.token });
    this.logger.log(`Verification email queued for ${payload.email} (tenant: ${payload.tenantId})`);
    return this.dispatch({ ...payload, subject: "Verify your Ordella account", html });
  }

  async sendPasswordResetEmail(payload: EmailPayload) {
    const html = this.resetTemplate({ token: payload.token });
    this.logger.log(`Password reset email queued for ${payload.email} (tenant: ${payload.tenantId})`);
    return this.dispatch({ ...payload, subject: "Reset your Ordella password", html });
  }

  private async dispatch(input: EmailPayload & { subject: string; html: string }) {
    // Future-ready hook for communication-service integration.
    this.logger.debug({
      to: input.email,
      subject: input.subject,
      tenantId: input.tenantId,
      communicationServiceUrl: process.env.COMMUNICATION_SERVICE_URL,
    });
    return { queued: true };
  }
}

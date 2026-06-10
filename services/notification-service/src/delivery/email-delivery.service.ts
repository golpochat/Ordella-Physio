import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class EmailDeliveryService {
  private readonly logger = new Logger(EmailDeliveryService.name);

  async sendPlaceholder(input: {
    toUserId: string;
    subject: string;
    body: string;
    tenantId?: string | null;
  }) {
    this.logger.log(
      `[email-placeholder] tenant=${input.tenantId ?? "global"} user=${input.toUserId} subject="${input.subject}"`,
    );
    return { delivered: false, channel: "email", status: "placeholder" as const };
  }
}
